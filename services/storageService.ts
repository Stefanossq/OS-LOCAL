
import { PlayerStats, Quest, QuestDifficulty, QuestStatus } from '../types';

const KEYS = {
  STATS: 'CYBERHUD_STATS_V1',
  QUESTS: 'CYBERHUD_QUESTS_V1',
  SETTINGS: 'CYBERHUD_SETTINGS_V1'
};

const INITIAL_STATS: PlayerStats = {
  hp: 85,
  maxHp: 100,
  mana: 8.0,
  maxMana: 8.0,
  gold: 15,
  xp: 1250,
  level: 5
};

const INITIAL_QUESTS: Quest[] = [
  {
    id: '1',
    title: 'Configurar Ambiente Dev',
    description: 'Estabelecer uplink com servidor local e instalar dependências críticas.',
    difficulty: QuestDifficulty.EASY,
    status: QuestStatus.PENDING,
    rewardXP: 100,
    rewardGold: 1,
    timestamp: Date.now()
  }
];

export const StorageService = {
  getStats: (): PlayerStats => {
    try {
      const data = localStorage.getItem(KEYS.STATS);
      return data ? JSON.parse(data) : INITIAL_STATS;
    } catch {
      return INITIAL_STATS;
    }
  },

  saveStats: (stats: PlayerStats) => {
    localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
  },

  getQuests: (): Quest[] => {
    try {
      const data = localStorage.getItem(KEYS.QUESTS);
      return data ? JSON.parse(data) : INITIAL_QUESTS;
    } catch {
      return INITIAL_QUESTS;
    }
  },

  saveQuests: (quests: Quest[]) => {
    localStorage.setItem(KEYS.QUESTS, JSON.stringify(quests));
  },

  resetData: () => {
    localStorage.removeItem(KEYS.STATS);
    localStorage.removeItem(KEYS.QUESTS);
    window.location.reload();
  }
};
