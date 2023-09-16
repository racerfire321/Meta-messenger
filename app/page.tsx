
import React from 'react'
import ChatInput from './ChatInput'
import MessageLists from './MessageLists'
import { Provider } from './Provider'
import { Message } from '@/typings'
import { getServerSession } from 'next-auth/next'


const HomePage = async() => {
  const session = await getServerSession();
  const data = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessage`,{ next: { revalidate: 1000 }}).then ((res) => res.json())
  
  
  const messages : Message[] = data.messages
  return (
    
   <Provider session={session}>
    <main>
    <MessageLists initialMessages={messages}/>
   <ChatInput session={session} />
   </main>
  </Provider>
   
  )
}

export default HomePage