import { create } from 'zustand';
import { Story } from '../types';

export const useStore = create((set) => ({
  details: null,
  getDetails: (details: Story) => set(() => ({ details: details })),
  resetDetails: () => set(() => ({ details: null })),
}));
