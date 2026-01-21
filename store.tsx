import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, Player, RoleType, Faction } from './types';

interface GameContextType extends GameState {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setGameStep: (step: GameState['step']) => void;
  startGame: () => void;
  assignRoles: (selectedRoles: RoleType[]) => void;
  nextReveal: () => void;
  confirmTeam: (playerIds: string[]) => void;
  resolveTeamVote: (approved: boolean) => void;
  submitMissionAction: (action: 'success' | 'fail') => void;
  nextRound: () => void;
  assassinate: (targetId: string) => void;
  resetGame: (step?: GameState['step']) => void;
}

const defaultState: GameState = {
  step: 'WELCOME',
  round: 1,
  players: [],
  revealingPlayerIndex: 0,
  missionResults: [null, null, null, null, null],
  currentTeam: [],
  missionActionIndex: 0,
  currentMissionVotes: [],
  voteTrack: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children?: ReactNode }) => {
  const [state, setState] = useState<GameState>(defaultState);

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: Date.now().toString() + Math.random().toString().slice(2, 8),
      name,
      role: RoleType.SERVANT, 
      isLeader: false
    };
    setState(prev => ({ ...prev, players: [...prev.players, newPlayer] }));
  };

  const removePlayer = (id: string) => {
    setState(prev => ({ ...prev, players: prev.players.filter(p => p.id !== id) }));
  };

  const setGameStep = (step: GameState['step']) => {
    setState(prev => ({ ...prev, step }));
  };

  const startGame = () => {
    if (state.players.length < 5) {
        alert("At least 5 players required.");
        return;
    }
    setState(prev => ({ ...prev, step: 'CONFIG' }));
  };

  const assignRoles = (specialRoles: RoleType[]) => {
    const playerCount = state.players.length;
    let evilCount = 2;
    if (playerCount >= 7) evilCount = 3;
    if (playerCount >= 10) evilCount = 4;
    const goodCount = playerCount - evilCount;

    // Filter specials into factions
    const evilSpecials = specialRoles.filter(r => [RoleType.ASSASSIN, RoleType.MORGANA, RoleType.MORDRED, RoleType.OBERON, RoleType.MINION].includes(r));
    const goodSpecials = specialRoles.filter(r => [RoleType.MERLIN, RoleType.PERCIVAL, RoleType.SERVANT].includes(r));

    // Fill remaining spots
    const finalRoles: RoleType[] = [...specialRoles];
    
    // Fill Evil
    while (finalRoles.filter(r => [RoleType.ASSASSIN, RoleType.MORGANA, RoleType.MORDRED, RoleType.OBERON, RoleType.MINION].includes(r)).length < evilCount) {
        finalRoles.push(RoleType.MINION);
    }
    
    // Fill Good
    while (finalRoles.length < playerCount) {
        finalRoles.push(RoleType.SERVANT);
    }

    // Shuffle
    const shuffledRoles = [...finalRoles].sort(() => Math.random() - 0.5);

    // Assign to players
    const assignedPlayers = state.players.map((p, i) => ({
        ...p,
        role: shuffledRoles[i],
        isLeader: i === 0 // First player is initial leader
    }));

    // Shuffle leader
    const randomLeaderIndex = Math.floor(Math.random() * playerCount);
    assignedPlayers.forEach((p, i) => p.isLeader = i === randomLeaderIndex);

    setState(prev => ({
        ...prev,
        players: assignedPlayers,
        step: 'PASS',
        revealingPlayerIndex: 0,
        round: 1,
        missionResults: [null, null, null, null, null],
        voteTrack: 0
    }));
  };

  const nextReveal = () => {
    setState(prev => {
      const nextIndex = prev.revealingPlayerIndex + 1;
      if (nextIndex >= prev.players.length) {
        return { ...prev, step: 'ROUND_MAIN', revealingPlayerIndex: 0 };
      }
      return { ...prev, revealingPlayerIndex: nextIndex, step: 'PASS' };
    });
  };

  const confirmTeam = (playerIds: string[]) => {
    const team = state.players.filter(p => playerIds.includes(p.id));
    setState(prev => ({ 
      ...prev, 
      currentTeam: team,
      step: 'VOTE' 
    }));
  };

  const resolveTeamVote = (approved: boolean) => {
    if (approved) {
      setState(prev => ({
        ...prev,
        step: 'MISSION_PHASE',
        missionActionIndex: 0,
        currentMissionVotes: [],
        voteTrack: 0
      }));
    } else {
      // Rotate leader and retry
      setState(prev => {
        const currentLeaderIdx = prev.players.findIndex(p => p.isLeader);
        const nextLeaderIdx = (currentLeaderIdx + 1) % prev.players.length;
        const newPlayers = prev.players.map((p, i) => ({
          ...p,
          isLeader: i === nextLeaderIdx
        }));
        
        // If vote track reaches 5, Evil wins (standard rule)
        if (prev.voteTrack + 1 >= 5) {
             return { ...prev, step: 'GAME_OVER_EVIL' };
        }

        return {
          ...prev,
          players: newPlayers,
          voteTrack: prev.voteTrack + 1,
          step: 'ROUND_MAIN',
          currentTeam: []
        };
      });
    }
  };

  const submitMissionAction = (action: 'success' | 'fail') => {
    setState(prev => {
      const newVotes = [...prev.currentMissionVotes, action];
      const nextIndex = prev.missionActionIndex + 1;
      
      if (nextIndex >= prev.currentTeam.length) {
        // All votes in. Calculate result immediately.
        const failCount = newVotes.filter(v => v === 'fail').length;
        
        // Rules: 7+ players, Round 4 requires 2 fails. 
        let isFail = failCount >= 1;
        if (prev.players.length >= 7 && prev.round === 4) {
            isFail = failCount >= 2;
        }
 
        const isSuccess = !isFail;
        const newResults = [...prev.missionResults];
        newResults[prev.round - 1] = isSuccess ? 'success' : 'fail';

        return {
          ...prev,
          currentMissionVotes: newVotes,
          missionResults: newResults,
          step: 'MISSION_RESULT'
        };
      }

      return {
        ...prev,
        currentMissionVotes: newVotes,
        missionActionIndex: nextIndex
      };
    });
  };

  const nextRound = () => {
    setState(prev => {
       const successTotal = prev.missionResults.filter(r => r === 'success').length;
       const failTotal = prev.missionResults.filter(r => r === 'fail').length;

       if (failTotal >= 3) {
           return { ...prev, step: 'GAME_OVER_EVIL' };
       }
       
       if (successTotal >= 3) {
           // Good has won 3 missions. Check for Assassin.
           const hasAssassin = prev.players.some(p => p.role === RoleType.ASSASSIN);
           if (hasAssassin) {
               return { ...prev, step: 'ASSASSINATION' };
           } else {
               return { ...prev, step: 'GAME_OVER_GOOD' };
           }
       }

       // Rotate Leader
       const currentLeaderIdx = prev.players.findIndex(p => p.isLeader);
       const nextLeaderIdx = (currentLeaderIdx + 1) % prev.players.length;
       const newPlayers = prev.players.map((p, i) => ({
          ...p,
          isLeader: i === nextLeaderIdx
       }));

       return {
         ...prev,
         players: newPlayers,
         round: prev.round + 1,
         step: 'ROUND_MAIN',
         currentTeam: [],
         currentMissionVotes: [],
         voteTrack: 0
       };
    });
  };

  const assassinate = (targetId: string) => {
      const target = state.players.find(p => p.id === targetId);
      if (target?.role === RoleType.MERLIN) {
          setState(prev => ({ ...prev, step: 'GAME_OVER_EVIL' }));
      } else {
          setState(prev => ({ ...prev, step: 'GAME_OVER_GOOD' }));
      }
  };

  const resetGame = (step?: GameState['step']) => {
      setState({
          ...defaultState,
          step: step || 'WELCOME',
          players: state.players 
      });
  }

  return (
    <GameContext.Provider value={{ 
      ...state, 
      addPlayer, 
      removePlayer, 
      setGameStep, 
      startGame,
      assignRoles,
      nextReveal,
      confirmTeam,
      resolveTeamVote,
      submitMissionAction,
      nextRound,
      assassinate,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};