import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const handleSend = () => { if (text.trim()) { onSend(text); setText(''); } };
  const handleKey = (e) => { if (e.key === 'Enter') handleSend(); };

  return (
    <div style={{ display: 'flex', padding: '16px', gap: '12px', background: '#1e293b', borderTop: '1px solid #334155' }}>
      <input value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKey}
        placeholder="Type your message..." 
        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: 'none',
          background: '#0f172a', color: '#f1f5f9', fontSize: '14px', outline: 'none' }} />
      <button onClick={handleSend}
        style={{ padding: '12px 24px', borderRadius: '12px', background: '#6366f1',
          color: 'white', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Send</button>
    </div>
  );
};

export default MessageInput;
