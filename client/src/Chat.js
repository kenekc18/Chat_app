import React, { useEffect } from 'react'
import {useState} from 'react'

export const Chat = ({socket, username, room}) => {
    const [currentMessage, setcurrentMessage] =useState("")
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () =>{
        if (currentMessage !== ""){
            const messageData = { 
                User: username,
                room: room,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":"
                 + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
        console.log("Received message on client:", data);
        setMessageList((list) => [...list, data]);});
        return () => {
            socket.off("receive_message");
        }, [socket]})
  return (
    <div className='Chat-components'>
        <div className='chatHeader'>
            <p>Live Chat</p>
        </div>
        <div className='chatBody'>
             {messageList.map((messageContent, index) => {
            return (
                <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                    key={index}
                >
                    {/* ... message content and meta ... */}
                </div>
            )})}
        </div>
        <div className='chatFooter'>
            <input type='text' name="message" placeholder='Hey...' onChange={(event) => {setcurrentMessage(event.target.value)}}onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}/>
            <button onClick = {sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat;