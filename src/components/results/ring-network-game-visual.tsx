import React from 'react';
const RingNetworkVisual = ({ selectedApproach }: { selectedApproach: string }) => {
  const approaches: any = {
    implicit: {
      title: 'Implicit Belief → Action',
      description: 'LLM must reason about opponent and choose action in one step',
      prompt: 'Both players want to maximize their own points. What option do you choose and why?',
      rational: 'Determine that the opponent will choose Y and then choose V',
      performance: {
        gpt3: { accuracy: 5, reasoning: "Failed to consider opponent's strategy" },
        gpt35: { accuracy: 10, reasoning: "Failed to consider opponent's strategy" },
        gpt4: { accuracy: 0, reasoning: 'Almost completely unable to make optimal choice' },
      },
    },
    explicit: {
      title: 'Explicit Belief → Action',
      description: 'Two-step process explicitly stated',
      prompt: 'First, analyze what the other player will choose. Then decide your optimal move.',
      rational: 'First analyze opponent will choose Y, then choose V as optimal response',
      performance: {
        gpt3: { accuracy: 10, reasoning: 'Often failed to use refined belief correctly' },
        gpt35: { accuracy: 45, reasoning: 'Belief refinement accurate but action inconsistent' },
        gpt4: {
          accuracy: 70,
          reasoning: 'Good belief refinement but sometimes modified correct beliefs',
        },
      },
    },
    given: {
      title: 'Given Belief → Action',
      description: "Opponent's action is explicitly provided",
      prompt: 'The other player will choose Option Y. What do you choose?',
      rational: 'Choose V given opponent will choose Y',
      performance: {
        gpt3: { accuracy: 35, reasoning: 'Mostly correct when belief provided' },
        gpt35: { accuracy: 85, reasoning: 'Good performance with given belief' },
        gpt4: { accuracy: 100, reasoning: 'Perfect performance when belief is given' },
      },
    },
  };

  const currentApproach = approaches[selectedApproach];

  return (
    <div>
      <div className="grid">
        <div className="card">
          <h3 className="subtitle">{currentApproach.title}</h3>
          <p className="description">"{currentApproach.description}"</p>

          <div className="matrix-container">
            <h4 className="section-title">Payoff Matrix:</h4>
            <div className="table-wrapper">
              <table className="payoff-table">
                <thead>
                  <tr>
                    <th className="table-cell empty-cell"></th>
                    <th className="table-cell empty-cell"></th>
                    <th className="table-cell header-cell" colSpan={2}>
                      Opponent
                    </th>
                  </tr>
                  <tr>
                    <th className="table-cell empty-cell"></th>
                    <th className="table-cell empty-cell"></th>
                    <th className="table-cell header-cell">X</th>
                    <th className="table-cell header-cell">Y</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="table-cell player-header" rowSpan={2}>
                      Player
                    </th>
                    <th className="table-cell header-cell">U</th>
                    <td className="table-cell">
                      <div className="payoff-pair">
                        <span className="player-payoff">40</span>
                        <span className="opponent-payoff">0</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="payoff-pair">
                        <span className="player-payoff">5</span>
                        <span className="opponent-payoff">10</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="table-cell header-cell">V</th>
                    <td className="table-cell">
                      <div className="payoff-pair">
                        <span className="player-payoff">0</span>
                        <span className="opponent-payoff">7</span>
                      </div>
                    </td>
                    <td className="table-cell optimal-cell">
                      <div className="payoff-pair">
                        <span className="player-payoff">15</span>
                        <span className="opponent-payoff">8</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="payoff-legend">
              <span className="player-legend">Blue</span> = Player's payoff,
              <span className="opponent-legend">Red</span> = Opponent's payoff
            </div>
          </div>

          <div className="prompt-container">
            <h4 className="section-title">Prompt Used:</h4>
            <p className="prompt-text">"{currentApproach.prompt}"</p>
          </div>

          <div className="rational-section">
            <h4 className="section-title">Rational Behavior:</h4>
            <p className="rational-behavior">{currentApproach.rational}</p>
          </div>
        </div>

        <div className="card">
          <h3 className="subtitle">LLM Performance</h3>

          <div className="performance-section">
            <div className="model-performance">
              <div className="model-header">
                <span className="model-name">GPT-3</span>
                <span className="model-score">{currentApproach.performance.gpt3.accuracy}% Accurate</span>
              </div>
              <div className="score-bar-bg">
                <div
                  className={`score-bar ${currentApproach.performance.gpt3.accuracy >= 70 ? 'score-high' : currentApproach.performance.gpt3.accuracy >= 30 ? 'score-medium' : 'score-low'}`}
                  style={{ width: `${currentApproach.performance.gpt3.accuracy}%` }}
                ></div>
              </div>
              <p className="model-description">{currentApproach.performance.gpt3.reasoning}</p>
            </div>

            <div className="model-performance">
              <div className="model-header">
                <span className="model-name">GPT-3.5</span>
                <span className="model-score">{currentApproach.performance.gpt35.accuracy}% Accurate</span>
              </div>
              <div className="score-bar-bg">
                <div
                  className={`score-bar ${currentApproach.performance.gpt35.accuracy >= 70 ? 'score-high' : currentApproach.performance.gpt35.accuracy >= 30 ? 'score-medium' : 'score-low'}`}
                  style={{ width: `${currentApproach.performance.gpt35.accuracy}%` }}
                ></div>
              </div>
              <p className="model-description">{currentApproach.performance.gpt35.reasoning}</p>
            </div>

            <div className="model-performance">
              <div className="model-header">
                <span className="model-name">GPT-4</span>
                <span className="model-score">{currentApproach.performance.gpt4.accuracy}% Accurate</span>
              </div>
              <div className="score-bar-bg">
                <div
                  className={`score-bar ${currentApproach.performance.gpt4.accuracy >= 70 ? 'score-high' : currentApproach.performance.gpt4.accuracy >= 30 ? 'score-medium' : 'score-low'}`}
                  style={{ width: `${currentApproach.performance.gpt4.accuracy}%` }}
                ></div>
              </div>
              <p className="model-description">{currentApproach.performance.gpt4.reasoning}</p>
            </div>
          </div>

          <div className="key-finding">
            <h4 className="finding-title">Key Finding:</h4>
            <p className="finding-text">
              {selectedApproach === 'implicit'
                ? 'LLMs cannot autonomously follow human behavior in game processes without explicit guidance'
                : selectedApproach === 'explicit'
                  ? 'Even when LLMs correctly identify beliefs, they often overlook or modify these beliefs when taking actions'
                  : 'LLMs perform well when beliefs are explicitly provided, suggesting they understand the optimal action but struggle with belief formation'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingNetworkVisual;
