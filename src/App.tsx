// src/App.tsx


import { CssBaseline, ThemeProvider, createTheme, Container, Box, Typography } from '@mui/material';
import { GameManager } from './components/GameManager';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1E88E5',
        },
        secondary: {
            main: '#FF4081',
        },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1.1rem',
        },
        button: {
            fontSize: '1.1rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box
                    sx={{
                        my: 4,
                        textAlign: 'center',
                        color: 'text.primary',
                        background: 'linear-gradient(45deg, #1E88E5 30%, #00897B 90%)',
                        padding: '30px',
                        borderRadius: '15px',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    }}
                >
                    <Typography variant="h1" component="h1" gutterBottom>
                        Football Player Rating Battle
                    </Typography>
                </Box>
                <Box
                    sx={{
                        mt: 6,
                        mb: 4,
                        p: 4,
                        backgroundColor: 'background.paper',
                        borderRadius: '15px',
                        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                    }}
                >
                    <GameManager />
                </Box>
                <Box
                    sx={{
                        mt: 4,
                        textAlign: 'center',
                        color: 'text.secondary',
                    }}
                >
                    <Typography variant="body2">
                        © 2024 Football Player Rating Battle. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;