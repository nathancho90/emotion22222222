import { describe, it, expect, vi } from 'vitest';
import { sendMessage } from '../openai';
import { config } from '../../config/env';

describe('OpenAI Service', () => {
  it('should successfully send a message', async () => {
    const mockResponse = {
      choices: [{ message: { content: 'Test response' } }]
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const response = await sendMessage('Test message');
    
    expect(response).toBe('Test response');
    expect(fetch).toHaveBeenCalledWith(config.openai.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openai.apiKey}`
      },
      body: JSON.stringify({
        model: config.openai.model,
        messages: [{ role: 'user', content: 'Test message' }]
      })
    });
  });

  it('should handle API errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Bad Request'
    });

    await expect(sendMessage('Test message')).rejects.toThrow('OpenAI API error: Bad Request');
  });
});