import { useState } from 'react';

const ChatInput = () => {
  const [textArea, setTextArea] = useState('');

  return (
    <div className='chat-input'>
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      ></textarea>
      <button className='btn-secondary'>Submit</button>
    </div>
  );
};

export default ChatInput;
