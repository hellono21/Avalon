export enum RoleType {
  MERLIN = 'Merlin',
  PERCIVAL = 'Percival',
  SERVANT = 'Loyal Servant',
  ASSASSIN = 'Assassin',
  MORGANA = 'Morgana',
  MORDRED = 'Mordred',
  OBERON = 'Oberon',
  MINION = 'Minion'
}

export enum Faction {
  GOOD = 'GOOD',
  EVIL = 'EVIL'
}

export interface Player {
  id: string;
  name: string;
  role: RoleType;
  isLeader: boolean;
}

export interface GameState {
  step: 'WELCOME' | 'SETUP' | 'CONFIG' | 'REVEAL' | 'PASS' | 'ROUND_MAIN' | 'VOTE' | 'MISSION_PHASE' | 'MISSION_RESULT' | 'ASSASSINATION' | 'GAME_OVER_GOOD' | 'GAME_OVER_EVIL';
  round: number;
  players: Player[];
  revealingPlayerIndex: number;
  missionResults: ('success' | 'fail' | null)[];
  currentTeam: Player[];
  missionActionIndex: number; // To track which player in the team is acting
  currentMissionVotes: ('success' | 'fail')[];
  voteTrack: number; // Number of rejected teams
}
