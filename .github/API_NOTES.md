# API Handling in Intruitia

## Environment Variables

The application uses environment variables for API key management:

```
# AI API Keys
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_AI_PROVIDER=openai
```

## Implementation Notes

- We use Vite's `import.meta.env` to access environment variables
- Default provider is OpenAI with fallback to mock implementation
- Content Generator uses the selected AI provider to generate marketing content
- Error handling is implemented to handle API rate limits and errors
- See API_CONFIGURATION.md for full setup instructions
