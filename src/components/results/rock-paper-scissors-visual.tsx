const RockPaperScissorsVisual = ({selectedPattern}: {selectedPattern: string}) => {
  
  const patterns: any = {
    'constant-pattern': {
      title: "Constant Pattern",
      description: "Opponent always chooses the same move",
      example: "Rock, Rock, Rock, Rock, Rock",
      expected: "Rock",
      performance: {
        gpt3: { score: 0.3, description: "Random guessing" },
        gpt35: { score: 0.6, description: "Some improvement but inconsistent" },
        gpt4: { score: 0.9, description: "Identifies pattern after ~3 rounds" }
      },
      rational: "Identify that opponent always plays Rock and counter with Paper"
    },
    'self-dependent-loop': {
      title: "Loop Pattern",
      description: "Opponent cycles through three moves in sequence",
      example: "Paper, Rock, Scissors, Paper, Rock",
      expected: "Scissors",
      performance: {
        gpt3: { score: 0.6, description: "Random guessing" },
        gpt35: { score: 0.8, description: "Names pattern but doesn't utilize it" },
        gpt4: { score: 1.0, description: "Increasingly confident with more data" }
      },
      rational: "Identify the P-R-S pattern and play Rock to counter the expected Scissors"
    },
    'player-dependent': {
      title: "Counter Pattern",
      description: "Opponent counters player's previous move",
      example: "You: Rock → Opp: Paper, You: Paper → Opp: Paper You: Rock → Opp: Scissors",
      expected: "Scissors",
      performance: {
        gpt3: { score: 0.3, description: "Random guessing" },
        gpt35: { score: 0.35, description: "Fails to identify pattern" },
        gpt4: { score: 3.0, description: "Struggles with adaptive strategies" }
      },
      rational: "Identify counter pattern and play a move that forces a predictable counter"
    },
    'probabilistic-pattern': {
      title: "Probabilistic Pattern",
      description: "Opponent favors certain moves with a probability distribution",
      example: "Rock (60%), Paper (20%), Scissors (20%)",
      expected: "Paper",
      performance: {
        gpt3: { score: 0.35, description: "Random guessing" },
        gpt35: { score: 0.35, description: "Unable to utilize distribution" },
        gpt4: { score: 0.4, description: "Barely better than random" }
      },
      rational: "Identify the biased distribution and play the optimal counter strategy"
    }
  };
  
  const currentPattern = patterns[selectedPattern];

  const getScoreWidth = (score: number) => {
    return Math.min(100, Math.max(0, score * 100));
  };
  
  return (
    <div>     
      <div className="grid">
        <div className="card">
          <h3 className="subtitle">{currentPattern.title}</h3>
          <p className="description">"{currentPattern.description}"</p>
          
          <div className="pattern-example">
            <h4 className="pattern-title">Pattern Example:</h4>
            <div className="pattern-display">
              <span className="pattern-sequence">{currentPattern.example}</span>
              <span className="pattern-arrow">→</span>
              <span className="pattern-expected">Next: {currentPattern.expected}</span>
            </div>
          </div>
          
          <div className="rational-section">
            <h4 className="section-title">Rational Behavior:</h4>
            <p className="rational-behavior">
              {currentPattern.rational}
            </p>
          </div>
          
          <div className="pattern-visualization">
            <div className="move-sequence">
              {selectedPattern === 'self-dependent-loop' && 
                <div className="moves">
                  <span className="move paper">📄</span>
                  <span className="move rock">🪨</span>
                  <span className="move scissors">✂️</span>
                  <span className="move paper">📄</span>
                  <span className="move rock">🪨</span>
                  <span className="move next-move">?</span>
                </div>
              }
              {selectedPattern === 'constant-pattern' && 
                <div className="moves">
                  <span className="move rock">🪨</span>
                  <span className="move rock">🪨</span>
                  <span className="move rock">🪨</span>
                  <span className="move rock">🪨</span>
                  <span className="move rock">🪨</span>
                  <span className="move next-move">?</span>
                </div>
              }
              {selectedPattern === 'player-dependent' && 
                <div className="moves">
                  <span className="move rock">🪨</span>
                  <span className="move paper">📄</span>
                  <span className="move rock">📄</span>
                  <span className="move paper">📄</span>
                  <span className="move rock">🪨</span>
                  <span className="move scissors">✂️</span>
                  <span className="move next-move"></span>
                </div>
              }
              {selectedPattern === 'probabilistic-pattern' && 
                <div className="moves">
                  <span className="move rock prob-move">🪨<br/>60%</span>
                  <span className="move paper prob-move">📄<br/>20%</span>
                  <span className="move scissors prob-move">✂️<br/>20%</span>
                </div>
              }
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="subtitle">LLM Performance</h3>
          
          <div className="performance-section">
            <div className="model-performance">
              <div className="model-header">
                <span className="model-name">GPT-3</span>
                <span className="model-score">{currentPattern.performance.gpt3.score.toFixed(1)}/1.0</span>
              </div>
              <div className="score-bar-bg">
                <div 
                  className="score-bar score-low" 
                  style={{ width: `${getScoreWidth(currentPattern.performance.gpt3.score)}%` }}
                ></div>
              </div>
              <p className="model-description">{currentPattern.performance.gpt3.description}</p>
            </div>
            
            <div className="model-performance">
              <div className="model-header">
                <span className="model-name">GPT-3.5</span>
                <span className="model-score">{currentPattern.performance.gpt35.score.toFixed(1)}/1.0</span>
              </div>
              <div className="score-bar-bg">
                <div 
                  className={`score-bar ${currentPattern.performance.gpt35.score >= 0.7 ? 'score-high' : 'score-medium'}`}
                  style={{ width: `${getScoreWidth(currentPattern.performance.gpt35.score)}%` }}
                ></div>
              </div>
              <p className="model-description">{currentPattern.performance.gpt35.description}</p>
            </div>
            
            <div className="model-performance">
              <div className="model-header">
                <span className="model-name">GPT-4</span>
                <span className="model-score">{currentPattern.performance.gpt4.score.toFixed(1)}/1.0</span>
              </div>
              <div className="score-bar-bg">
                <div 
                  className={`score-bar ${currentPattern.performance.gpt4.score >= 0.7 ? 'score-high' : currentPattern.performance.gpt4.score >= 1.0 ? 'score-medium' : 'score-low'}`}
                  style={{ width: `${getScoreWidth(currentPattern.performance.gpt4.score)}%` }}
                ></div>
              </div>
              <p className="model-description">{currentPattern.performance.gpt4.description}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissorsVisual;