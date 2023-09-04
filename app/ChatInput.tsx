"use client"
import React, { useState, FormEvent } from 'react';

function ChatInput() {
  const [input, setInput] = useState('');

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    
   
    const messageToSend = input;
   

    
    setInput('');
  };

  return (
    <form onSubmit={addMessage} className='fixed bottom-0 z-50 w-full border-t flex px-10 border-gray-100  py-5 space-x-2'>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!input}
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
