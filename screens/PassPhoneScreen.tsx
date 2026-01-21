import React from 'react';
import { useGame } from '../store';
import { Button } from '../components/Button';

export const PassPhoneScreen: React.FC = () => {
  const { setGameStep, nextReveal, revealingPlayerIndex, players } = useGame();
  
  const nextPlayer = players[revealingPlayerIndex];

  const handleNext = () => {
    setGameStep('REVEAL');
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-black text-white overflow-hidden font-display selection:bg-primary selection:text-black">
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-12 w-full max-w-md mx-auto">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#111111] border border-[#222] shadow-2xl">
          <span className="material-symbols-outlined text-5xl text-white">
            visibility_off
          </span>
        </div>
        <div className="flex flex-col gap-6 text-center">
          <h1 className="text-white tracking-tight text-4xl md:text-[42px] font-black leading-[1.2]">
            请将手机传递给<br/>
            <span className="text-primary">{nextPlayer?.name}</span>
          </h1>
          <p className="text-white/60 text-lg font-medium leading-relaxed max-w-[280px] mx-auto">
            在 {nextPlayer?.name} 准备好之前，请确保无人看到屏幕
          </p>
        </div>
      </div>
      <div className="w-full p-8 pb-12 bg-black flex justify-center">
        <button 
          onClick={handleNext}
          className="flex w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-16 px-6 bg-primary text-[#181611] text-xl font-bold leading-normal tracking-wide hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(244,192,37,0.15)]"
        >
          <span className="truncate">我是 {nextPlayer?.name}</span>
        </button>
      </div>
    </div>
  );
};