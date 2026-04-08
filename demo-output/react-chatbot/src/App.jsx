import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);

  const handleSend = (text) => {
    const userMsg = { id: Date.now(), role: 'user', text };
    const botMsg = { id: Date.now() + 1, role: 'assistant', text: 'I received your message: "' + text + '". Processing...' };
    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f172a' }}>
      <ChatWindow messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default App;
