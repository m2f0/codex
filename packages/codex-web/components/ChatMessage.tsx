import React from 'react';

export type ChatMessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';
  return (
    <div className={isUser ? 'text-right' : 'text-left'}>
      <div
        className={`inline-block rounded-lg px-3 py-2 mb-1 max-w-sm ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
