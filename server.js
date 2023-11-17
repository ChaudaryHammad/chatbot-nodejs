// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const intentsPath = path.join(__dirname, 'intents.json');

function getBotResponse(userMessage) {
  // Add logic to match userMessage with intent patterns and generate a response
  const intents = JSON.parse(fs.readFileSync(intentsPath, 'utf-8'));

  // Log the contents of intents.json


  for (const intent of intents.intents) {
    for (const pattern of intent.patterns) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(userMessage)) {
        return intent.responses[Math.floor(Math.random() * intent.responses.length)];
      }
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
