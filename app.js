
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
                let response = getAIResponse(userQuestion); // Get AI response
                setTimeout(() => {
                    displayMessage(response, 'ai'); // Show AI response
                }, 1000);
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

    // Function to get the AI's response based on the selected mode
    function getAIResponse(userQuestion) {
        if (modeSelected === "lostLovedOne") {
            return "I still hear you in the silence, just beyond the edges of my thoughts.";
        } else if (modeSelected === "futureSelf") {
            return "You will find peace in the chaos, don’t worry.";
        } else if (modeSelected === "pastLife") {
            return "Once, you were a warrior on the shores of a forgotten land.";
        } else {
            return "I'm not sure how to respond to that.";
        }
    }
    