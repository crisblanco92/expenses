import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Filter from './components/Filter'
import ExpenseList from './components/ExpenseList'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generateId } from './helpers'

function App() {
  const [expenses, setExpenses] = useState( 
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  ) 

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  ) 
  const [isValidBudget, setIsValidBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if(Object.keys(editExpense).length > 0){
      setModal(true)
  
      setTimeout(() => {
        setAnimateModal(true)
      }, 500)
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])  
  }, [expenses])

  //escuchando los cambios en FILTER
  useEffect(() => {
    if(filter) {
      //filtrar gastos por categoria
      const filteredExpenses = expenses.filter(exp => exp.category === filter)
      setFilteredExpenses(filteredExpenses)
      
    }
  }, [filter])

  //EJECUTA 1 vez cuando carga la app
  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget', budget)) ?? 0 

    if(budgetLS > 0) {
      setIsValidBudget(true) 
    }
  }, [])
  

  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const saveExpense = exp => {
    console.log('gasto:', exp)
    if(exp.id) {
      //Actualizar
      const updatedExpenses = expenses.map(expState => expState.id === exp.id ? exp : expState) 
      setExpenses(updatedExpenses)
      setEditExpense({}) 
    } else {
      //new expense
      exp.id = generateId()
      exp.date = Date.now()
      setExpenses([...expenses, exp])
    }
    //animacion
    setAnimateModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter(item => item.id !== id)

    setExpenses(updatedExpenses)
  }


  return (
   <div className={modal ? 'fijar' : ''}>
    <Header
      expenses={expenses}
      setExpenses={setExpenses}
      budget={budget}
      setBudget={setBudget}
      isValidBudget={isValidBudget}
      setIsValidBudget={setIsValidBudget}
    />

    {isValidBudget && (
      <>
        <main>
          <Filter
            filter={filter}
            setFilter={setFilter}
          />
          <ExpenseList
            expenses={expenses}
            setEditExpense={setEditExpense}
            deleteExpense={deleteExpense}
            filter={filter}
            filteredExpenses={filteredExpenses}
          />
        </main>
        <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto} 
              alt="Icono nuevo gasto"
              onClick={handleNewExpense}
              />
        </div>
      </>
    )}

    {modal && 
      <Modal 
        setModal={setModal}
        animateModal={animateModal}
        setAnimateModal={setAnimateModal}
        saveExpense={saveExpense}
        editExpense={editExpense}
        setEditExpense={setEditExpense}
    />}

   </div>
  )
}

export default App
