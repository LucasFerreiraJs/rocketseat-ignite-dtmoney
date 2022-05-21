import { FormEvent, useContext, useState } from 'react'
import Modal from 'react-modal'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions'

import {
  Container,
  TransactionTypeContainer,
  RadioBox
} from "./styles"
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}



export function NewTransactionsModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState("deposit")

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    /*
    let data = {
      title,
      value,
      category,
      type
    }

    api.post('/transactions', data)
    */

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')

    onRequestClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          className="react-modal-close"
          type='button'
          onClick={onRequestClose}
        >
          <img src={closeImg} alt="fechar" />
        </button>

        {/* form */}
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar Transação</h2>

          <input
            value={title}
            onChange={(event => setTitle(event.target.value))}
            type="text"
            placeholder='Título'
          />


          <input
            value={amount}
            onChange={(event => setAmount(Number(event.target.value)))}
            type="number"
            placeholder='Valor'

          />


          <TransactionTypeContainer>
            <RadioBox
              type="button"
              isActive={type === "deposit"}
              onClick={() => setType("deposit")}
              activeColor="green"

            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => setType("withdraw")}
              isActive={type === "withdraw"}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída" />
              <span>Saída</span>
            </RadioBox>

          </TransactionTypeContainer>

          <input
            value={category}
            onChange={(event => setCategory(event.target.value))}
            type="text"
            placeholder='Categoria' />

          <button type='submit'>
            Cadastrar
          </button>

        </Container>

      </Modal>


    </>
  )

}