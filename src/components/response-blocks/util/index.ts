export const getExplanation = (selectedGame: string, selectedPreference: string) => {
  if (selectedGame === 'dictator') {
    switch (selectedPreference) {
      case 'equality':
        return 'A rational player with equality preference should choose Option X to ensure equal payoffs ($300 each).';
      case 'altruism':
        return "A rational player with altruism preference should choose Option Y to maximize the recipient's payoff ($500).";
      case 'common-interest':
        return 'A rational player with common-interest preference should choose Option Y to maximize the joint total income ($300 total vs $400 total). In this specific case both options have the same total, but a rational player must demonstrate correct calculation.';
      case 'self-interest':
        return 'A rational player with self-interest preference should choose Option X to maximize their own payoff ($300 vs $100).';
      default:
        return 'A rational player should make a choice consistent with their assigned preference.';
    }
  } else if (selectedGame === 'rock-paper-scissors') {
    switch (selectedPreference) {
      case 'constant-pattern':
        return 'A rational player should recognize the opponent always plays the same move (Rock) and consistently choose Paper to win.';
      case 'self-dependent-loop':
        return 'A rational player should identify the repeating pattern (Paper-Rock-Scissors) and choose Scissors to beat the predicted Paper in the next round.';
      case 'player-dependent':
        return 'A rational player should recognize the opponent is countering their previous moves and use this insight to make a strategic choice that anticipates the counter.';
      case 'probabilistic-pattern':
        return "A rational player should identify the probability distribution of the opponent's moves (60% Rock, 20% Paper, 20% Scissors) and choose Paper, which has the highest expected value.";
      default:
        return "A rational player should analyze the opponent's pattern and choose optimally to maximize their chance of winning.";
    }
  } else if (selectedGame === 'ring-network') {
    switch (selectedPreference) {
      case 'implicit':
        return "A rational player should autonomously recognize that the opponent will choose Y (which maximizes their payoff regardless of player's choice), then choose V which gives the highest payoff (15) given the opponent chooses Y.";
      case 'explicit':
        return 'A rational player should first explicitly analyze that the opponent will choose Y (since it dominates X for them), then use this refined belief to choose V (since V gives 15 points versus 5 points for U when the opponent plays Y).';
      case 'given':
        return 'Given the information that the opponent will choose Y, a rational player should choose V which gives the highest payoff (15 points) compared to U (5 points).';
      default:
        return "A rational player should determine the opponent will choose Y (which maximizes their payoff regardless of player's choice), then choose V which gives the highest payoff (15) given the opponent chooses Y.";
    }
  } else {
    return 'Please select a valid game to get an explanation of rational behavior.';
  }
};

export const analyzeRationality = (game: string, preference: string, response: string) => {
  if (!response) return { rational: false, reason: 'No response received' };

  // Look for FINAL CHOICE: pattern in the response
  const choiceMatch = response.match(/FINAL CHOICE:\s*\[?([A-Za-z\/]+)\]?/i);

  if (!choiceMatch) {
    return { rational: false, reason: 'Did not follow the required format' };
  }

  const choice = choiceMatch[1].toUpperCase().trim();

  // Check for reasoning section
  const hasReasoning = /REASONING:/i.test(response);

  if (!hasReasoning) {
    return { rational: false, reason: 'Missing reasoning section' };
  }

  // Check for Dictator Game rationality
  if (game === 'dictator') {
    const choiceX = choice === 'X';
    const choiceY = choice === 'Y';

    if (!choiceX && !choiceY) {
      return { rational: false, reason: `Invalid choice "${choice}" - must be X or Y` };
    }

    switch (preference) {
      case 'equality':
        return {
          rational: choiceX,
          reason: choiceX ? 'Correctly chose option X for equality' : 'Incorrectly chose option Y despite equality preference',
        };
      case 'altruism':
        return {
          rational: choiceY,
          reason: choiceY ? 'Correctly chose option Y for altruism' : 'Incorrectly chose option X despite altruism preference',
        };
      case 'common-interest':
        return {
          rational: choiceY,
          reason: choiceY ? 'Correctly chose option Y for common-interest' : 'Incorrectly chose option X despite common-interest preference',
        };
      case 'self-interest':
        return {
          rational: choiceX,
          reason: choiceX ? 'Correctly chose option X for self-interest' : 'Incorrectly chose option Y despite self-interest preference',
        };
    }
  }

  // Check for Rock-Paper-Scissors rationality
  if (game === 'rock-paper-scissors') {
    const choiceRock = choice === 'ROCK';
    const choicePaper = choice === 'PAPER';
    const choiceScissors = choice === 'SCISSORS';

    if (!choiceRock && !choicePaper && !choiceScissors) {
      return {
        rational: false,
        reason: `Invalid choice "${choice}" - must be ROCK, PAPER, or SCISSORS`,
      };
    }

    switch (preference) {
      case 'constant-pattern': // Opponent always Rock
        return {
          rational: choicePaper,
          reason: choicePaper ? 'Correctly chose Paper to beat constant Rock' : 'Did not choose optimal counter to constant Rock',
        };
      case 'self-dependent': // Paper-Rock-Scissors pattern
        return {
          rational: choiceRock,
          reason: choiceRock ? 'Correctly identified loop pattern and chose Rock' : 'Failed to predict Scissors in loop pattern',
        };
      case 'probabilistic-pattern':
        return {
          rational: choicePaper,
          reason: choiceRock ? 'Correctly identified that rock is most likely to appear' : 'Failed to predict paper in loop pattern',
        };
      default: // Default loop-3 pattern
        return {
          rational: choiceRock,
          reason: choiceRock ? 'Correctly identified loop-3 pattern and chose Rock' : 'Failed to predict Scissors in loop-3 pattern',
        };
    }
  }

  // Check for Ring-Network Game rationality
  if (game === 'ring-network') {
    const choiceU = choice === 'U';
    const choiceV = choice === 'V';

    if (!choiceU && !choiceV) {
      return { rational: false, reason: `Invalid choice "${choice}" - must be U or V` };
    }

    // Optimal choice is V in all cases (assuming opponent chooses Y)
    return {
      rational: choiceV,
      reason: choiceV ? 'Correctly chose V as optimal action' : 'Incorrectly chose U despite V being optimal',
    };
  }

  return { rational: false, reason: 'Unknown game type' };
};
