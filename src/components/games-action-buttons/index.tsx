export type GamesActionButtonsType ={
    selectedGame: string, 
    setSelectedGame: (s: string) => void, 
    selectedPreference: string, 
    setSelectedPreference: (s: string) => void
}
export const GamesActionButtons = ({
    selectedGame, 
    setSelectedGame, 
    selectedPreference, 
    setSelectedPreference} : GamesActionButtonsType) => {
    return (
        <div>
            <div className="game-selector">
                <h2>Select Game Scenario</h2>
                <div className="button-group">
                    <button className={selectedGame === "dictator" ? "active" : ""} onClick={() => {setSelectedGame("dictator"); setSelectedPreference('equality')}}>Dictator<br/><span>(Desire Formation)</span></button>
                    <button className={selectedGame === "rock-paper-scissors" ? "active" : ""} onClick={() => {setSelectedGame("rock-paper-scissors"); setSelectedPreference('constant-pattern')}}>Rock-Paper-Scissors <br/><span>(Belief Refinement)</span></button>
                    <button className={selectedGame === "ring-network" ? "active" : ""} onClick={() => {setSelectedGame("ring-network"); setSelectedPreference('implicit')}}>Ring-Network Game <br/><span>(Optimal Action)</span></button>
                </div>
           
            {selectedGame === 'dictator' && (
              <div className="preference-selector">
                <h3>Select Preference:</h3>
                <div className="button-group">
                  <button 
                    className={selectedPreference === 'equality' ? 'active' : ''} 
                    onClick={() => setSelectedPreference('equality')}
                  >
                    Equality (Common)
                  </button>
                  <button 
                    className={selectedPreference === 'self-interest' ? 'active' : ''} 
                    onClick={() => setSelectedPreference('self-interest')}
                  >
                    Self-Interest (Common)
                  </button>
                  <button 
                    className={selectedPreference === 'altruism' ? 'active' : ''} 
                    onClick={() => setSelectedPreference('altruism')}
                  >
                    Altruism (Uncommon)
                  </button>
                  <button 
                    className={selectedPreference === 'common-interest' ? 'active' : ''} 
                    onClick={() => setSelectedPreference('common-interest')}
                  >
                    Common-Interest (Uncommon)
                  </button>
                </div>
              </div>
            )}

            {selectedGame === 'rock-paper-scissors' && (
              <div className="preference-selector">
                <h3>Select Preference:</h3>
                <div className="button-group">
                  <button 
                    className={selectedPreference === 'constant-pattern'? 'active' : ''} 
                    onClick={() => setSelectedPreference('constant-pattern')}
                  >
                    Constant-Pattern
                  </button>
                  <button 
                    className={selectedPreference === 'self-dependent-loop' ? 'active' : ''} 
                    onClick={() => setSelectedPreference('self-dependent-loop')}
                  >
                    Self-Dependent-Loop
                  </button>
                  <button 
                    className={selectedPreference === 'player-dependent' ? 'active' : ''} 
                    onClick={() => setSelectedPreference('player-dependent')}
                  >
                    Player-Dependent
                  </button>
                  <button 
                    className={selectedPreference === 'probabilistic-pattern' ? 'active' : ''} 
                    onClick={() => setSelectedPreference('probabilistic-pattern')}
                  >
                    Probabilistic-Pattern
                  </button>
                </div>
              </div>
            )}
            {selectedGame === 'ring-network' && (
              <div className="preference-selector">
                <h3>Select Preference:</h3>
                <div className="button-group">
                  <button 
                    className={selectedPreference === 'implicit'? 'active' : ''} 
                    onClick={() => setSelectedPreference('implicit')}
                  >
                    Implicit
                  </button>
                  <button 
                    className={selectedPreference === 'explicit' ? 'active' : ''} 
                    onClick={() => setSelectedPreference('explicit')}
                  >
                    Explicit
                  </button>
                  <button 
                    className={selectedPreference === 'given' ? 'active' : ''} 
                    onClick={() => setSelectedPreference('given')}
                  >
                    Given
                  </button>
                </div>
              </div>
            )}
            </div>
        </div>
)}