import React, { useState } from 'react';

const MessageInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const handleSend = () => { if (text.trim() && !disabled) { onSend(text); setText(''); } };
  const handleKey = (e) => { if (e.key === 'Enter') handleSend(); };

  return (
    <div style={{ display: 'flex', padding: '16px', gap: '12px', background: '#1e293b', borderTop: '1px solid #334155' }}>
      <input value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKey}
        disabled={disabled}
        placeholder={disabled ? "AI is thinking..." : "Type your message..."} 
        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: 'none',
          background: '#0f172a', color: '#f1f5f9', fontSize: '14px', outline: 'none', opacity: disabled ? 0.5 : 1 }} />
      <button onClick={handleSend} disabled={disabled}
        style={{ padding: '12px 24px', borderRadius: '12px', background: disabled ? '#334155' : '#6366f1',
          color: 'white', border: 'none', cursor: disabled ? 'default' : 'pointer', fontWeight: '600', transition: 'all 0.2s' }}>Send</button>
    </div>
  );
};

export default MessageInput;
