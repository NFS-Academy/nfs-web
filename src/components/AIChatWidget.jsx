'use client';
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function AIChatWidget({ simulationContext = "General Dashboard" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi! I'm your AI lab assistant. Ask me anything about ${simulationContext}!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context: simulationContext })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || 'Sorry, I encountered an error.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Network error connecting to AI.' }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl flex flex-col overflow-hidden text-gray-100">
          <div className="bg-gray-800 p-3 flex justify-between items-center border-b border-gray-700">
            <h3 className="font-semibold text-green-400">Lab Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`p-2 max-w-[85%] rounded-md text-sm ${m.role === 'ai' ? 'bg-gray-800 self-start text-gray-200' : 'bg-green-600 self-end text-white'}`}>
                {m.text}
              </div>
            ))}
            {isLoading && <div className="text-xs text-gray-500 animate-pulse">Assistant is typing...</div>}
          </div>

          <div className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
            <input 
              type="text" 
              className="flex-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-green-500"
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-green-600 p-1.5 rounded text-white hover:bg-green-500">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
