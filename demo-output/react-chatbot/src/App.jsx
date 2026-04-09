import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text) => {
    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    
    setIsTyping(true);

    const responses = [
      "That is a great question! Let me check that for you.",
      "I understand. Here is what I found regarding '" + text + "'.",
      "I am processing your request. One moment please.",
      "Interesting point. Could you tell me more?",
      "I am trained to handle exactly that. Let me assist you!"
    ];

    setTimeout(() => {
      const reply = responses[Math.floor(Math.random() * responses.length)];
      const botMsg = { id: Date.now() + 1, role: 'assistant', text: reply };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f172a' }}>
      <div style={{ padding: '16px', background: '#1e293b', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ w: '8px', h: '8px', borderRadius: '50%', background: '#10b981' }}></div>
        <h1 style={{ color: 'white', fontSize: '14px', fontWeight: '800', letterSpacing: '0.05em' }}>AI ASSISTANT</h1>
      </div>
      <ChatWindow messages={messages} isTyping={isTyping} />
      <MessageInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};

export default App;
