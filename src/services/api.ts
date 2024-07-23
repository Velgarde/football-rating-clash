// src/services/api.ts

import axios from 'axios';
import { Player, Team } from '../types/types';

const API_KEY = 'ad6f3492efmshd822bbfa434e2fbp1a3384jsn7f7adc3f48a4';
const API_HOST = 'api-football-v1.p.rapidapi.com';

const api = axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
    },
});

interface ApiPlayer {
    player: {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        nationality: string;
    };
    statistics: Array<{
        team: { id: number; name: string; logo: string };
        games: { position: string };
    }>;
}

export const searchPlayers = async (query: string): Promise<Player[]> => {
    try {
        const leagueIds = leagues.map(league => league.id).join('-');
        const response = await api.get('/players', {
            params: {
                search: query,
                league: leagueIds,
                season: '2023'
            }
        });
        return response.data.response.map((item: ApiPlayer) => ({
            id: item.player.id,
            name: item.player.name,
            firstname: item.player.firstname,
            lastname: item.player.lastname,
            age: item.player.age,
            nationality: item.player.nationality,
            position: item.statistics[0]?.games.position || 'Unknown',
        }));
    } catch (error) {
        console.error('Error searching players:', error);
        throw new Error('Failed to search players. Please try again.');
    }
};

export const getRandomTeam = async (): Promise<Team> => {
    try {
        const isNationalTeam = Math.random() < 0.3; // 30% chance of national team
        if (isNationalTeam) {
            const teamId = nationalTeams[Math.floor(Math.random() * nationalTeams.length)];
            const response = await api.get('/teams', { params: { id: teamId } });
            const team = response.data.response[0];
            return {
                id: team.team.id,
                name: team.team.name,
                type: 'country',
                logo: team.team.logo,
            };
        } else {
            const league = leagues[Math.floor(Math.random() * leagues.length)];
            const response = await api.get('/teams', { params: { league: league.id, season: '2023' } });
            const teams = response.data.response;
            const randomTeam = teams[Math.floor(Math.random() * teams.length)];
            return {
                id: randomTeam.team.id,
                name: randomTeam.team.name,
                type: 'club',
                logo: randomTeam.team.logo,
            };
        }
    } catch (error) {
        console.error('Error getting random team:', error);
        throw new Error('Failed to get a random team. Please try again.');
    }
};

export const getPlayerHistory = async (playerId: number, teamId: number): Promise<boolean> => {
    try {
        const response = await api.get('/transfers', { params: { player: playerId } });
        const transfers = response.data.response;
        return transfers.some((transfer: { teams: { in: { id: number }, out: { id: number } } }) =>
            transfer.teams.in.id === teamId || transfer.teams.out.id === teamId
        );
    } catch (error) {
        console.error('Error getting player history:', error);
        throw new Error('Failed to get player history. Please try again.');
    }
};

export const getPlayerRating = async (): Promise<number> => {
    try {
        // This is a mock function as the API doesn't provide FIFA ratings
        // We'll use a more realistic distribution of ratings
        const baseRating = Math.floor(Math.random() * 20) + 70; // Base rating between 70 and 89
        const adjustment = Math.floor(Math.random() * 11) - 5; // Adjustment between -5 and +5
        return Math.min(Math.max(baseRating + adjustment, 50), 99); // Ensure rating is between 50 and 99
    } catch (error) {
        console.error('Error getting player rating:', error);
        throw new Error('Failed to get player rating. Please try again.');
    }
};

// Export these constants
export const leagues = [
    { id: 39, name: 'Premier League' },
    { id: 140, name: 'La Liga' },
    { id: 78, name: 'Bundesliga' },
    { id: 135, name: 'Serie A' },
];

export const nationalTeams = [1, 2, 3, 4, 5, 10, 9, 27, 6, 21]; // Top 10 FIFA ranked teams