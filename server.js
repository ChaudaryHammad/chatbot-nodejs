// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const intentsPath = path.join(__dirname, 'intents.json'); // Update the file name

function getBotResponse(userMessage) {
  const intents = JSON.parse(fs.readFileSync(intentsPath, 'utf-8'));

  for (const item of intents.processed_data) {
    const tokens = item.tokens;
    const tag = item.tag;
    const responses = item.responses;

    // Check if userMessage contains any of the tokens
    const match = tokens.some(token => userMessage.includes(token));

    if (match) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  return "I'm sorry, I didn't understand that.";
}

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  const botResponse = getBotResponse(userMessage);
  res.json({ message: botResponse });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
