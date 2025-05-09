'use client';
import { useState } from 'react';
const DictatorGameVisual = ({ selectedPreference }: { selectedPreference: string }) => {
  const preferences: any = {
    equality: {
      title: 'Equality Preference',
      description: 'Prefer fairness between players, hate inequality',
      optionX: { dictator: 300, recipient: 300 },
      optionY: { dictator: 500, recipient: 100 },
      rational: 'X',
      performance: { gpt3: '✓', gpt35: '✓', gpt4: '✓' },
    },
    altruism: {
      title: 'Altruism Preference',
      description: "Maximize another player's income",
      optionX: { dictator: 300, recipient: 300 },
      optionY: { dictator: 100, recipient: 500 },
      rational: 'Y',
      performance: { gpt3: '✗', gpt35: '✓', gpt4: '✓' },
    },
    'common-interest': {
      title: 'Common-Interest Preference',
      description: 'Maximize joint total income',
      optionX: { dictator: 300, recipient: 300 },
      optionY: { dictator: 300, recipient: 400 },
      rational: 'Y',
      performance: { gpt3: '✗', gpt35: '✓', gpt4: '✓' },
    },
    'self-interest': {
      title: 'Self-Interest Preference',
      description: 'Maximize your own income',
      optionX: { dictator: 500, recipient: 100 },
      optionY: { dictator: 300, recipient: 300 },
      rational: 'X',
      performance: { gpt3: '✓', gpt35: '✓', gpt4: '✓' },
    },
  };

  const currentPref = preferences[selectedPreference];

  return (
    <div>
      <div className="grid">
        <div className="card">
          <h3 className="subtitle">{currentPref.title}</h3>
          <p className="description">"{currentPref.description}"</p>

          <div className="options">
            <div className={`option ${currentPref.rational === 'X' ? 'option-rational' : ''}`}>
              <h4 className="option-title">Option X</h4>
              <div className="option-details">
                <div className="option-row">
                  <span>Dictator gets:</span>
                  <span className="option-value">${currentPref.optionX.dictator}</span>
                </div>
                <div className="option-row">
                  <span>Recipient gets:</span>
                  <span className="option-value">${currentPref.optionX.recipient}</span>
                </div>
                <div className="option-total">
                  <span>Total: ${currentPref.optionX.dictator + currentPref.optionX.recipient}</span>
                </div>
              </div>
            </div>

            <div className={`option ${currentPref.rational === 'Y' ? 'option-rational' : ''}`}>
              <h4 className="option-title">Option Y</h4>
              <div className="option-details">
                <div className="option-row">
                  <span>Dictator gets:</span>
                  <span className="option-value">${currentPref.optionY.dictator}</span>
                </div>
                <div className="option-row">
                  <span>Recipient gets:</span>
                  <span className="option-value">${currentPref.optionY.recipient}</span>
                </div>
                <div className="option-total">
                  <span>Total: ${currentPref.optionY.dictator + currentPref.optionY.recipient}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rational-choice">
            <span>Rational Choice: Option {currentPref.rational}</span>
          </div>
        </div>

        <div className="card">
          <h3 className="subtitle">LLM Performance</h3>

          <table className="performance-table">
            <thead>
              <tr>
                <th className="table-header-left">Model</th>
                <th className="table-header">Choice</th>
                <th className="table-header">Rational?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-cell">GPT-3</td>
                <td className="table-cell-center">
                  {currentPref.performance.gpt3 === '✓' ? currentPref.rational : currentPref.rational === 'X' ? 'Y' : 'X'}
                </td>
                <td className={`table-cell-center ${currentPref.performance.gpt3 === '✓' ? 'correct' : 'incorrect'}`}>
                  {currentPref.performance.gpt3}
                </td>
              </tr>
              <tr>
                <td className="table-cell">GPT-3.5</td>
                <td className="table-cell-center">
                  {currentPref.performance.gpt35 === '✓' ? currentPref.rational : currentPref.rational === 'X' ? 'Y' : 'X'}
                </td>
                <td className={`table-cell-center ${currentPref.performance.gpt35 === '✓' ? 'correct' : 'incorrect'}`}>
                  {currentPref.performance.gpt35}
                </td>
              </tr>
              <tr>
                <td className="table-cell">GPT-4</td>
                <td className="table-cell-center">
                  {currentPref.performance.gpt4 === '✓' ? currentPref.rational : currentPref.rational === 'X' ? 'Y' : 'X'}
                </td>
                <td className={`table-cell-center ${currentPref.performance.gpt4 === '✓' ? 'correct' : 'incorrect'}`}>
                  {currentPref.performance.gpt4}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DictatorGameVisual;
