import React from 'react'
import { useState } from 'react';
import Chat from './Chat'
import './App.css';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () =>{
    if(username !== "" && room !== ""){
      socket.emit("join_room", room)
    }
  }
  return (
    <div className="App">
      <h3>Join the Chatroom</h3>
      <input type='text' name="username" placeholder='John...' onChange={(event) => {setUsername(event.target.value)}}/>
      <input type='text' name="room" placeholder='ROOM ID...' onChange={(event) => {setRoom(event.target.value)}}/>
      <button onClick ={joinRoom}>Join a Room</button>

      <Chat socket = {socket}/>
    </div>
  );
}

export default App;
