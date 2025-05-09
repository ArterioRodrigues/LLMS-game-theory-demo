'use client';
import { useState, useEffect } from 'react';
import { getExplanation, analyzeRationality } from './util';

export type ResponseBlockType = {
  responses: Record<string, string>;
  models: string[];
  selectedGame: string;
  selectedPreference: string;
};

export const ResponseBlock = ({ selectedGame, selectedPreference, responses, models }: ResponseBlockType) => {
  const [rationalityMap, setRationalityMap] = useState<Record<string, boolean>>({});
  const [analysisReasons, setAnalysisReasons] = useState<Record<string, string>>({});

  useEffect(() => {
    const newRationalityMap: Record<string, boolean> = {};
    const newAnalysisReasons: Record<string, string> = {};

    models.forEach(model => {
      if (responses[model]) {
        const analysis = analyzeRationality(selectedGame, selectedPreference, responses[model]);
        newRationalityMap[model] = analysis.rational;
        newAnalysisReasons[model] = analysis.reason;
      }
    });

    setRationalityMap(newRationalityMap);
    setAnalysisReasons(newAnalysisReasons);
  }, [responses, selectedGame, selectedPreference, models]);

  const toggleRationality = (model: string) => {
    setRationalityMap(prev => ({
      ...prev,
      [model]: !prev[model],
    }));
  };

  return (
    <div>
      {Object.values(responses).some(r => r) && (
        <div className="responses-container">
          <h2>LLM Responses</h2>
          <p className="explanation">{getExplanation(selectedGame, selectedPreference)}</p>

          <div className="responses-grid">
            {models.map(model => {
              const isRational = rationalityMap[model];
              const reason = analysisReasons[model];

              const rationalityClass = isRational === true ? 'rational' : isRational === false ? 'not-rational' : '';

              const rationalityText = isRational === true ? '✓ RATIONAL' : isRational === false ? '✗ NOT RATIONAL' : 'Analysis Pending';

              return (
                <div
                  key={model}
                  className={`response-card ${rationalityClass}`}
                  onClick={() => toggleRationality(model)}
                  title={reason || 'Click to toggle rationality assessment'}
                >
                  <h3>{model.toUpperCase()}</h3>
                  <div className="response-content">{responses[model] ? responses[model] : 'No response yet'}</div>
                  <div className="rationality-badge">
                    {rationalityText}
                    {reason && <span className="analysis-reason-icon" title={reason}></span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
