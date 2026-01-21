import React, { useState } from 'react';
import { useGame } from '../store';
import { Button } from '../components/Button';

export const WelcomeScreen: React.FC = () => {
  const { setGameStep } = useGame();
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="relative flex h-[100dvh] w-full flex-col justify-between overflow-hidden bg-background-dark font-display">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Dark textured surface" 
          className="h-full w-full object-cover opacity-40" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5xCgMFhJMO5rDByTgwO7ljwEkd70MYGvT6eHNdSHHj_URTNnucETrSnL_mgRh8TDYvZynFb4w5f5GOvOqwtNuvoiJjoGkuOkyOfoUGrchzZuditJexT7TI0aPGIfG4XUX5CKGUwmcOjeli_akl8MBEN18rHR8vPGX-1wb2bcy2C8HRQvfioDjYLoRXyUmzZW6e0ietbJZTlP73oU7Q1N1gnOLHpSw6LNeB93HjfisSxztbRywF0GNcmBtxl-rcDKqlHsj6wB9yuiF" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-background-dark/60 to-background-dark"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#181611_100%)] opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full justify-center pt-12 opacity-60">
        <span className="material-symbols-outlined text-4xl text-[#bab29c]">local_fire_department</span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        <div className="mb-4 flex items-center gap-3 opacity-80">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary"></div>
          <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">抵抗组织</span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary"></div>
        </div>
        
        <div className="flex flex-col items-center drop-shadow-2xl">
          <h1 className="text-primary text-6xl md:text-8xl font-black tracking-[0.2em] leading-none text-center">
            阿瓦隆
          </h1>
          <h2 className="text-primary text-xl md:text-2xl font-bold tracking-[0.6em] leading-tight text-center uppercase mt-1 pl-2">
            AVALON
          </h2>
        </div>

        <p className="mt-8 text-[#bab29c] text-base md:text-lg font-medium italic tracking-widest text-center max-w-xs leading-relaxed">
          “邪恶潜伏于你最意想不到之处。”
        </p>
      </div>

      <div className="relative z-10 mb-12 flex w-full flex-col items-center gap-5 px-6 pb-6">
        <div className="w-full max-w-[320px]">
             <Button fullWidth onClick={() => setGameStep('SETUP')} icon="swords">开始游戏</Button>
        </div>
       
        <div className="w-full max-w-[320px]">
             <Button fullWidth variant="secondary" onClick={() => setShowRules(true)} icon="menu_book">规则手册</Button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#393528] to-transparent"></div>
          <p className="text-[#5c5643] text-xs font-sans font-normal tracking-wide pt-2">v2.1.0 • 桌游助手</p>
        </div>
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#181611] animate-in slide-in-from-bottom-10 duration-300">
          <div className="sticky top-0 z-20 flex items-center justify-between bg-[#181611]/95 px-6 py-4 backdrop-blur border-b border-white/10">
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">menu_book</span>
                <h2 className="text-xl font-bold text-white tracking-wider">规则手册</h2>
             </div>
             <button onClick={() => setShowRules(false)} className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors">
               <span className="material-symbols-outlined text-2xl">close</span>
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-8">
            {/* Section 1: Objective */}
            <section>
                <h3 className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                    游戏目标
                </h3>
                <div className="grid gap-3">
                    <div className="bg-[#23201a] p-4 rounded-xl border border-blue-500/20 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-blue-400">shield</span>
                            <span className="text-blue-400 font-bold">正义阵营 (蓝方)</span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                            成功完成 3 个任务，并在游戏结束时保护梅林不被刺客指认。
                        </p>
                    </div>
                    <div className="bg-[#23201a] p-4 rounded-xl border border-red-500/20 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-red-400">skull</span>
                            <span className="text-red-400 font-bold">邪恶阵营 (红方)</span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                            促使 3 个任务失败，或者在正义方完成任务后，准确刺杀梅林。
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: Roles */}
            <section>
                <h3 className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                    核心角色
                </h3>
                <div className="space-y-3">
                    {[
                        { name: "梅林 (Merlin)", desc: "知晓除莫德雷德外的所有坏人。必须隐晦地指引好人，不可暴露身份，否则会被刺杀。", icon: "visibility", color: "text-blue-400" },
                        { name: "派西维尔 (Percival)", desc: "知晓谁是梅林和莫甘娜（无法区分）。需要保护梅林，为好人带队。", icon: "shield_person", color: "text-blue-400" },
                        { name: "刺客 (Assassin)", desc: "在好人完成3个任务后，拥有最后一次机会指认并刺杀梅林，逆转胜利。", icon: "gps_fixed", color: "text-red-400" },
                        { name: "莫甘娜 (Morgana)", desc: "伪装成梅林，迷惑派西维尔。", icon: "theater_comedy", color: "text-red-400" },
                        { name: "莫德雷德 (Mordred)", desc: "梅林看不到的邪恶首领。", icon: "visibility_off", color: "text-red-400" },
                        { name: "奥伯伦 (Oberon)", desc: "不认识队友，队友也不认识他的孤独坏人。", icon: "person_off", color: "text-red-400" },
                    ].map((role, i) => (
                        <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                            <span className={`material-symbols-outlined ${role.color} text-2xl shrink-0 mt-1`}>{role.icon}</span>
                            <div>
                                <h4 className={`font-bold ${role.color}`}>{role.name}</h4>
                                <p className="text-white/60 text-xs leading-relaxed mt-1">{role.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Gameplay */}
            <section>
                <h3 className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                    游戏流程
                </h3>
                
                <div className="relative border-l-2 border-white/10 ml-3 space-y-8 pb-4">
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#181611] border-2 border-primary"></div>
                        <h4 className="text-white font-bold mb-1">1. 组队 (Team Building)</h4>
                        <p className="text-white/60 text-sm">
                            轮值队长根据当前任务所需人数，提议出任务的队员人选。
                        </p>
                    </div>

                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#181611] border-2 border-primary"></div>
                        <h4 className="text-white font-bold mb-1">2. 投票 (Voting)</h4>
                        <p className="text-white/60 text-sm mb-2">
                            所有玩家公开对提议的队伍进行投票。
                        </p>
                        <ul className="list-disc pl-4 text-white/50 text-xs space-y-1">
                            <li>多数同意：队伍组建成功，进入任务阶段。</li>
                            <li>多数反对或平票：提议被拒绝，队长顺延，重新组队。</li>
                            <li><span className="text-red-400">注意：</span>连续 5 次方案被拒绝，邪恶阵营直接获胜。</li>
                        </ul>
                    </div>

                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#181611] border-2 border-primary"></div>
                        <h4 className="text-white font-bold mb-1">3. 任务 (Mission)</h4>
                        <p className="text-white/60 text-sm mb-2">
                            队伍成员秘密决定任务结果。
                        </p>
                        <ul className="list-disc pl-4 text-white/50 text-xs space-y-1">
                            <li>好人必须投 <span className="text-green-400">成功</span>。</li>
                            <li>坏人可选 <span className="text-green-400">成功</span> 或 <span className="text-red-400">失败</span>。</li>
                            <li>通常一张失败票即导致任务失败。</li>
                            <li>7人+局的第4个任务需两张失败票才算失败。</li>
                        </ul>
                    </div>
                </div>
            </section>

             {/* Section 4: End Game */}
             <section>
                <h3 className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                    刺杀环节
                </h3>
                <div className="bg-gradient-to-br from-red-900/20 to-transparent p-4 rounded-xl border border-red-500/10">
                    <p className="text-white/70 text-sm leading-relaxed">
                        如果正义阵营率先完成了 3 个任务，游戏并未结束。<br/><br/>
                        <span className="text-white font-bold">刺客</span> 将公开身份，并与邪恶队友讨论，指定一名玩家为梅林。<br/>
                        若猜中，邪恶阵营窃取胜利；若猜错，正义阵营最终获胜。
                    </p>
                </div>
            </section>
            
            <div className="h-8"></div>
          </div>
        </div>
      )}
    </div>
  );
};