const express = require('express');
const openai = require('openai');

const app = express();
app.use(express.json());

app.post('/api/interpretation', async (req, res) => {
  const { cardId } = req.body;

  try {
    const interpretation = await getTarotInterpretation(cardId);
    res.json({ interpretation });
  } catch (error) {
    console.error('Error processing interpretation:', error);
    res.status(500).send('Error processing interpretation');
  }
});

const getTarotInterpretation = async (cardId) => {
  try {
    // OpenAI API 호출 로직
    const response = await openai.Completion.create({
      engine: "text-davinci-003",
      prompt: `Provide a tarot interpretation for card with ID: ${cardId}`,
      max_tokens: 150
    });
    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error in OpenAI API request:', error);
    throw new Error('Failed to get interpretation from OpenAI');
  }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});