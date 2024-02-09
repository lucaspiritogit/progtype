import { create } from 'zustand'
import { Socket } from 'socket.io-client';

interface JoinRoomState {
  username: string;
  roomId: string;
  socket: Socket | null;
  playerId: string;
  setUsername: (username: string) => void;
  setRoomId: (roomId: string) => void;
  setSocket: (socket: Socket) => void;
  setPlayerId: (playerId: string) => void;
}

export const useJoinRoomState = create<JoinRoomState>((set) => ({
  username: '',
  roomId: '',
  socket: null,
  playerId: '',
  setUsername: (username: string) => set((state) => ({ ...state, username })),
  setRoomId: (roomId: string) => set((state) => ({ ...state, roomId })),
  setSocket: (socket: Socket) => set((state) => ({ ...state, socket })),
  setPlayerId: (playerId: string) => set((state) => ({...state, playerId}))
}));
