export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini'
  }
} as const;