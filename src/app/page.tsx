'use client';
import { GamesActionButtons } from '@/components/games-action-buttons';
import { ResponseBlock } from '@/components/response-blocks';
import { TextPrompt } from '@/components/text-prompt';
import { useState } from 'react';
import DictatorGameVisual from '@/components/results/dictator-game-visual';
import RockPaperScissorsVisual from '@/components/results/rock-paper-scissors-visual';
import RingNetworkVisual from '@/components/results/ring-network-game-visual';

export const App = () => {
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedPreference, setSelectedPreference] = useState('');
  const [responses, setResponses] = useState({
    'gpt-4-0613': '',
    'gpt-3.5-turbo': '',
    'gpt-4.1': '',
  });
  const [hide, setHide] = useState(true);
  const models = ['gpt-4', 'gpt-3.5-turbo', 'gpt-4.1'];
  return (
    <div className="container">
      <GamesActionButtons
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        selectedPreference={selectedPreference}
        setSelectedPreference={setSelectedPreference}
      />
      <button className={hide ? '' : 'active'} onClick={() => setHide(!hide)}>
        HIDE VISUALS
      </button>
      {!hide && selectedGame === 'dictator' && <DictatorGameVisual selectedPreference={selectedPreference} />}
      {!hide && selectedGame === 'rock-paper-scissors' && <RockPaperScissorsVisual selectedPattern={selectedPreference} />}
      {!hide && selectedGame === 'ring-network' && <RingNetworkVisual selectedApproach={selectedPreference} />}
      <TextPrompt selectedGame={selectedGame} selectedPreference={selectedPreference} models={models} callback={setResponses} />
      <ResponseBlock selectedGame={selectedGame} selectedPreference={selectedPreference} responses={responses} models={models} />
    </div>
  );
};

export default App;
