// src/components/GameContainer.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { PlayerSearch } from './PlayerSearch';
import { RatingDisplay } from './RatingDisplay';
import { Player, Team, Position } from '../types/types';
import { getRandomTeam, getPlayerRating, getPlayerHistory } from '../services/api';
import { getRandomPosition } from '../utils/helpers'; // We'll create this function

interface GameContainerProps {
    player: string;
    onPlayerSelected: (player: Player, isValid: boolean) => void;
    gameState: 'selecting' | 'waiting' | 'result';
    isWinner: boolean | null;
}

export const GameContainer: React.FC<GameContainerProps> = ({
                                                                player,
                                                                onPlayerSelected,
                                                                gameState,
                                                                isWinner
                                                            }) => {
    const [team, setTeam] = useState<Team | null>(null);
    const [position, setPosition] = useState<Position | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = async () => {
        setLoading(true);
        setSelectedPlayer(null);
        const randomTeam = await getRandomTeam();
        const randomPosition = getRandomPosition();
        setTeam(randomTeam);
        setPosition(randomPosition);
        setLoading(false);
    };

    const handleSelectPlayer = async (player: Player) => {
        setLoading(true);
        const rating = await getPlayerRating(player.id);
        const playerWithRating = { ...player, rating };
        setSelectedPlayer(playerWithRating);

        const isValidSelection = team ? await getPlayerHistory(player.id, team.id) : false;
        onPlayerSelected(playerWithRating, isValidSelection && player.position === position?.code);

        setLoading(false);
    };

    if (loading) {
        return <CircularProgress size={60} />;
    }

    return (
        <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>{player}</Typography>
            {team && position && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5">{team.name} - {position.name}</Typography>
                    <img src={team.logo} alt={team.name} style={{ width: 80, marginTop: 10 }} />
                </Box>
            )}
            {gameState === 'selecting' && (
                <PlayerSearch onSelectPlayer={handleSelectPlayer} disabled={false} />
            )}
            {selectedPlayer && (
                <RatingDisplay player={selectedPlayer} isWinner={isWinner ?? false} />
            )}
            {gameState === 'waiting' && (
                <Typography variant="h6" sx={{ mt: 3 }}>Waiting for other player...</Typography>
            )}
            {gameState === 'result' && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                    <Typography variant="h4" color={isWinner === true ? "success.main" : isWinner === false ? "error.main" : "text.primary"} sx={{ mt: 3 }}>
                        {isWinner === true ? "Winner!" : isWinner === false ? "Lost!" : "Invalid Selection!"}
                    </Typography>
                </motion.div>
            )}
        </Paper>
    );
};