// src/utils/helpers.ts

import { Position, positions } from '../types/types';

export const getRandomPosition = (): Position => {
    return positions[Math.floor(Math.random() * positions.length)];
};