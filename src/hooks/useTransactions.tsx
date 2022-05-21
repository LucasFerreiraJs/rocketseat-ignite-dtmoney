import { ReactNode, createContext, useEffect, useState, useContext } from 'react'
import { api } from '../services/api';


interface ITransaction {
  id: number;
  title: string;
  type: string
  category: string;
  amount: number
  createdAt: string

}

// interface ITransactionInput {
//   title: string;
//   type: string
//   category: string;
//   amount: number
// }

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface TransactionsPtoviderProps {
  children: ReactNode; //aceita conteúdo válido do react (tsx, tag html..)
}

interface ITransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>

}


const TransactionsContext = createContext<ITransactionsContextData>({} as ITransactionsContextData)



export function TransactionsPtovider({ children }: TransactionsPtoviderProps) {

  const [transactions, setTransactions] = useState<ITransaction[]>([])


  useEffect(() => {
    api.get("/transactions")
      .then(response => setTransactions(response.data.transactions))
  }, []);


  async function createTransaction(transactionInput: ITransactionInput) {

    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })
    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }


  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}

    </TransactionsContext.Provider>

  )
}



export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}