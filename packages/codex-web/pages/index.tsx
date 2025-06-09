import Head from 'next/head';
import { useState } from 'react';
import ChatMessage from '../components/ChatMessage';

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Error fetching response' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>4SysCodex</title>
      </Head>
      <div className="flex flex-col min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center mb-4">4SysCodex</h1>
        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.map((m, idx) => (
            <ChatMessage key={idx} role={m.role} content={m.content} />
          ))}
          {loading && <div className="text-gray-500">Thinking...</div>}
        </div>
        <div className="mt-4 flex">
          <input
            className="flex-1 border rounded-l px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 rounded-r"
            onClick={sendMessage}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
