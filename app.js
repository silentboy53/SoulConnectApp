
    let modeSelected = ""; // Keeps track of the selected mode

    // Set up event listeners for each button
    document.getElementById('lostLovedOne').addEventListener('click', function() {
        modeSelected = "lostLovedOne";
        startConversation();
    });
    document.getElementById('futureSelf').addEventListener('click', function() {
        modeSelected = "futureSelf";
        startConversation();
    });
    document.getElementById('pastLife').addEventListener('click', function() {
        modeSelected = "pastLife";
        startConversation();
    });

    // Function to start the conversation
    function startConversation() {
        document.getElementById('messages').innerHTML = ""; // Clear previous messages
        document.getElementById('userInput').value = ""; // Clear input field
        document.getElementById('userInput').style.display = "block"; // Show input field
        document.getElementById('askQuestion').style.display = "block"; // Show ask button

        document.getElementById('askQuestion').addEventListener('click', function() {
            let userQuestion = document.getElementById('userInput').value;
            if (userQuestion) {
                displayMessage(userQuestion, 'user'); // Show user question
                getAIResponse(userQuestion); // Get AI response from ChatGPT API
            }
        });
    }

    // Function to display a message in the conversation
    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender);
        messageElement.innerText = message;
        document.getElementById('messages').appendChild(messageElement);
    }

    // Function to get the AI's response from ChatGPT (integrated)
    async function getAIResponse(userQuestion) {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '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' // Replace with your API key
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // You can choose different models like GPT-3
                prompt: userQuestion,
                max_tokens: 150
            })
        });
        
        const data = await response.json();
        const aiMessage = data.choices[0].text.trim();
        setTimeout(() => {
            displayMessage(aiMessage, 'ai'); // Show AI response
        }, 1000);
    }
    
