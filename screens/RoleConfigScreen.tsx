import React, { useState } from 'react';
import { useGame } from '../store';
import { RoleType } from '../types';

export const RoleConfigScreen: React.FC = () => {
  const { assignRoles, players, setGameStep } = useGame();

  const [specials, setSpecials] = useState<RoleType[]>([RoleType.MERLIN, RoleType.ASSASSIN]);

  const toggleRole = (role: RoleType) => {
    if (specials.includes(role)) {
      setSpecials(specials.filter(r => r !== role));
    } else {
      setSpecials([...specials, role]);
    }
  };

  const playerCount = players.length;
  const is4PlayerMode = playerCount === 4;

  let evilCount = 2;
  if (playerCount >= 7) evilCount = 3;
  if (playerCount >= 10) evilCount = 4;
  const goodCount = playerCount - evilCount;

  const currentGoodSpecials = specials.filter(r => [RoleType.MERLIN, RoleType.PERCIVAL].includes(r)).length;
  const currentEvilSpecials = specials.filter(r => [RoleType.ASSASSIN, RoleType.MORGANA, RoleType.MORDRED, RoleType.OBERON].includes(r)).length;

  const handleStart = () => {
    assignRoles(is4PlayerMode ? [] : specials);
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col dark:bg-[#12100c] overflow-hidden font-display">
      {/* Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('./images/role_config_bg.png')] bg-cover opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12100c]/80 to-[#12100c]"></div>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#181611]/80 border-b border-white/10 shrink-0">
        <div className="flex items-center p-4 pb-3 justify-between max-w-md mx-auto w-full">
          <button onClick={() => setGameStep('SETUP')} className="text-white/80 hover:text-white transition-colors flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="text-white text-xl font-bold leading-tight tracking-tight flex-1 text-center drop-shadow-md">角色配置</h1>
          <button className="flex size-10 shrink-0 items-center justify-center rounded-full text-white/80 hover:text-white active:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">info</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-32 w-full max-w-md mx-auto">
        {/* 4人简化版提示 */}
        {is4PlayerMode && (
          <div className="px-4 py-5">
            <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 p-5 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-3xl text-primary">bolt</span>
                <h3 className="text-primary text-lg font-bold">🎯 4人简化版规则</h3>
              </div>
              <div className="space-y-2 text-white/80 text-sm">
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                  固定配置: <strong className="text-white">3个忠臣 + 1个爪牙</strong>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                  <strong className="text-white">3轮任务</strong>,每轮 <strong className="text-white">2人</strong> 执行
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                  <strong className="text-white">2个任务成功</strong> 即好人胜利
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                  无刺杀环节,游戏结束直接判定胜负
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 标准版配置 */}
        {!is4PlayerMode && (
          <>
            <div className="px-4 py-5">
              <h3 className="text-white/90 text-sm font-bold uppercase tracking-wider mb-3 pl-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">balance</span>
                阵营人数纵览 ({playerCount}人局)
              </h3>
              <div className="rounded-xl bg-[#2a261e]/80 border border-white/5 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-blue-400 font-bold text-sm">正义 ({goodCount})</span>
                  <span className="text-red-400 font-bold text-sm">邪恶 ({evilCount})</span>
                </div>
                <div className="relative h-3 w-full rounded-full overflow-hidden bg-[#1a1814] shadow-inner flex">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500"
                    style={{ width: `${(goodCount / playerCount) * 100}%` }}
                  ></div>
                  <div
                    className="h-full bg-gradient-to-l from-red-600 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-500"
                    style={{ width: `${(evilCount / playerCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="sticky top-[0px] z-30 bg-[#12100c]/95 backdrop-blur-sm px-4 py-3 border-b border-white/5 shadow-sm">
              <h3 className="text-blue-400 text-sm font-bold uppercase tracking-wider pl-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                正义阵营 ({currentGoodSpecials} 特殊 / {goodCount - currentGoodSpecials} 忠臣)
              </h3>
            </div>

            <div className="flex flex-col gap-3 px-4 py-3">
              <RoleItem
                name="梅林 (Merlin)"
                desc="初始知晓所有邪恶玩家"
                img="./images/merlin.png"
                checked={specials.includes(RoleType.MERLIN)}
                onChange={() => toggleRole(RoleType.MERLIN)}
                color="blue"
                icon="visibility"
              />
              <RoleItem
                name="派西维尔 (Percival)"
                desc="知晓梅林和莫甘娜"
                img="./images/percival.png"
                checked={specials.includes(RoleType.PERCIVAL)}
                onChange={() => toggleRole(RoleType.PERCIVAL)}
                color="blue"
              />
            </div>

            <div className="sticky top-[0px] z-30 bg-[#12100c]/95 backdrop-blur-sm px-4 py-3 border-b border-white/5 shadow-sm mt-2">
              <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider pl-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">dangerous</span>
                邪恶阵营 ({currentEvilSpecials} 特殊 / {evilCount - currentEvilSpecials} 爪牙)
              </h3>
            </div>

            <div className="flex flex-col gap-3 px-4 py-3">
              <RoleItem
                name="刺客 (Assassin)"
                desc="游戏结束时刺杀梅林"
                img="./images/assassin.png"
                checked={specials.includes(RoleType.ASSASSIN)}
                onChange={() => toggleRole(RoleType.ASSASSIN)}
                color="red"
                icon="local_fire_department"
              />
              <RoleItem
                name="莫甘娜 (Morgana)"
                desc="伪装成梅林迷惑派西维尔"
                img="./images/morgana.png"
                checked={specials.includes(RoleType.MORGANA)}
                onChange={() => toggleRole(RoleType.MORGANA)}
                color="red"
              />
              <RoleItem
                name="莫德雷德 (Mordred)"
                desc="梅林无法看见其邪恶身份"
                img="./images/mordred.png"
                checked={specials.includes(RoleType.MORDRED)}
                onChange={() => toggleRole(RoleType.MORDRED)}
                color="red"
              />
              <RoleItem
                name="奥伯伦 (Oberon)"
                desc="不认识队友的邪恶角色"
                img="./images/oberon.png"
                checked={specials.includes(RoleType.OBERON)}
                onChange={() => toggleRole(RoleType.OBERON)}
                color="red"
              />
            </div>
          </>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-gradient-to-t from-[#0d0c09] via-[#0d0c09]/95 to-transparent pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button
            onClick={handleStart}
            disabled={!is4PlayerMode && (currentEvilSpecials > evilCount || currentGoodSpecials > goodCount)}
            className={`w-full relative group overflow-hidden rounded-lg bg-primary py-4 px-6 text-[#1a1814] shadow-[0_0_20px_rgba(242,185,13,0.3)] transition-all active:scale-[0.98] hover:bg-primary-dark flex items-center justify-center gap-2 ${!is4PlayerMode && (currentEvilSpecials > evilCount || currentGoodSpecials > goodCount) ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
          >
            <span className="text-lg font-bold tracking-wider font-display uppercase">
              {is4PlayerMode
                ? '开始游戏'
                : (currentEvilSpecials > evilCount ? '邪恶角色过多' : (currentGoodSpecials > goodCount ? '正义角色过多' : '保存并开始'))
              }
            </span>
            <span className="material-symbols-outlined font-bold">play_arrow</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const RoleItem = ({ name, desc, img, checked, onChange, color, icon }: any) => (
  <div
    onClick={onChange}
    className={`group relative overflow-hidden rounded-xl bg-[#23201a] border ${checked ? `border-${color}-500` : 'border-white/5'} p-3 cursor-pointer hover:border-${color}-500/50 transition-all duration-300 shadow-md select-none`}
  >
    <div className={`absolute inset-0 bg-gradient-to-r from-${color}-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
    <div className="flex items-center justify-between gap-4 relative z-10">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className={`bg-center bg-no-repeat bg-cover rounded-full h-14 w-14 ring-2 ring-${color}-500/30 shadow-lg ${!checked ? 'grayscale opacity-70' : ''}`} style={{ backgroundImage: `url('${img}')` }}></div>
          {icon && <div className={`absolute -bottom-1 -right-1 bg-${color}-900 rounded-full p-1 border border-[#23201a]`}>
            <span className={`material-symbols-outlined text-[10px] text-${color}-200 block`}>{icon}</span>
          </div>}
        </div>
        <div className="flex flex-col justify-center">
          <p className={`text-base font-bold leading-tight font-display tracking-wide ${checked ? `text-${color}-100` : 'text-white/70'}`}>{name}</p>
          <p className="text-white/50 text-xs font-normal leading-normal mt-1">{desc}</p>
        </div>
      </div>
      <div className="shrink-0">
        <div className={`relative flex h-[28px] w-[48px] items-center rounded-full border border-white/10 bg-[#1a1814] p-1 transition-colors ${checked ? 'bg-blue-600 border-blue-600' : ''} shadow-inner`}>
          <div className={`h-[20px] w-[20px] rounded-full bg-white/40 shadow-sm transition-all ${checked ? 'bg-white translate-x-[20px]' : ''}`}></div>
        </div>
      </div>
    </div>
  </div>
);