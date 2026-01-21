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
  let evilCount = 2;
  if (playerCount >= 7) evilCount = 3;
  if (playerCount >= 10) evilCount = 4;
  const goodCount = playerCount - evilCount;

  const currentGoodSpecials = specials.filter(r => [RoleType.MERLIN, RoleType.PERCIVAL].includes(r)).length;
  const currentEvilSpecials = specials.filter(r => [RoleType.ASSASSIN, RoleType.MORGANA, RoleType.MORDRED, RoleType.OBERON].includes(r)).length;

  const handleStart = () => {
     assignRoles(specials);
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col dark:bg-[#12100c] overflow-hidden font-display">
        {/* Background Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgYewVUKPRii9b9zBmMwgJLnKLu4qfB-aExqMDaunilxsNA9mD-aSoJV6vWDqLbzzc6MiALwz394YgEaU3abAtabp3QLwDh73dqQlfsIiZI9gijdfHqdC_M9NuvksfyoyPuYzHBqq1gZj7n7RXwg7LFIdO-fMPF_7ZbOkJOY8ZaUwyPHEoo6rdm2vU1_AU3_arozZ0ARoCyzPvKEfE2JpCpthcAT-9IL7xg2h0EOa1WDPKtSGyuT9SOvAJq0WXhJa7Pv9YOyA5Ils-')] bg-cover opacity-15"></div>
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
                style={{width: `${(goodCount/playerCount)*100}%`}}
              ></div>
              <div 
                className="h-full bg-gradient-to-l from-red-600 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-500" 
                style={{width: `${(evilCount/playerCount)*100}%`}}
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
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuBrSMJQ_9nR3uhDMkD0l8nMQErya4upXJVpIIEIbS3EzRBig0S4KtD67dk7AZv0gzoAbnodpIO3LGzvAXC7ZdpRunQc6iqigBXLCU5i_1pyWj_OVmG6DjeLJRdG8pC7PjmVH53o4aSKKV0euF4IvcjaJDP78Y1eaBXSKNfV__YpIbaaTCfzJwI1O18CE9OOUVz6KHJua6JyqCy7Qgrfvg_YMDJYrAo9_z_iEffSy0nutSN5bY49PqRl2XYQtbLoypJHs1aMrrD4lutx"
                checked={specials.includes(RoleType.MERLIN)}
                onChange={() => toggleRole(RoleType.MERLIN)}
                color="blue"
                icon="visibility"
            />
            <RoleItem 
                name="派西维尔 (Percival)" 
                desc="知晓梅林和莫甘娜" 
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuCuZpnOuU8rmzWkN75pa-PHj5G6rWN5A8fCtKmk_zvzYbexemPp6fIWwfFPHdiuri8q47ALLbF3RXKGriI1miOsZjgxfvDeOLUnMDlHYBRyjdYctNhi8gZ6IlMf99Ch7SuOQvY3eMsjVF9QKGPEug_Oqyspt_3Y9v0Ul9KRQT2CwH900iEt9avQ9V5IMpw7T9qmhYQxfCzTZN6ricb2woSeZtlCpi0UC9t92NhSyfr2nw92jVrCdjaFLEcBb9z1IuoTQa9mWo4qZEPs"
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
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuDdPMx0gF8DRWCi19fipGu9FyTmmFIkm_aFKV6RzADIx83J036SZXlr9GwRkRtqxmDqnxzvNX4Jv1MiJYnY0vcLZmMEkUV9qnw25iHtYLgw92a4TNCYqUEZBtnYyQyqWjbc11m3CF7ThKsGIJavNNsENBLvrgQgpflXkG_rItzt6OgXdkJAbsS9UlQ_H_De92B6MNbaud1pE45lUIgMsNypGIj--mmbxXrhCPUMASHUXm-O9tDu8LHHN2hTyQhyuS2UDbsrZ24vnqga"
                checked={specials.includes(RoleType.ASSASSIN)}
                onChange={() => toggleRole(RoleType.ASSASSIN)}
                color="red"
                icon="local_fire_department"
            />
            <RoleItem 
                name="莫甘娜 (Morgana)" 
                desc="伪装成梅林迷惑派西维尔" 
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuAyfaDgik6X24Vbk1mUL9GJh-2_N-AsFsJfP0GUvely3hudvJ25XfZkvIUtThQUAdidhS89XZJNTLPUC13cEb83ahuvCAWSJN0Dp-Bm7sKZHex81neJbcABwCnHxZKUPZuVp92tjS2f76Y0s4wOQazs5tCDA3LWom6AEeLCGaAffTyRK5fDkN9WAZcabg2wvHc1U9SvYQ6Z8WRP3fiqtWpIBJVUjgnczdgHc2PgwDwcn_R8fj39aWuZLEuN34sIEtpSG0z9biU1w4r4"
                checked={specials.includes(RoleType.MORGANA)}
                onChange={() => toggleRole(RoleType.MORGANA)}
                color="red"
            />
             <RoleItem 
                name="莫德雷德 (Mordred)" 
                desc="梅林无法看见其邪恶身份" 
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuCn2K4nY7hmo7wTiLswasy4PGMhtUJ3AG-WDxj9sW9Qtk7rO-HD8ZuLam8iAj_Hmi5zdY363jRpZoY8xohXOu0GAcU12xkJDnSWszUSGh1z9FSZGkT74NoSb8-Bm3POSw92sU_dvQ7P8J6DyNxxrMdGEpavXXsbfnC9_5AHuMDOuSLiYythlYqNfgxdZN15mIv9IFUvzs-r65OeWVr5bA_ug29YPhLL26VSkP4oaPEp_qYslL0keDG4k0f6YN4IhVXOX726X_4wzpcX"
                checked={specials.includes(RoleType.MORDRED)}
                onChange={() => toggleRole(RoleType.MORDRED)}
                color="red"
            />
             <RoleItem 
                name="奥伯伦 (Oberon)" 
                desc="不认识队友的邪恶角色" 
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ5G_w5x34_C9aZ2l-x02k96Lw4lE_rT8u0V4l6V7q9rW8yZ3K5jG2sM6h4pT7d0vF1nL3eC9iR8aO6bX5tY7wH4mJ9uK8oQ2rN1zX3vB6gA7cE4dF8hI9kL5mP2oQ6sW3yZ9tU0rV4lX7nC9iR8aO6bX5tY7wH4mJ9uK8oQ2rN1zX3vB6gA7cE4dF8hI9kL5mP2oQ6sW3yZ9tU0rV4lX7nC9iR8aO6bX5tY7wH4mJ9uK8oQ2rN1zX3vB6gA7cE4dF8hI9kL5mP2oQ6sW3yZ9tU0rV4lX7nC"
                checked={specials.includes(RoleType.OBERON)}
                onChange={() => toggleRole(RoleType.OBERON)}
                color="red"
            />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-gradient-to-t from-[#0d0c09] via-[#0d0c09]/95 to-transparent pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button 
            onClick={handleStart} 
            disabled={currentEvilSpecials > evilCount || currentGoodSpecials > goodCount}
            className={`w-full relative group overflow-hidden rounded-lg bg-primary py-4 px-6 text-[#1a1814] shadow-[0_0_20px_rgba(242,185,13,0.3)] transition-all active:scale-[0.98] hover:bg-primary-dark flex items-center justify-center gap-2 ${currentEvilSpecials > evilCount || currentGoodSpecials > goodCount ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
          >
            <span className="text-lg font-bold tracking-wider font-display uppercase">
                {currentEvilSpecials > evilCount ? '邪恶角色过多' : (currentGoodSpecials > goodCount ? '正义角色过多' : '保存并开始')}
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
                    <div className={`bg-center bg-no-repeat bg-cover rounded-full h-14 w-14 ring-2 ring-${color}-500/30 shadow-lg ${!checked ? 'grayscale opacity-70' : ''}`} style={{backgroundImage: `url('${img}')`}}></div>
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