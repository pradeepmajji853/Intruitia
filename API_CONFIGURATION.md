# AI Content Generator API Configuration

To use the AI Content Generator component with an actual AI API, follow these steps:

## Configuration Steps

1. Choose an AI provider (OpenAI or Google Gemini)
2. Get an API key from your chosen provider
3. Create a `.env` file in the root directory (or copy from `.env.example`)
4. Add your API key and configure the provider

## Environment Variables

```
# AI API Keys
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Choose which API to use: 'openai' or 'gemini'
VITE_AI_PROVIDER=openai
```

## Getting API Keys

### OpenAI
1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Navigate to API Keys section
3. Create a new API key
4. Copy the key to your `.env` file

### Google Gemini
1. Go to [Google AI Studio](https://makersuite.google.com)
2. Create a new API key in the API section
3. Copy the key to your `.env` file

## Security Notes
- Never commit your `.env` file to version control
- Use environment variables in production deployment
- Set up proper rate limiting to manage API costs
