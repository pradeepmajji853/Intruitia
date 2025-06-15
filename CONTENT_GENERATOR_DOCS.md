# Content Generator Component Documentation

## Overview
The ContentGenerator component is an AI-powered content creation tool that helps users quickly generate professional marketing content based on specific parameters. The component integrates with the Intruitia website and provides a user-friendly interface for generating different types of content.

## Features
- Topic/keyword input field
- Target audience selection
- Content tone selection
- Content type dropdown (Blog Post, LinkedIn Post, Tweet, Instagram Caption)
- Content generation with loading indicators
- Error handling
- Copy to clipboard functionality
- Responsive design for mobile and desktop

## Technical Implementation
The component uses React with TypeScript for type safety and includes the following:
- State management for form data, loading state, and generated content
- Async content generation function with error handling
- Mock implementation ready to be replaced with actual API integration
- Responsive design using Tailwind CSS

## API Integration
The component includes a mock implementation of the content generation function. To integrate with an actual generative AI API (like OpenAI or Google Gemini), follow these steps:

1. Create an account with your preferred AI provider (OpenAI, Google Gemini, etc.)
2. Get an API key and add it to your environment variables
3. Replace the mock implementation in the `generateContent` function with actual API calls
4. Update error handling to manage API-specific errors

## Example OpenAI Integration
```typescript
const generateContent = async (prompt: string): Promise<ApiResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    const data = await response.json();
    return { content: data.choices[0].message.content };
  } catch (error) {
    console.error('API error:', error);
    throw new Error('Failed to generate content');
  }
};
```

## Example Google Gemini Integration
```typescript
const generateContent = async (prompt: string): Promise<ApiResponse> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          topP: 0.8,
          topK: 40
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return { content: data.candidates[0].content.parts[0].text };
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
      throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('API error:', error);
    throw new Error('Failed to generate content');
  }
};
```

## Future Enhancements
1. Add more content types and customization options
2. Implement content history to save previous generations
3. Add options to export content in different formats (PDF, Word, etc.)
4. Implement user feedback system to improve AI responses
5. Add content editing capabilities directly in the UI

## Usage Guidelines
- Always review and edit AI-generated content before publishing
- Verify facts and statistics in the generated content
- Add personal examples and insights to make the content unique
- Optimize the content for SEO if publishing online
- Ensure the content aligns with your brand voice and guidelines

## Component Location
`/src/components/ContentGenerator.tsx`

## Route
The component is accessible at `/content-generator` and is integrated into the main navigation.
