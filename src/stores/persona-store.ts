import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Persona = 'sani-uong' | 'mas-rayfa' | null;

interface PersonaStore {
  selectedPersona: Persona;
  setPersona: (persona: Persona) => void;
}

export const usePersonaStore = create<PersonaStore>()(
  persist(
    (set) => ({
      selectedPersona: null,
      setPersona: (persona) => set({ selectedPersona: persona }),
    }),
    {
      name: 'persona-storage',
    }
  )
);
