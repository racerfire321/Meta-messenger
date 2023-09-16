
import { Message } from "@/typings";
import { useSession } from "next-auth/react";
import Image from "next/image";
type Props={
    message : Message;
};
function MessageComponent({message}:Props){
   const {data:session} = useSession();
    const isUser = session?.user?.email === message.email;
    const formattedDate = new Date(message.created_at).toLocaleString();
    return(
        <div className={`flex w-fit ${isUser && "ml-auto"}`}>
            <div className={` flex-shrink-0 ${isUser && " order-2"}`}>
                <Image
                className="rounded-full mx-2"
                height={10}
                width={50}
                src={message.profilePic}
                alt="Profile"/>
            </div>
            <div>
                <span className={`text-[0.65rem] px-[2px] pb-[2px] ${isUser ? " text-blue-400 text-right " : " text-red-400 text-left"}`}>{message.username}</span>
                <div className="flex items-end">
                    <div className={`px-3 py-2 rounded-lg  w-fit text-white ${isUser ? " bg-blue-400 ml-auto order-2" : " bg-red-400 "}`}>
                        <p>{message.message}</p>
                    </div>
                    <p className={`text-[0.65rem] italic px-2 text-gray-300 ${isUser && "text-right" } ` }>{formattedDate  }</p>
                </div>
            </div>
        </div>
    )
}
export default MessageComponent