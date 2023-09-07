import { Message } from "@/typings"
import redis from "@/redis"
import  type { NextApiRequest, NextApiResponse } from 'next'

type Data={
    messages : Message[]
}
type ErrorData = {
    body : string;
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
){
if (req.method !== "GET"){
    res.status(405).json({body: 'Method Not Allowed'})
    return
}
const {message} = req.body;
const newMessage={
    ...message,created_at : Date.now()
};
const messageRes = await redis.hvals('messages')
const messages : Message[] = messageRes.map((message) => JSON.parse(message)).sort((a,b) => b.created_at - a.created_at)

res.status(200).json({messages});
}