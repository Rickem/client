import { useState } from 'react';
import Chat from './Chat';
import io from 'socket.io-client';
const socket = io('ws://localhost:5000');

export default function ChatBox() {
  const [newChat, setNewChat] = useState(false);
  const [username, setUsername] = useState('');

  const joinRoom = () => {
    if (username !== '') {
      socket.emit('join_room', `with_admin`);
      console.log(`${username} has joined room with admin`);

      setNewChat(true);
    }
  }

  return (
    <>
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center space-y-4' >
        <h2>Enter your name</h2>
        <input
          type='text'
          placeholder='Enter your name'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border border-gray-400 rounded-lg p-2'
        />
        <button
          onClick={() => joinRoom()}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>
          Submit
          </button>
      </div>
    </div>

    {newChat && 
      <Chat 
        socket={socket} 
        username={username} 
        room={`with_admin`} 
      />
    }
    
  </>

  );
}

