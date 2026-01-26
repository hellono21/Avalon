import React, { useState } from 'react';
import { useGame } from '../store';
import { Button } from '../components/Button';

export const RoundMainScreen: React.FC = () => {
  const { round, players, confirmTeam, resetGame, missionResults } = useGame();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const leader = players.find(p => p.isLeader) || players[0];

  // Standard Avalon Rules
  const getRequiredCount = (r: number, count: number) => {
    if (count === 4) return 2; // 4人简化版:每轮固定2人
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
    <div className="bg-background-light dark:bg-background-dark font-display h-[100dvh] flex flex-col overflow-hidden text-[#181611] dark:text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 shrink-0 border-b border-white/5">
        <button onClick={() => resetGame()} className="flex size-10 shrink-0 items-center justify-center rounded-full text-white/50 hover:bg-white/5 active:bg-white/10 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>reset_settings</span>
        </button>
        <h2 className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase opacity-60">Mission {round}</h2>
        <button className="flex size-10 shrink-0 items-center justify-center rounded-full text-white/50 hover:bg-white/5 active:bg-white/10 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>history</span>
        </button>
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {/* Round Tracker - Compact */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {(players.length === 4 ? [1, 2, 3] : [1, 2, 3, 4, 5]).map((r) => {
            const result = missionResults[r - 1];
            let bgColor = r === round ? 'border-primary bg-primary' : 'border-[#333] bg-[#1a1814]';
            if (result === 'success') bgColor = 'border-green-500 bg-green-500';
            if (result === 'fail') bgColor = 'border-red-500 bg-red-500';

            return (
              <div key={r} className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-500 ${bgColor} ${r === round ? 'ring-2 ring-primary/30 scale-110' : ''}`}>
                {result && <span className="material-symbols-outlined text-xs text-white font-bold">check</span>}
                {!result && <span className="text-white/40 text-xs font-bold">{r}</span>}
              </div>
            )
          })}
        </div>

        {/* Mission Info - Compact Card */}
        <div className="bg-gradient-to-br from-[#2a261e] to-[#1a1814] border border-white/5 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-primary text-lg">group_add</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">组建队伍</h3>
                <p className="text-white/40 text-xs">选择 {requiredCount} 名玩家</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-primary text-xs font-bold">已选择</p>
              <p className="text-white text-lg font-bold">{selectedPlayers.length}/{requiredCount}</p>
            </div>
          </div>

          {/* Leader Info - Inline */}
          <div className="flex items-center gap-2 bg-black/20 rounded-lg p-2 border border-white/5">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-black font-bold text-xs">
              {leader.name.charAt(0)}
            </div>
            <span className="text-white text-xs font-bold">{leader.name}</span>
            <span className="text-primary/60 text-[10px] uppercase tracking-wider">队长</span>
            <span className="material-symbols-outlined text-primary text-sm ml-auto">crown</span>
          </div>
        </div>

        {/* Player Selection - Grid Layout */}
        <div className="mb-4">
          <h3 className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">点击选择玩家</h3>
          <div className="grid grid-cols-2 gap-3">
            {players.map((player) => {
              const isSelected = selectedPlayers.includes(player.id);
              const selectionIndex = selectedPlayers.indexOf(player.id);

              return (
                <button
                  key={player.id}
                  onClick={() => togglePlayer(player.id)}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                      ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(244,192,37,0.2)]'
                      : 'bg-[#23201a]/50 border-white/5 hover:bg-[#23201a] hover:border-white/10'
                    }`}
                >
                  {/* Selection Badge */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
                      <span className="text-black text-xs font-bold">{selectionIndex + 1}</span>
                    </div>
                  )}

                  {/* Player Avatar */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold transition-all mb-2 ${isSelected
                      ? 'bg-primary text-black scale-105'
                      : 'bg-white/5 text-white/40'
                    }`}>
                    {player.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Player Name */}
                  <span className={`text-sm font-bold transition-colors text-center ${isSelected ? 'text-primary' : 'text-white/70'
                    }`}>
                    {player.name}
                  </span>

                  {/* Leader Badge */}
                  {player.isLeader && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-primary text-xs">crown</span>
                      <span className="text-[10px] text-primary/60 uppercase tracking-wider">队长</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Fixed Footer - Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0d0c09] via-[#0d0c09]/95 to-transparent backdrop-blur-sm border-t border-white/5">
        <Button
          fullWidth
          onClick={handleConfirm}
          disabled={selectedPlayers.length !== requiredCount}
          className={selectedPlayers.length !== requiredCount ? 'opacity-50 grayscale' : ''}
          icon="task_alt"
        >
          {selectedPlayers.length !== requiredCount ? `还需选择 ${requiredCount - selectedPlayers.length} 人` : '确认提议'}
        </Button>
      </div>
    </div>
  );
};