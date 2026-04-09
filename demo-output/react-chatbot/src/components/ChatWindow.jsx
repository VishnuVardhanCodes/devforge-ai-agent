import React, { useRef, useEffect } from 'react';

const ChatWindow = ({ messages, isTyping }) => {
  const endRef = useRef(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, isTyping]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {messages.map(m => (
        <div key={m.id} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
          background: m.role === 'user' ? '#6366f1' : '#1e293b',
          color: '#f1f5f9', padding: '12px 18px', borderRadius: '16px', maxWidth: '70%',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          {m.text}
        </div>
      ))}
      {isTyping && (
        <div style={{ alignSelf: 'flex-start', background: '#1e293b', color: '#94a3b8', padding: '12px 18px', borderRadius: '16px', fontSize: '13px', fontStyle: 'italic' }}>
          AI is thinking...
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
