export const fetchAllResponses = async (prompt: string, models: string[], callback: any) => {
    console.log("Fetching", prompt, models);
    
    // Use Promise.all to wait for all requests to complete
    const promises = models.map(async (model) => {
      try {
        const response = await fetchGPT(prompt, model);
        
        // Update the callback with each result as it comes in
        callback((prev: any) => ({
          ...prev,
          [model]: response.error 
            ? response.error.message 
            : (response.choices && response.choices[0]?.message?.content) || "No response received"
        }));
        
        return response;
      } catch (error: unknown) {
        console.error(`Error fetching response for ${model}:`, error);
        callback((prev: any) => ({
          ...prev,
          [model]: `Error: ${error || "Unknown error"}`
        }));
        return null;
      }
    });
    
    // Wait for all requests to complete
    await Promise.all(promises);
  };
  
  const fetchGPT = async (prompt: string, model: string) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!API_KEY) {
        console.error("No API key found");
        return { error: { message: "API key not configured" } };
      }
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 600
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Fetching error", error);
      return { error: { message: error instanceof Error ? error.message : "Failed to fetch response" } };
    }
  };