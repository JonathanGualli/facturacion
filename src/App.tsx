import type { ReactNode } from "react";
import { Modal } from "./components/Modal/Modal";
import './App.css';

interface Props {
  children: ReactNode
}

function App({children}: Props) {
  return (
    <>
      <Modal></Modal>
      {children}
    </>
  )
}

export default App