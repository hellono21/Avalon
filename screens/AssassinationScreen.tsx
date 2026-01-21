import React, { useState } from 'react';
import { useGame } from '../store';
import { Button } from '../components/Button';
import { RoleType } from '../types';

export const AssassinationScreen: React.FC = () => {
  const { players, assassinate } = useGame();
  const [isReady, setIsReady] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  const assassin = players.find(p => p.role === RoleType.ASSASSIN) || players.find(p => p.role === RoleType.MORGANA) || players.find(p => !([RoleType.MERLIN, RoleType.PERCIVAL, RoleType.SERVANT].includes(p.role)));
  
  if (!assassin) return <div className="text-white">Error: No Assassin found.</div>;

  if (!isReady) {
    return (
      <div className="relative flex h-[100dvh] w-full flex-col bg-black text-white overflow-hidden font-display">
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8 w-full max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-evil/10 border border-evil text-evil shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse">
            <span className="material-symbols-outlined text-4xl">gps_fixed</span>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <p className="text-evil font-bold uppercase tracking-widest text-sm">刺杀时刻</p>
            <h1 className="text-white tracking-tight text-4xl font-black leading-tight">
              请将手机传递给<br/>
              <span className="text-evil">{assassin.name}</span>
            </h1>
            <p className="text-white/40 text-sm mt-2">正义阵营已完成 3 个任务。<br/>刺客拥有最后一次反击机会。</p>
          </div>
        </div>
        <div className="w-full p-8 pb-12 flex justify-center">
          <button 
            onClick={() => setIsReady(true)}
            className="w-full max-w-[320px] h-16 rounded-full bg-[#1a1814] border border-white/20 hover:bg-white/10 text-white font-bold text-xl transition-all"
          >
            我就是 {assassin.name}
          </button>
        </div>
      </div>
    );
  }

  // Filter out the assassin themselves from list (usually they can kill anyone, but killing self is silly)
  const targets = players.filter(p => p.id !== assassin.id);

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-[#0d0c09] text-white overflow-hidden font-display">
       {/* Background Overlay */}
       <div className="absolute inset-0 bg-red-900/5 pointer-events-none"></div>

      <header className="p-6 pt-8 text-center z-10 shrink-0">
        <h1 className="text-3xl font-black text-white mb-2">谁是梅林？</h1>
        <p className="text-evil text-sm font-bold uppercase tracking-widest">
            刺杀梅林以赢得胜利
        </p>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
        <div className="grid grid-cols-2 gap-3">
          {targets.map((player) => {
            const isSelected = selectedTarget === player.id;
            return (
              <button 
                key={player.id}
                onClick={() => setSelectedTarget(player.id)}
                className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'bg-evil/10 border-evil shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-[#1a1814] border-white/5 hover:border-white/20'}`}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold mb-3 transition-transform ${isSelected ? 'bg-evil text-white scale-110' : 'bg-[#2a261e] text-white/50'}`}>
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <span className={`text-base font-bold ${isSelected ? 'text-white' : 'text-white/70'}`}>{player.name}</span>
                
                {/* Target Scope Icon if selected */}
                {isSelected && (
                    <div className="absolute top-2 right-2 text-evil">
                        <span className="material-symbols-outlined text-xl">gps_fixed</span>
                    </div>
                )}
              </button>
            );
          })}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent z-20">
        <Button 
            fullWidth 
            variant="evil"
            onClick={() => selectedTarget && assassinate(selectedTarget)} 
            disabled={!selectedTarget}
            className={!selectedTarget ? 'opacity-50 grayscale' : ''}
            icon="local_fire_department"
        >
            刺杀
        </Button>
      </div>
    </div>
  );
};