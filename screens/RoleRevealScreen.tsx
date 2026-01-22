import React, { useEffect, useState } from 'react';
import { useGame } from '../store';
import { RoleType } from '../types';

export const RoleRevealScreen: React.FC = () => {
  const { players, revealingPlayerIndex, nextReveal } = useGame();
  const TOTAL_TIME = 10;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const currentPlayer = players[revealingPlayerIndex];

  // Logic for what the current player sees
  const seenPlayers = players.filter(p => {
    if (p.id === currentPlayer.id) return false; // Don't see self

    switch (currentPlayer.role) {
      case RoleType.MERLIN:
        // Sees all evil except Mordred
        return [RoleType.ASSASSIN, RoleType.MORGANA, RoleType.MINION, RoleType.OBERON].includes(p.role);
      case RoleType.PERCIVAL:
        // Sees Merlin and Morgana (as Unknown)
        return [RoleType.MERLIN, RoleType.MORGANA].includes(p.role);
      case RoleType.ASSASSIN:
      case RoleType.MORGANA:
      case RoleType.MORDRED:
      case RoleType.MINION:
        // Evil sees evil (except Oberon)
        return [RoleType.ASSASSIN, RoleType.MORGANA, RoleType.MORDRED, RoleType.MINION].includes(p.role);
      default:
        return false;
    }
  });

  const isEvil = [RoleType.ASSASSIN, RoleType.MORGANA, RoleType.MORDRED, RoleType.OBERON, RoleType.MINION].includes(currentPlayer.role);
  const themeColor = isEvil ? 'evil' : 'primary'; // Tailwind colors

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      nextReveal();
    }
  }, [timeLeft, nextReveal]);

  const getRoleTitle = (role: RoleType) => {
    switch (role) {
      case RoleType.MERLIN: return "梅林";
      case RoleType.PERCIVAL: return "派西维尔";
      case RoleType.SERVANT: return "忠臣";
      case RoleType.ASSASSIN: return "刺客";
      case RoleType.MORGANA: return "莫甘娜";
      case RoleType.MORDRED: return "莫德雷德";
      case RoleType.OBERON: return "奥伯伦";
      case RoleType.MINION: return "爪牙";
      default: return role;
    }
  }

  const getRoleDesc = (role: RoleType) => {
    switch (role) {
      case RoleType.MERLIN: return "亚瑟的忠臣";
      case RoleType.PERCIVAL: return "梅林的守护者";
      case RoleType.SERVANT: return "亚瑟的忠臣";
      case RoleType.ASSASSIN: return "邪恶的刺客";
      case RoleType.MORGANA: return "邪恶的化身";
      case RoleType.MORDRED: return "邪恶的首领";
      default: return "邪恶的爪牙";
    }
  }

  // SVG Circle Logic
  const radius = 45;
  const circumference = 2 * Math.PI * radius; // ~282.74
  // We want the circle to start full (offset 0) and empty out (offset = circumference)
  const strokeDashoffset = circumference * (1 - (timeLeft / TOTAL_TIME));

  return (
    <div
      onClick={nextReveal}
      className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display h-[100dvh] flex flex-col overflow-hidden cursor-pointer"
    >
      <div className="relative flex-1 flex flex-col items-center justify-center w-full px-6 py-6 pb-24">
        {/* Glow BG */}
        <div aria-hidden="true" className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-${themeColor}/10 via-transparent to-transparent pointer-events-none`}></div>

        {/* Identity Circle */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-[18rem] aspect-square mb-4">
          <svg className={`w-full h-full drop-shadow-[0_0_15px_${isEvil ? 'rgba(239,68,68,0.3)' : 'rgba(244,192,37,0.1)'}]`} viewBox="0 0 100 100">
            <circle className="text-white/5" cx="50" cy="50" fill="transparent" r={radius} stroke="currentColor" strokeWidth="1.5"></circle>
            {/* Animated Circle Segment */}
            <circle
              className={`text-${themeColor} transition-all duration-1000 ease-linear`}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset
              }}
              cx="50" cy="50"
              fill="transparent"
              r={radius}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
            ></circle>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-8">
            <h1 className="text-white text-5xl sm:text-6xl font-black tracking-[0.1em] mb-2 drop-shadow-lg text-nowrap">
              {getRoleTitle(currentPlayer.role)}
            </h1>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className={`material-symbols-outlined text-${themeColor === 'evil' ? 'stone-400' : 'primary'} text-[18px] fill-1`}>
                {isEvil ? 'skull' : 'shield'}
              </span>
              <p className="text-white/90 text-sm font-medium leading-normal tracking-wider text-nowrap">
                {getRoleDesc(currentPlayer.role)}
              </p>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        {seenPlayers.length > 0 && (
          <div className="flex flex-col items-center gap-3 z-10 w-full max-w-sm mt-2">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-${themeColor}/10 border border-${themeColor}/20 backdrop-blur-sm`}>
              <span className={`material-symbols-outlined text-${themeColor} text-[16px]`}>visibility</span>
              <span className={`text-${themeColor}/90 text-[10px] font-bold tracking-[0.2em] uppercase`}>
                {currentPlayer.role === RoleType.PERCIVAL ? '梅林或莫甘娜' : (isEvil ? '你的邪恶同伙' : '坏人阵营')}
              </span>
            </div>
            <div className="grid grid-cols-2 w-full gap-3 mt-1">
              {seenPlayers.map(p => (
                <div key={p.id} className={`flex flex-col items-center justify-center p-3.5 rounded-2xl bg-${themeColor}/5 border border-${themeColor}/10 backdrop-blur-sm shadow-[0_0_15px_${isEvil ? 'rgba(239,68,68,0.05)' : 'rgba(244,192,37,0.05)'}]`}>
                  <span className={`text-${themeColor} text-xl font-bold tracking-widest drop-shadow-[0_0_8px_${isEvil ? 'rgba(239,68,68,0.3)' : 'rgba(244,192,37,0.3)'}]`}>{p.name}</span>
                  <span className={`text-${themeColor}/70 text-xs font-medium tracking-wider mt-1`}>
                    {currentPlayer.role === RoleType.PERCIVAL ? '未知' : getRoleTitle(p.role)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timer/Action */}
        <div className="absolute bottom-10 sm:bottom-12 flex flex-col items-center gap-4 w-full pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary/80 text-xl">timer</span>
            <span className="text-white/80 text-sm font-bold tracking-widest uppercase">
              {timeLeft > 0 ? `剩余 ${timeLeft} 秒` : "时间到"}
            </span>
          </div>
          <p className="text-[#8c8573] text-xs sm:text-sm font-medium tracking-[0.25em] text-center px-4">
            静静地记住这些信息
          </p>
        </div>
      </div>
    </div>
  );
};