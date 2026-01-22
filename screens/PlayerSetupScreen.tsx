import React, { useState, useEffect } from 'react';
import { useGame } from '../store';
import { Button } from '../components/Button';

export const PlayerSetupScreen: React.FC = () => {
  const { players, addPlayer, removePlayer, startGame, setGameStep, removeAllPlayers } = useGame();
  const [inputValue, setInputValue] = useState('');

  // Automatically add default players if none exist
  useEffect(() => {
    if (players.length === 0) {
      // Only auto-add if we didn't just clear them intentionally. 
      // But for simplicity/original behavior, let's keep it but maybe we need a flag or check?
      // Actually, if we clear all, players.length becomes 0, ensuring this effect runs again might be annoying if it auto-fills immediately.
      // Let's modify the effect to ONLY run effectively ONCE on mount or checking if initial load.
      // However, the original code had `[]` dependency, so it only runs on mount. 
      // So clearing players won't trigger this effect again. Safe.
    }
  }, []);

  const handleAdd = () => {
    let nameToAdd = inputValue.trim();

    if (!nameToAdd) {
      let counter = 1;
      while (players.some(p => p.name === `玩家${counter}`) || players.some(p => p.name === `Player ${counter}`)) {
        counter++;
      }
      nameToAdd = `玩家${counter}`;
    }

    addPlayer(nameToAdd);
    setInputValue('');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display h-[100dvh] flex flex-col overflow-hidden text-gray-900 dark:text-white">
      <div className="flex items-center justify-between p-4 pt-6 pb-2 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm sticky top-0">
        <button onClick={() => setGameStep('WELCOME')} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">新游戏</h2>
      </div>

      <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar px-5 pb-32">
        <div className="pt-4 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">谁在玩？</h1>
          <p className="text-gray-500 dark:text-[#bab29c] text-sm font-medium">添加 5-10 名玩家开始派对</p>
        </div>

        <div className="flex gap-3 mb-8 items-center">
          <div className="relative flex-1 group">
            <input
              className="w-full h-14 bg-white dark:bg-surface-dark border border-gray-200 dark:border-[#544e3b] rounded-full px-6 text-base font-medium placeholder-gray-400 dark:placeholder-[#bab29c] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-black dark:text-white"
              placeholder="输入姓名"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#bab29c]">
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </div>
          </div>
          <button onClick={handleAdd} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-black shadow-lg shadow-primary/20 transition-transform active:scale-95">
            <span className="material-symbols-outlined text-[28px] font-bold">add</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">玩家 ({players.length})</h3>
            <button onClick={removeAllPlayers} className="text-xs font-semibold text-primary hover:text-primary-hover">清空全部</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {players.map((player, idx) => (
              <div key={player.id} className="group flex items-center justify-between p-2 pl-3 bg-white dark:bg-[#2d291e] border border-gray-100 dark:border-[#393528] rounded-full shadow-sm hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${['bg-purple-900/40 text-purple-300', 'bg-blue-900/40 text-blue-300', 'bg-green-900/40 text-green-300', 'bg-pink-900/40 text-pink-300', 'bg-orange-900/40 text-orange-300'][idx % 5]}`}>
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="font-bold text-sm truncate text-gray-900 dark:text-white leading-tight">{player.name}</p>
                    {idx === 0 && <p className="text-[10px] font-bold uppercase text-primary tracking-wide leading-tight">房主</p>}
                  </div>
                </div>
                <button onClick={() => removePlayer(player.id)} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mr-1">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent z-20 pb-8">
        <Button fullWidth onClick={startGame} icon="play_arrow">开始游戏</Button>
      </div>
    </div>
  );
};