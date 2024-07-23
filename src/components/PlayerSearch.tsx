// src/components/PlayerSearch.tsx

import React, { useState, useCallback } from 'react';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import { Player } from '../types/types';
import { searchPlayers } from '../services/api';
import debounce from 'lodash/debounce';

interface PlayerSearchProps {
    onSelectPlayer: (player: Player) => void;
    disabled: boolean;
}

export const PlayerSearch: React.FC<PlayerSearchProps> = ({ onSelectPlayer, disabled }) => {
    const [options, setOptions] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchPlayers = useCallback(
        debounce(async (query: string) => {
            if (query.length > 2) {
                setLoading(true);
                try {
                    const players = await searchPlayers(query);
                    setOptions(players);
                } catch (error) {
                    console.error('Error fetching players:', error);
                    setOptions([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setOptions([]);
            }
        }, 300),
        []
    );

    const handleInputChange = (_event: React.ChangeEvent<unknown>, newInputValue: string) => {
        fetchPlayers(newInputValue);
    };

    return (
        <Autocomplete
            disabled={disabled}
            options={options}
            getOptionLabel={(option: Player) => option.name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Player"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            onInputChange={handleInputChange}
            onChange={(_event, player) => player && onSelectPlayer(player)}
            loading={loading}
            filterOptions={(x) => x}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.name} ({option.position})
                </li>
            )}
            noOptionsText="No players found"
            loadingText="Searching..."
            sx={{
                '& .MuiInputBase-root': {
                    fontSize: '1.2rem',
                },
                '& .MuiInputLabel-root': {
                    fontSize: '1.2rem',
                },
            }}
        />
    );
};