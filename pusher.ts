import Pusher from "pusher";
import ClientPusher from "pusher-js";
export const serverPusher=new Pusher({
    appId: "1666691",
    key: "9bd26b772c4c2ef9722c",
    secret: "3941b1b2714e071af942",
    cluster: "ap2",
    useTLS: true
  });
  export const clientPusher = new ClientPusher("9bd26b772c4c2ef9722c", {
    cluster: "ap2",
    forceTLS: true
  })