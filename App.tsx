import React from 'react';
import { useGame } from './store';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PlayerSetupScreen } from './screens/PlayerSetupScreen';
import { RoleConfigScreen } from './screens/RoleConfigScreen';
import { PassPhoneScreen } from './screens/PassPhoneScreen';
import { RoleRevealScreen } from './screens/RoleRevealScreen';
import { RoundMainScreen } from './screens/RoundMainScreen';
import { VoteScreen } from './screens/VoteScreen';
import { MissionPhaseScreen } from './screens/MissionPhaseScreen';
import { MissionResultScreen } from './screens/MissionResultScreen';
import { AssassinationScreen } from './screens/AssassinationScreen';
import { Button } from './components/Button';

const GameOverScreen: React.FC<{ winner: 'GOOD' | 'EVIL' }> = ({ winner }) => {
    const { resetGame } = useGame();

    return (
        <div className={`h-[100dvh] w-full flex flex-col items-center justify-center p-8 bg-[#0d0c09] overflow-hidden relative`}>
             <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_${winner === 'GOOD' ? '#2563eb' : '#dc2626'}_0%,_transparent_70%)]`}></div>
             <span className={`material-symbols-outlined text-8xl mb-6 ${winner === 'GOOD' ? 'text-blue-500' : 'text-red-500'}`}>
                {winner === 'GOOD' ? 'shield' : 'skull'}
             </span>
             <h1 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter text-center mb-4 ${winner === 'GOOD' ? 'text-blue-500' : 'text-red-500'}`}>
                {winner === 'GOOD' ? '正义胜利' : '邪恶胜利'}
             </h1>
             <p className="text-white/60 text-lg text-center max-w-sm mb-12">
                {winner === 'GOOD' ? '梅林和他的忠臣们守护了阿瓦隆。' : '邪恶势力已经渗透并摧毁了所有希望。'}
             </p>
             <div className="w-full max-w-xs z-10 flex flex-col gap-4">
                <Button fullWidth onClick={() => resetGame('CONFIG')} icon="replay">再来一局</Button>
                <Button fullWidth variant="secondary" onClick={() => resetGame('SETUP')} icon="groups">新游戏</Button>
             </div>
        </div>
    )
}

const App: React.FC = () => {
  const { step } = useGame();

  switch (step) {
    case 'WELCOME':
      return <WelcomeScreen />;
    case 'SETUP':
      return <PlayerSetupScreen />;
    case 'CONFIG':
      return <RoleConfigScreen />;
    case 'PASS':
      return <PassPhoneScreen />;
    case 'REVEAL':
      return <RoleRevealScreen />;
    case 'ROUND_MAIN':
      return <RoundMainScreen />;
    case 'VOTE':
      return <VoteScreen />;
    case 'MISSION_PHASE':
      return <MissionPhaseScreen />;
    case 'MISSION_RESULT':
      return <MissionResultScreen />;
    case 'ASSASSINATION':
      return <AssassinationScreen />;
    case 'GAME_OVER_GOOD':
        return <GameOverScreen winner="GOOD" />;
    case 'GAME_OVER_EVIL':
        return <GameOverScreen winner="EVIL" />;
    default:
      return <WelcomeScreen />;
  }
};

export default App;