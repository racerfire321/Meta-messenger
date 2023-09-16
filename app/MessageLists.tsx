"use client"
import useSWR from 'swr';
import fetcher from '@/utilis/fetcheMessage';
import { Message } from '@/typings';
import MessageComponent from './MessageComponent';
import { clientPusher } from '@/pusher';
import {useEffect} from 'react'
type Props={
    initialMessages : Message[];
}
function MessageLists( {initialMessages} : Props ){
    const { data: messages, error,mutate} = useSWR<Message[]>("/api/getMessage",fetcher)   
    useEffect(()=> {
        const channel = clientPusher.subscribe("messages");
        channel.bind("new-message",async(data : Message)=>{
            if (messages?.find((message) =>message.id === data.id ))return;
            if(!messages){
                mutate(fetcher)
            }else{
                mutate(fetcher,{
                    optimisticData : [data , ...messages!],
                    rollbackOnError : true
                })
            }
              return()=>{
                channel.unbind_all();
                channel.unsubscribe();
                mutate("/api/getMessage");
              }
        });
        
    },[messages,mutate,clientPusher]);
    return(
        <div>
            {(messages )?.map((message ) =>(
             <MessageComponent key={message.id } message={message}/>
            ))}
        </div>
    )
}
export default MessageLists