import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/globals";
import Modal from 'react-modal'
import { useState } from "react";
import { NewTransactionsModal } from "./components/NewTransactionsModal";
import { TransactionsPtovider } from "./hooks/useTransactions";


Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCLoseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsPtovider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionsModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCLoseNewTransactionModal}
      />
    </TransactionsPtovider>
  );
}

export default App;
