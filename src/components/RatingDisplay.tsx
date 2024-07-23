// src/components/RatingDisplay.tsx

import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { Player } from '../types/types';

interface RatingDisplayProps {
    player: Player;
    isWinner: boolean | null;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ player, isWinner }) => {
    return (
        <Box sx={{ my: 2, p: 2, border: 1, borderRadius: 2, borderColor: isWinner === true ? 'success.main' : 'grey.700' }}>
            <Typography variant="h6" gutterBottom>{player.name}</Typography>
            <Typography variant="body2">Position: {player.position}</Typography>
            <Typography variant="body2" gutterBottom>Nationality: {player.nationality}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        value={player.rating || 0}
                        color={isWinner === true ? 'success' : 'primary'}
                    />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${player.rating || 0}`}</Typography>
                </Box>
            </Box>
            {isWinner === true && (
                <Typography variant="h6" color="success.main" sx={{ mt: 1 }}>Winner!</Typography>
            )}
        </Box>
    );
};