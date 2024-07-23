// src/types/types.ts

export interface Player {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    nationality: string;
    position: string;
    rating?: number;
}
export interface Team {
    id: number;
    name: string;
    type: 'club' | 'country';
    logo: string;
}

export interface Position {
    code: string;
    name: string;
}

export const positions: Position[] = [
    { code: 'GK', name: 'Goalkeeper' },
    { code: 'DEF', name: 'Defender' },
    { code: 'MID', name: 'Midfielder' },
    { code: 'ATT', name: 'Attacker' },
];

export const leagues = [
    { id: 39, name: 'Premier League' },
    { id: 140, name: 'La Liga' },
    { id: 78, name: 'Bundesliga' },
    { id: 135, name: 'Serie A' },
];

export const nationalTeams = [1, 2, 3, 4, 5, 10, 9, 27, 6, 21]; // Top 10 FIFA ranked teams