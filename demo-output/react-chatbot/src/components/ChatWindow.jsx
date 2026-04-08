import React, { useRef, useEffect } from 'react';

const ChatWindow = ({ messages }) => {
  const endRef = useRef(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {messages.map(m => (
        <div key={m.id} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
          background: m.role === 'user' ? '#6366f1' : '#1e293b',
          color: '#f1f5f9', padding: '12px 18px', borderRadius: '16px', maxWidth: '70%' }}>
          {m.text}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
