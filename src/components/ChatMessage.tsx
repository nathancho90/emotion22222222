import React from 'react';
import { Brain, Smile, Frown, Meh, ThinkingFace } from 'lucide-react';
import { Message } from '../types/chat';

const emotionIcons = {
  happy: Smile,
  sad: Frown,
  neutral: Meh,
  thinking: ThinkingFace
};

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const Icon = message.role === 'assistant' ? Brain : emotionIcons[message.emotion || 'neutral'];
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`p-3 rounded-lg ${
          isUser ? 'bg-blue-500 text-white mr-2' : 'bg-gray-100 text-gray-800 ml-2'
        }`}>
          <p className="text-sm">{message.content}</p>
          <span className="text-xs opacity-75 mt-1 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div className={`p-2 rounded-full ${
          isUser ? 'bg-blue-100' : 'bg-gray-200'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}