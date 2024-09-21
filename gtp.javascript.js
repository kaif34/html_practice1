const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');

const app = express();
app.use(bodyParser.json());

// Set up your OpenAI API key
openai.apiKey = 'your-api-key-here';

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.Completion.create({
            engine: 'text-davinci-003',  // Use "gpt-3.5-turbo" for ChatGPT-like responses
            prompt: prompt,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7,
        });

        res.json({ response: response.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating response');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
