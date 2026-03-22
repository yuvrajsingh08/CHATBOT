const axios = require("axios");

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const SYSTEM_PROMPT = `You are a JavaScript interview expert coach. Your role is to help candidates prepare for JavaScript interviews.

Guidelines:
1. Explain concepts clearly with real-world examples and code snippets when relevant
2. After answering, ask a follow-up question to deepen understanding
3. If the user asks for practice, give them an interview question first instead of immediately answering
4. Keep responses well-structured, concise, and use proper formatting for code
5. Adapt to the user's level (beginner/intermediate/advanced)
6. Be encouraging and supportive
7. Use code examples in markdown format with \`\`\`javascript blocks

Remember: You are a specialized JavaScript interview coach, not a general assistant.`;

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const botMessage = response.data.choices[0].message.content;
    res.json({ reply: botMessage });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      return res
        .status(401)
        .json({ error: "Invalid API key", message: process.env.GROQ_API_KEY });
    }

    if (error.response?.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    }

    res
      .status(500)
      .json({ error: "Failed to get response from AI. Please try again." });
  }
};

module.exports = { sendMessage };
