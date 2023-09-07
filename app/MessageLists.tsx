"use client"
import useSWR from 'swr';
import fetcher from '@/utilis/fetcheMessage';
import { Message } from '@/typings';
function MessageLists(){
    const { data: messages, error,mutate} = useSWR<Message[]>("/api/getMessage",fetcher)   
    return(
        <div>
            {messages?.map((message) =>(
                <div key={message.id}>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    )
}
export default MessageLists