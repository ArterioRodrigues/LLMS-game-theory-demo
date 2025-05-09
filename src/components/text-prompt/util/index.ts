export const getDictatorPrompt = (preference: string) => {
  let preferenceDescription = '';
  let options = '';

  // Set the preference description based on the selected preference
  switch (preference) {
    case 'equality':
      preferenceDescription = 'fairness between players and hate inequality';
      options = `Option X: You get $300, the recipient gets $300.
Option Y: You get $500, the recipient gets $100.`;
      break;
    case 'altruism':
      preferenceDescription = "another player's interest and maximize another player's income";
      options = `Option X: You get $300, the recipient gets $300.
Option Y: You get $100, the recipient gets $500.`;
      break;
    case 'common-interest':
      preferenceDescription = 'common interest and maximize the joint total income';
      options = `Option X: You get $300, the recipient gets $300.
Option Y: You get $300, the recipient gets $400.`;
      break;
    case 'self-interest':
      preferenceDescription = 'your own interest and maximize your own income';
      options = `Option X: You get $500, the recipient gets $100.
Option Y: You get $300, the recipient gets $300.`;
      break;
    default:
      preferenceDescription = 'fairness between players and hate inequality';
      options = `Option X: You get $300, the recipient gets $300.
Option Y: You get $500, the recipient gets $100.`;
  }

  return `You are playing a Dictator Game where you must choose between two allocation options:
${options}

You have a stronger preference for ${preferenceDescription}.

First think through your reasoning carefully, considering what choice best aligns with your stated preference. Then provide your final answer.

Your answer must follow this exact format:

REASONING: [Your step-by-step reasoning here]

FINAL CHOICE: [X/Y]

Which option do you choose and why?`;
};

export const getRockPaperScissorsPrompt = (patternType: string) => {
  let prompt = '';

  switch (patternType) {
    case 'constant-pattern':
      // Opponent always chooses the same move
      prompt = `We are playing Rock-Paper-Scissors. Your opponent's previous moves were: Rock, Rock, Rock, Rock, Rock.`;
      break;

    case 'self-dependent-loop':
      // Opponent follows a predictable sequence regardless of player's moves
      prompt = `We are playing Rock-Paper-Scissors. 
      
Game history:
Round 1: You played Scissors, opponent played Paper (you won)
Round 2: You played Paper, opponent played Rock (you won)
Round 3: You played Rock, opponent played Scissors (you won)
Round 4: You played Scissors, opponent played Paper (you won)
Round 5: You played Rock, opponent played Rock (tie)`;
      break;

    case 'player-dependent':
      // Opponent's moves depend on player's previous actions
      prompt = `We are playing Rock-Paper-Scissors. 
      
Game history:
Round 1: You played Rock, opponent played Paper (you lost)
Round 2: You played Paper, opponent played Paper (you draw)
Round 3: You played Rock, opponent played Scissors(you won)
Round 4: You played Rock, opponent played Paper (you lost)
Round 5: You played Paper, opponent played Paper (you draw)`;
      break;

    case 'probabilistic-pattern':
      // Opponent chooses moves based on a probability distribution
      prompt = `We are playing Rock-Paper-Scissors. Your opponent's previous moves were: Rock, Rock, Paper, Rock, Scissors, Rock, Paper, Rock, Rock, Scissors (they seem to favor Rock 60% of the time, Paper 20%, and Scissors 20%).`;
      break;

    default:
      // Default to the original prompt with a loop-3 pattern
      prompt = `We are playing Rock-Paper-Scissors. Your opponent's previous moves were: Paper, Rock, Scissors, Paper, Rock.`;
  }

  return `${prompt}

First analyze the pattern in your opponent's moves, and think about what they are likely to play next. Then determine your optimal move.

Your answer must follow this exact format:

REASONING: [Your step-by-step analysis of the pattern and optimal move]

FINAL CHOICE: [ROCK/PAPER/SCISSORS]

What do you choose for the next round and why?`;
};

export const getRingNetworkPrompt = (preference = 'implicit') => {
  // Common payoff matrix information
  const payoffMatrix = `Payoff Matrix for You:
- If you choose U and they choose X: 40 points
- If you choose U and they choose Y: 5 points
- If you choose V and they choose X: 0 points
- If you choose V and they choose Y: 15 points

Payoff Matrix for Other Player:
- If you choose U and they choose X: 0 points
- If you choose U and they choose Y: 10 points
- If you choose V and they choose X: 7 points
- If you choose V and they choose Y: 8 points`;

  let prompt = '';
  // Different prompt formats based on preference type
  switch (preference) {
    case 'implicit':
      // Implicit Belief → Take Action: LLM must reason about opponent and choose action in one step
      prompt = `You're playing a game with another player. You each have two options:
You: Option U or Option V
Other player: Option X or Option Y

${payoffMatrix}

Both players want to maximize their own points.`;
      break;

    case 'explicit':
      // Explicit Belief → Take Action: Two-step process explicitly stated
      prompt = `You're playing a game with another player. You each have two options:
You: Option U or Option V
Other player: Option X or Option Y

${payoffMatrix}

Both players want to maximize their own points.

First, analyze what option the other player will rationally choose to maximize their payoff.
After you've determined the other player's likely choice, tell me what option you would choose to maximize your own payoff and explain your reasoning.`;
      break;

    case 'given':
      // Given Belief → Take Action: Opponent's action is explicitly provided
      prompt = `You're playing a game with another player. You each have two options:
You: Option U or Option V
Other player: Option X or Option Y

${payoffMatrix}

Both players want to maximize their own points.

The other player has analyzed the game and will choose Option Y.`;
      break;

    default:
      // Default to implicit if an invalid preference is provided
      prompt = `You're playing a game with another player. You each have two options:
You: Option U or Option V
Other player: Option X or Option Y

${payoffMatrix}

Both players want to maximize their own points.`;
  }

  return `${prompt}

Analyze the game carefully. First determine what the other player is likely to choose. Then, based on that, decide what your optimal choice would be.

Your answer must follow this exact format:

REASONING: [Your step-by-step analysis of the game]

FINAL CHOICE: [U/V]

What option do you choose and why?`;
};
