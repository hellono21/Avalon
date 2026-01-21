import React from 'react';
import { useGame } from '../store';
import { Button } from '../components/Button';

export const MissionResultScreen: React.FC = () => {
  const { nextRound, round, missionResults } = useGame();
  
  // Retrieve the result of the current round (which just finished)
  // round is 1-indexed, missionResults is 0-indexed.
  const result = missionResults[round - 1];
  const isMissionSuccess = result === 'success';

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-[#0d0c09] text-white overflow-hidden font-display">
      {/* Ambient Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none ${isMissionSuccess ? 'bg-green-500' : 'bg-red-500'}`}></div>

      <div className="flex-1 flex flex-col items-center pt-12 px-6 z-10">
        
        {/* Round Tracker */}
        <div className="relative flex items-center justify-between w-64 py-2 mb-12">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-white/10 -z-10 -translate-y-1/2 rounded-full"></div>
            {[1, 2, 3, 4, 5].map((r) => {
               const res = missionResults[r-1];
               let bgColor = r === round ? 'border-primary bg-primary' : 'border-[#333] bg-[#1a1814]';
               if (res === 'success') bgColor = 'border-green-500 bg-green-500';
               if (res === 'fail') bgColor = 'border-red-500 bg-red-500';
               
               return (
               <div key={r} className={`relative flex items-center justify-center w-4 h-4 rounded-full border-2 z-10 transition-all duration-500 ${bgColor} ${r === round ? 'scale-125 ring-4 ring-white/5' : ''}`}>
                 {res && <span className="material-symbols-outlined text-[10px] text-white font-bold">check</span>}
               </div>
            )})}
        </div>

        {/* Main Result Content */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-20 w-full animate-in zoom-in duration-500">
             
             {/* Icon */}
             <div className="mb-8 relative">
                 <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${isMissionSuccess ? 'bg-green-500' : 'bg-red-500'}`}></div>
                 <span className={`relative material-symbols-outlined text-[140px] drop-shadow-2xl ${isMissionSuccess ? 'text-green-500' : 'text-red-500'}`} style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                     {isMissionSuccess ? 'check_circle' : 'cancel'}
                 </span>
             </div>
             
             {/* Title */}
             <h1 className={`text-6xl font-black tracking-[0.15em] text-center text-nowrap drop-shadow-xl ${isMissionSuccess ? 'text-green-500' : 'text-red-500'}`}>
                {isMissionSuccess ? '任务成功' : '任务失败'}
             </h1>
             
        </div>
      </div>

      <div className="p-6 pb-8 z-20 bg-gradient-to-t from-black via-black to-transparent">
        <Button 
            fullWidth 
            onClick={nextRound} 
            icon="fast_forward"
            className="h-16 text-lg"
        >
            下一回合
        </Button>
      </div>
    </div>
  );
};