import React from 'react';
import { useGame } from '../store';
import { Button } from '../components/Button';

export const VoteScreen: React.FC = () => {
  const { currentTeam, resolveTeamVote, voteTrack } = useGame();

  return (
    <div className="bg-background-dark font-display h-[100dvh] flex flex-col items-center p-6 overflow-hidden">
      <div className="w-full flex flex-col items-center pt-8 shrink-0">
        <span className="material-symbols-outlined text-4xl text-white/20 mb-4">how_to_vote</span>
        <h1 className="text-3xl font-bold text-white mb-2">队伍表决</h1>
        <p className="text-white/50 text-sm font-medium">请所有玩家对提议的队伍进行投票</p>
        
        {/* Vote Track Indicator */}
        <div className="mt-6 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <span className={`w-2 h-2 rounded-full ${voteTrack >= 1 ? 'bg-red-500' : 'bg-white/20'}`}></span>
            <span className={`w-2 h-2 rounded-full ${voteTrack >= 2 ? 'bg-red-500' : 'bg-white/20'}`}></span>
            <span className={`w-2 h-2 rounded-full ${voteTrack >= 3 ? 'bg-red-500' : 'bg-white/20'}`}></span>
            <span className={`w-2 h-2 rounded-full ${voteTrack >= 4 ? 'bg-red-500' : 'bg-white/20'}`}></span>
            <span className="text-[10px] text-white/40 ml-1">拒绝次数 {voteTrack}/5</span>
        </div>
      </div>

      <div className="w-full max-w-sm flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3 my-8">
        <div className="text-center mb-2">
            <h3 className="text-primary text-xs font-bold uppercase tracking-[0.2em]">提议成员</h3>
        </div>
        {currentTeam.map((player) => (
          <div key={player.id} className="flex items-center gap-4 bg-[#23201a] border border-primary/20 p-3 rounded-xl shadow-lg">
             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-black text-lg font-bold shadow-md">
                {player.name.charAt(0).toUpperCase()}
             </div>
             <span className="text-lg font-bold text-white">{player.name}</span>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col gap-4 mb-8 shrink-0">
        <p className="text-center text-white/30 text-xs mb-2">队长收集全场投票结果后录入</p>
        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={() => resolveTeamVote(false)}
                className="flex flex-col items-center justify-center h-32 rounded-2xl bg-gradient-to-br from-red-900/40 to-red-900/10 border border-red-500/30 hover:border-red-400 transition-all group shadow-[0_0_20px_rgba(239,68,68,0.15)]"
            >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="material-symbols-outlined text-white text-2xl">thumb_down</span>
                </div>
                <span className="text-white font-bold text-lg">反对</span>
                <span className="text-red-200/50 text-xs">Reject</span>
            </button>

            <button 
                onClick={() => resolveTeamVote(true)}
                className="flex flex-col items-center justify-center h-32 rounded-2xl bg-gradient-to-br from-green-900/40 to-green-900/10 border border-green-500/30 hover:border-green-400 transition-all group shadow-[0_0_20px_rgba(34,197,94,0.15)]"
            >
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="material-symbols-outlined text-white text-2xl">thumb_up</span>
                </div>
                <span className="text-white font-bold text-lg">同意</span>
                <span className="text-green-200/50 text-xs">Approve</span>
            </button>
        </div>
      </div>
    </div>
  );
};