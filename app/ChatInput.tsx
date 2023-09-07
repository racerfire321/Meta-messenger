"use client"
import { Message } from '@/typings';
import React, { useState, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr';
import fetcher from '@/utilis/fetcheMessage';
function ChatInput() {
  const [input, setInput] = useState('');
  const { data: messages, error,mutate} = useSWR<Message[]>("/api/getMessage",fetcher)
     console.log("hello",messages);
  const addMessage = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    
   
    const messageToSend = input;
    setInput('');

    const id = uuid();
    const message:Message ={
      id,
      message:messageToSend,
      created_at : Date.now(),
      username:'Bitisha',
      profilePic : "https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/314499012_1231446537402848_5886722258835917863_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=EY_DUirRKJ8AX8pQfSr&_nc_ht=scontent.fktm3-1.fna&oh=00_AfBvQKq3vb-Z9pF_z5KdYHCY1MiDMFEKITx2EUs57F8q5w&oe=64FE76F3",
      email : "racerfire321@gmail.com"
    }

    const uploadMessageToupstach =async () => {
      const data = await fetch("/api/addMessage",{
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({message,})
      }).then(res => res.json());
     return [ data.message,...messages!]
    };
    await mutate(uploadMessageToupstach,{
      optimisticData : [message,...messages!],
      rollbackOnError: true
    });
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
