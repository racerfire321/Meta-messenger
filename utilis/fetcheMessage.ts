import { Message } from "@/typings";

const fetcher =async () => {
    const res = await fetch("/api/getMessage");
    const data = await res.json();
    const messages:Message[] = data.messages
    return messages;
}
export default fetcher