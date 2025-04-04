import { FC, useState, createContext, useContext, ReactElement, ReactNode } from 'react';
import Modal from '../components/modal/modal';

type ModalContextType = {
  openModal: (content: ReactElement) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps ={
    children: ReactNode;
}
export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [content, setContent] = useState<ReactElement | null>(null);

  return (
    <ModalContext.Provider value={{
      openModal: setContent,
      closeModal: () => setContent(null)
    }}>
      {children}
      {content && <Modal>{content}</Modal>}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Use ModalProvider!');
  return context;
};