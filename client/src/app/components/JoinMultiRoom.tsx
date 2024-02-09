"use client"
import { useState } from "react";
import io from "socket.io-client";
import { useRouter } from 'next/navigation';

const server  = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER as string;
const socket = io(server, {
  autoConnect: false
});


const JoinMultiRoom = ({ showJoinRoom, setShowJoinRoom, setRoomId, setSocket }: any) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoom] = useState("");
  const { push } = useRouter();

  const joinRoom = () => {

    socket.on("room-full", (message: any) => {
      alert("Lobby is full")
      push("/")
    })

    if (username !== "" && roomId !== "") {
      socket.emit("join-room", roomId);
      setSocket(socket)
      setRoomId(roomId)
      setShowJoinRoom(false);
    }
  };

  return (
    <div className="flex justify-center">
      {showJoinRoom && (
        <>
          <div className="flex w-max flex-col items-center gap-5 p-5">
            <h1 className="text-3xl">Join a room</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="p-2 text-black"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="room">Room id</label>
            <input
              type="text"
              name="room"
              id="room"
              placeholder="room id"
              className="p-2 text-black"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <button className="p-2" onClick={joinRoom}>
              Join room
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JoinMultiRoom;
