import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const JoinMultiRoom = ({ showJoinRoom, setShowJoinRoom }: any) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && roomId !== "") {
      socket.emit("join-room", roomId);
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
                setRoom(e.target.value);
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
                setUsername(e.target.value);
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
