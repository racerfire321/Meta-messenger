"use client"
import { Message } from '@/typings';
import React, { useState, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr';
import fetcher from '@/utilis/fetcheMessage';
import { getServerSession } from 'next-auth/next';

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};


function ChatInput({session}: Props) {
  const [input, setInput] = useState('');
  const { data: messages, error,mutate} = useSWR<Message[]>("/api/getMessage",fetcher)
  
  const addMessage = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    
  
    const messageToSend = input;
    setInput('');

    const id = uuid();
    
    const message: Message ={
      id,
      message:messageToSend,
      created_at : Date.now(),
      username: session?.user?.name! ,
      profilePic : session?.user?.image!,
      email : session?.user?.email!,
      
    };

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
    <form onSubmit={addMessage} className='fixed bottom-0 z-50 w-full border-t flex px-10 border-gray-100 bg-white  py-5 space-x-2'>
      <input
        type="text"
        value={input}
        disabled = {!session}
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
