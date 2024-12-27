import { config } from '../config/env';
import type { Message } from '../types/chat';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export async function sendMessage(content: string): Promise<string> {
  try {
    if (!config.openai.apiKey) {
      throw new OpenAIError('OpenAI API key is missing');
    }

    const response = await fetch(config.openai.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openai.apiKey}`
      },
      body: JSON.stringify({
        model: config.openai.model,
        messages: [{ role: 'user', content }]
      })
    });

    if (!response.ok) {
      throw new OpenAIError(`OpenAI API error: ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new OpenAIError('Invalid response format from OpenAI API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAIError) {
      throw error;
    }
    console.error('OpenAI API Error:', error);
    throw new OpenAIError('Failed to communicate with OpenAI API');
  }
}