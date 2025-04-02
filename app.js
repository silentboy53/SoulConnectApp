
    let modeSelected = "";

    document.getElementById('lostLovedOne').addEventListener('click', () => {
        modeSelected = "A lost loved one";
        startConversation();
    });

    document.getElementById('futureSelf').addEventListener('click', () => {
        modeSelected = "Your future self";
        startConversation();
    });

    document.getElementById('pastLife').addEventListener('click', () => {
        modeSelected = "A past life spirit";
        startConversation();
    });

    function startConversation() {
        document.getElementById('messages').innerHTML = "";
        document.getElementById('userInput').value = "";
    }

    document.getElementById('askQuestion').addEventListener('click', async () => {
        const question = document.getElementById('userInput').value.trim();
        if (!question) return;

        displayMessage("You: " + question, 'user');
        const aiResponse = await getAIResponse(question);
        displayMessage("SoulConnect: " + aiResponse, 'ai');
    });

    function displayMessage(message, sender) {
        const msg = document.createElement('div');
        msg.className = sender;
        msg.innerText = message;
        document.getElementById('messages').appendChild(msg);
    }

    async function getAIResponse(userInput) {
        const fullPrompt = `You are ${modeSelected} responding emotionally and spiritually. The user asked: "${userInput}".`;
        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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'
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',
                    prompt: fullPrompt,
                    max_tokens: 150
                })
            });
            const data = await response.json();
            return data.choices?.[0]?.text?.trim() || "Sorry, I couldn't understand that.";
        } catch (err) {
            return "Something went wrong while trying to connect to the spirit. Try again.";
        }
    }
    