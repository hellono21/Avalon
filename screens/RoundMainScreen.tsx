import React, { useState } from 'react';
import { useGame } from '../store';
import { Button } from '../components/Button';

export const RoundMainScreen: React.FC = () => {
  const { round, players, confirmTeam, resetGame, missionResults } = useGame();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  
  const leader = players.find(p => p.isLeader) || players[0];
  
  // Standard Avalon Rules
  const getRequiredCount = (r: number, count: number) => {
    if (count === 5) return [2, 3, 2, 3, 3][r - 1];
    if (count === 6) return [2, 3, 4, 3, 4][r - 1];
    if (count === 7) return [2, 3, 3, 4, 4][r - 1];
    if (count >= 8) return [3, 4, 4, 5, 5][r - 1];
    return 3;
  };

  const requiredCount = getRequiredCount(round, players.length);

  const togglePlayer = (id: string) => {
    if (selectedPlayers.includes(id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p !== id));
    } else {
      if (selectedPlayers.length < requiredCount) {
        setSelectedPlayers([...selectedPlayers, id]);
      }
    }
  };

  const handleConfirm = () => {
      confirmTeam(selectedPlayers);
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display h-[100dvh] flex flex-col overflow-hidden text-[#181611] dark:text-white relative">
      <header className="flex items-center justify-between p-4 z-10 shrink-0">
        <button onClick={() => resetGame()} className="flex size-10 shrink-0 items-center justify-center rounded-full text-white/50 hover:bg-white/5 active:bg-white/10 transition-colors">
          <span className="material-symbols-outlined" style={{fontSize: 24}}>settings</span>
        </button>
        <h2 className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase opacity-60">Avalon Assistant</h2>
        <button className="flex size-10 shrink-0 items-center justify-center rounded-full text-white/50 hover:bg-white/5 active:bg-white/10 transition-colors">
          <span className="material-symbols-outlined" style={{fontSize: 24}}>history</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col px-4 pb-28 pt-2 overflow-y-auto no-scrollbar">
        {/* Round Tracker */}
        <div className="flex flex-col items-center w-full mt-2 mb-6">
          <div className="relative flex items-center justify-between w-64 py-2">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-white/10 -z-10 -translate-y-1/2 rounded-full"></div>
            {[1, 2, 3, 4, 5].map((r) => {
               const result = missionResults[r-1];
               let bgColor = r === round ? 'border-primary bg-primary' : 'border-[#333] bg-[#1a1814]';
               if (result === 'success') bgColor = 'border-green-500 bg-green-500';
               if (result === 'fail') bgColor = 'border-red-500 bg-red-500';
               
               return (
               <div key={r} className={`relative flex items-center justify-center w-4 h-4 rounded-full border-2 z-10 transition-all duration-500 ${bgColor} ${r === round ? 'ring-4 ring-primary/20 scale-125 shadow-[0_0_15px_rgba(244,192,37,0.5)]' : ''}`}>
                 {result && <span className="material-symbols-outlined text-[10px] text-white font-bold">check</span>}
               </div>
            )})}
          </div>
          <div className="flex items-center gap-2 mt-2 opacity-60">
             <span className="text-[10px] uppercase tracking-widest">Mission {round}</span>
          </div>
        </div>

        {/* Mission Info Card */}
        <div className="w-full bg-gradient-to-br from-[#2a261e] to-[#1a1814] border border-white/5 rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl">swords</span>
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined text-xl">group_add</span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg leading-none">组建队伍</h3>
                        <p className="text-white/40 text-xs font-medium mt-1">需要选择 {requiredCount} 名玩家</p>
                    </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2 bg-black/20 rounded-lg p-3 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold text-xs shadow-lg">
                        {leader.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-primary uppercase font-bold tracking-wider">当前队长</span>
                        <span className="text-white text-sm font-bold">{leader.name}</span>
                    </div>
                    <div className="ml-auto">
                        <span className="material-symbols-outlined text-primary text-xl">crown</span>
                    </div>
                </div>
            </div>
        </div>

        <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4 px-2">点击选择玩家</h3>

        {/* Player Selection List */}
        <div className="flex flex-col gap-3">
            {players.map((player) => {
                const isSelected = selectedPlayers.includes(player.id);
                return (
                    <button 
                        key={player.id}
                        onClick={() => togglePlayer(player.id)}
                        className={`relative flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${isSelected ? 'bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(244,192,37,0.1)]' : 'bg-[#23201a]/50 border-white/5 hover:bg-[#23201a]'}`}
                    >
                        <div className="flex items-center gap-4">
                             <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-all ${isSelected ? 'bg-primary text-black scale-105 shadow-lg' : 'bg-white/5 text-white/40'}`}>
                                {player.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col items-start">
                                <span className={`text-base font-bold transition-colors ${isSelected ? 'text-primary' : 'text-white/70'}`}>{player.name}</span>
                                {player.isLeader && <span className="text-[10px] text-primary/60 uppercase tracking-wider">队长</span>}
                            </div>
                        </div>
                        
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary bg-primary' : 'border-white/20'}`}>
                            {isSelected && <span className="material-symbols-outlined text-black text-sm font-bold">check</span>}
                        </div>
                    </button>
                );
            })}
        </div>
      </main>

      {/* Footer Action */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0d0c09] via-[#0d0c09] to-transparent z-20">
        <Button 
            fullWidth 
            onClick={handleConfirm} 
            disabled={selectedPlayers.length !== requiredCount}
            className={selectedPlayers.length !== requiredCount ? 'opacity-50 grayscale' : ''}
            icon="task_alt"
        >
            {selectedPlayers.length !== requiredCount ? `需选择 ${requiredCount} 人` : '确认提议'}
        </Button>
      </div>
    </div>
  );
};