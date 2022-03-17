import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Filter from './components/Filter'
import ExpenseList from './components/ExpenseList'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generateId } from './helpers'

function App() {
  const [expenses, setExpenses] = useState( //al iniciarse con array vacio tenemos acceso a .reduce o .map
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  ) //primero comprobamos q exista expenses en LS, si no entonces inicia como [] vacio, pero si existe inicia con lo que haya en LS convertido en []

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  ) //seteamos este valor inicial por lo que haya en LS, y si no hay nada, que sea 0
  const [isValidBudget, setIsValidBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if(Object.keys(editExpense).length > 0){
      //pego el mismo codigo de handleNewExpense de abajo pero sin la parte que vacia el objeto
      setModal(true)
  
      setTimeout(() => {
        setAnimateModal(true)
      }, 500)
    }
  }, [editExpense]) //Esto revisa que editExpense tenga algo

  //ejecuta cuando cambie el presupuesto
  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  //ejecuta cuando cambie gastos
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? []) //los gastos son un [], por lo que hay que convertirlo en string. 
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
      setIsValidBudget(true) //si hay algo en LS, renderizar directamente la grafica
    }
  }, [])
  

  //añadir nuevo gasto con modal
  const handleNewExpense = () => {
    setModal(true)
    //devolver el modal a objeto vacio
    setEditExpense({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const saveExpense = exp => {
    console.log('gasto:', exp)
    if(exp.id) {
      //Actualizar
      const updatedExpenses = expenses.map(expState => expState.id === exp.id ? exp : expState) //? devuelve el exp actualizado con el id, en caso contrario devuelve el nuevo
      setExpenses(updatedExpenses)
      setEditExpense({}) //limpiar el state cuando se cierre el modal despues de que se llena al editarlo
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
    //este filter me va a traer todos los registros diferentes al id que le estoy pasando, acumulados en updatedExpenses
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
