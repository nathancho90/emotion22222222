import React, { useRef, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b p-4">
        <div className="flex items-center justify-center gap-2">
          <Brain className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold">Emotion-Aware Chat</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}