
    let modeSelected = "";

    // Mode buttons
    document.getElementById('lostLovedOne').addEventListener('click', () => {
        modeSelected = "a lost loved one";
        displayMessage("You are now speaking to a lost loved one.", 'system');
    });

    document.getElementById('futureSelf').addEventListener('click', () => {
        modeSelected = "your future self";
        displayMessage("You are now speaking to your future self.", 'system');
    });

    document.getElementById('pastLife').addEventListener('click', () => {
        modeSelected = "a past life spirit";
        displayMessage("You are now speaking to a past life spirit.", 'system');
    });

    // Handle Ask button click
    document.getElementById('askQuestion').addEventListener('click', async () => {
        const question = document.getElementById('userInput').value.trim();
        if (!question || !modeSelected) {
            displayMessage("Please select who you want to talk to and ask a question.", 'system');
            return;
        }

        displayMessage("You: " + question, 'user');
        const aiResponse = await getAIResponse(question);
        displayMessage("SoulConnect: " + aiResponse, 'ai');
    });

    // Show messages
    function displayMessage(message, sender) {
        const msg = document.createElement('div');
        msg.className = sender;
        msg.innerText = message;
        document.getElementById('messages').appendChild(msg);
    }

    // OpenAI API call
    async function getAIResponse(userInput) {
        const prompt = `You are ${modeSelected}. Respond to this emotionally and spiritually: "${userInput}"`;

        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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'
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',
                    prompt: prompt,
                    max_tokens: 150
                })
            });

            const data = await response.json();
            const text = data.choices?.[0]?.text?.trim();
            return text || "The spirit was silent. Try again.";
        } catch (error) {
            return "There was a problem connecting to the spirit realm. Please try again.";
        }
    }
    