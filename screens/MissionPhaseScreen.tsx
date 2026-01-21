import React, { useState } from 'react';
import { useGame } from '../store';
import { RoleType } from '../types';

export const MissionPhaseScreen: React.FC = () => {
  const { currentTeam, missionActionIndex, submitMissionAction } = useGame();
  const [isReady, setIsReady] = useState(false);

  const currentPlayer = currentTeam[missionActionIndex];
  
  // Note: Standard rules say Good MUST vote success, but physical game allows playing either card.
  // We allow both to prevent UI meta-gaming (screen peeking) and enable house rules/human error.

  if (!isReady) {
    return (
      <div className="relative flex h-[100dvh] w-full flex-col bg-black text-white overflow-hidden font-display">
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8 w-full max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary text-primary shadow-[0_0_30px_rgba(244,192,37,0.2)] animate-pulse">
            <span className="material-symbols-outlined text-4xl">local_activity</span>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <p className="text-primary font-bold uppercase tracking-widest text-sm">任务执行中</p>
            <h1 className="text-white tracking-tight text-4xl font-black leading-tight">
              请将手机传递给<br/>
              <span className="text-primary">{currentPlayer.name}</span>
            </h1>
          </div>
        </div>
        <div className="w-full p-8 pb-12 flex justify-center">
          <button 
            onClick={() => setIsReady(true)}
            className="w-full max-w-[320px] h-16 rounded-full bg-[#1a1814] border border-white/20 hover:bg-white/10 text-white font-bold text-xl transition-all"
          >
            我就是 {currentPlayer.name}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-[#0d0c09] text-white overflow-hidden font-display">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6KuKORaHMiOSPgMYm7aKtNHIjs-1T-E4dJQD5V--24HwuUwfwHjfbhUWOswYg3O3FSGIlfCB4ua6vP7Tw3b_sauFc25yFhxSjbJOpOUfWfkJva9IlrztGRe9-zdtGF_nsLFBqtTpipHhDlz40Y91B_pibK-9gjtyUgpok8OPPEgYE9hf_HHo2PvdgRXFo2nyh3HCn8aZVpJNIJ6XFJfVl5Ng_E6spJmd8Z4WIGeT_VI5-KKwY6JgiTmpr8cc176TAKJv6MPm1B4TT')] opacity-5 pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto z-10">
        <h2 className="text-white/60 font-medium text-lg mb-8">请选择任务行动</h2>
        
        <div className="grid grid-cols-1 w-full gap-6">
            <button 
                onClick={() => { submitMissionAction('success'); setIsReady(false); }}
                className="relative group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-green-900/40 to-green-900/10 border border-green-500/30 hover:border-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.15)]"
            >
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-2xl text-white">check</span>
                    </div>
                    <div className="text-left">
                        <p className="text-2xl font-bold text-white">成功</p>
                        <p className="text-green-200/50 text-xs font-medium uppercase tracking-wider">Success</p>
                    </div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-green-500/50 group-hover:bg-green-500"></div>
            </button>

            <button 
                onClick={() => { submitMissionAction('fail'); setIsReady(false); }}
                className="relative group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-red-900/40 to-red-900/10 border border-red-500/30 hover:border-red-400 transition-all shadow-[0_0_20px_rgba(239,68,68,0.15)]"
            >
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-2xl text-white">close</span>
                    </div>
                    <div className="text-left">
                        <p className="text-2xl font-bold text-white">失败</p>
                        <p className="text-red-200/50 text-xs font-medium uppercase tracking-wider">Fail</p>
                    </div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-red-500/50 group-hover:bg-red-500"></div>
            </button>
        </div>
      </div>
    </div>
  );
};