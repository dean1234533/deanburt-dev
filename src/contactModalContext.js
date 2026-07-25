import { createContext, useContext } from 'react';

export const ContactModalContext = createContext(() => {});

export function useContactModal() {
  return useContext(ContactModalContext);
}
