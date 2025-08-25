'use client';

import { create } from 'zustand';

export type Msg = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  status?: 'sending' | 'sent';
};

type ChatState = {
  msgs: Msg[];
  isThinking: boolean;
  add: (msg: Msg) => void;
  addMany: (items: Msg[]) => void;
  replaceText: (id: string, text: string) => void;
  markSent: (id: string) => void;
  setThinking: (v: boolean) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  msgs: [],
  isThinking: false,

  add: (msg) => set((s) => ({ msgs: [...s.msgs, msg] })),
  addMany: (items) => set((s) => ({ msgs: [...s.msgs, ...items] })),
  replaceText: (id, text) =>
    set((s) => ({
      msgs: s.msgs.map((m) => (m.id === id ? { ...m, text } : m)),
    })),
  markSent: (id) =>
    set((s) => ({
      msgs: s.msgs.map((m) => (m.id === id ? { ...m, status: 'sent' } : m)),
    })),
  setThinking: (v) => set({ isThinking: v }),
  clear: () => set({ msgs: [], isThinking: false }),
}));
