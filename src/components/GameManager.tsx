// src/components/GameManager.tsx

import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { GameContainer } from './GameContainer';
import { Player } from '../types/types';

export const GameManager: React.FC = () => {
    const [player1, setPlayer1] = useState<{ player: Player; isValid: boolean } | null>(null);
    const [player2, setPlayer2] = useState<{ player: Player; isValid: boolean } | null>(null);
    const [gameResult, setGameResult] = useState<{ winner: number | null; message: string } | null>(null);

    const handlePlayerSelected = (playerNumber: number, selectedPlayer: Player, isValid: boolean) => {
        if (playerNumber === 1) {
            setPlayer1({ player: selectedPlayer, isValid });
        } else {
            setPlayer2({ player: selectedPlayer, isValid });
        }

        if (player1 && playerNumber === 2 || player2 && playerNumber === 1) {
            determineWinner();
        }
    };

    const determineWinner = () => {
        if (player1 && player2) {
            if (!player1.isValid && !player2.isValid) {
                setGameResult({ winner: null, message: "Both players made invalid selections. It's a draw!" });
            } else if (!player1.isValid) {
                setGameResult({ winner: 2, message: "Player 1 made an invalid selection. Player 2 wins!" });
            } else if (!player2.isValid) {
                setGameResult({ winner: 1, message: "Player 2 made an invalid selection. Player 1 wins!" });
            } else {
                const winner = player1.player.rating! > player2.player.rating! ? 1 : 2;
                setGameResult({ winner, message: `Player ${winner} wins!` });
            }
        }
    };

    const resetGame = () => {
        setPlayer1(null);
        setPlayer2(null);
        setGameResult(null);
    };

    const getGameState = (playerNumber: number) => {
        if (gameResult) return 'result';
        if (playerNumber === 1 && player1 || playerNumber === 2 && player2) return 'waiting';
        return 'selecting';
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <GameContainer
                        player="Player 1"
                        onPlayerSelected={(player, isValid) => handlePlayerSelected(1, player, isValid)}
                        gameState={getGameState(1)}
                        isWinner={gameResult?.winner === 1}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <GameContainer
                        player="Player 2"
                        onPlayerSelected={(player, isValid) => handlePlayerSelected(2, player, isValid)}
                        gameState={getGameState(2)}
                        isWinner={gameResult?.winner === 2}
                    />
                </Grid>
            </Grid>
            {gameResult && (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h3" gutterBottom>
                        {gameResult.message}
                    </Typography>
                    <Button variant="contained" onClick={resetGame} size="large" sx={{ fontSize: '1.2rem', py: 1, px: 4 }}>
                        Next Round
                    </Button>
                </Box>
            )}
        </Box>
    );
};