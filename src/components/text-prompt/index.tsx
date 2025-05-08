"use client"
import { useState, useEffect} from "react"
import { fetchAllResponses } from "../fetch-response";
import { getDictatorPrompt, getRockPaperScissorsPrompt, getRingNetworkPrompt } from "./util";
export type TextPormptType = {
    selectedGame: string;
    selectedPreference: string;
    models: string[],
    callback: (data: any) => void;
}
export const TextPrompt = ({selectedGame, selectedPreference, models, callback}: TextPormptType) => {
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const gameDescriptions: Record<string, string>= {
        "dictator": "In the Dictator Game, there are two players: the dictator and the recipient. The dictator chooses between two allocation options, and the recipient must accept this choice. This tests the ability to form clear desires based on given preferences.",
        "rock-paper-scissors": "Rock-Paper-Scissors tests an LLM's ability to refine beliefs by identifying patterns in an opponent's behavior over multiple rounds. This evaluates if LLMs can update their beliefs based on historical data.",
        "ring-network": "The Ring-Network Game is a 2×2 game where a player must predict the opponent's action and then choose their own optimal action. This tests if LLMs can combine desires and beliefs to make optimal decisions."
    };

    useEffect(() => {
        const prompts:Record<string, string> = {
            'dictator': getDictatorPrompt(selectedPreference),
            'rock-paper-scissors': getRockPaperScissorsPrompt(selectedPreference),
            'ring-network': getRingNetworkPrompt(selectedPreference)
        };
        
        setPrompt(prompts[selectedGame] || '');
    }, [selectedGame, selectedPreference])

    return (
      <div>
        <div className="game-description">
            <h2>Game Description</h2>
            <p>{gameDescriptions[selectedGame]}</p>
            
            <h3>Prompt:</h3>
            <div className="prompt-container">
              <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                rows={10}
              />
            </div>
            
            <button 
              className="fetch-button" 
              onClick={() => {
                setIsLoading(true)
                fetchAllResponses(prompt, models, callback)
                .then((data) => {
                    setIsLoading(false)
                })
            }} 
              disabled={isLoading || selectedGame === '' && selectedPreference ===''}
            >
              {isLoading ? 'Fetching Responses...' : 'Test All LLMs'}
            </button>
          </div>
        </div>
    )
}

