import React from 'react';

// Using constants for visual data usually implies static data, but here we define configuration
export const INITIAL_PLAYER_STATS = {
  hp: 80, // High focus start
  maxHp: 100,
  mana: 8, // 8 hours available
  maxMana: 8,
  gold: 12, // Projects
  xp: 2450,
  level: 12
};

export const SECTIONS = {
  DASHBOARD: 'dashboard',
  PROFILE: 'profile',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings'
};