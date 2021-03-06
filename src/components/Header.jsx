import NewExpense from './NewExpense'
import ControlBudget from './ControlBudget'

const Header = ({
  expenses, 
  setExpenses, 
  budget, 
  setBudget, 
  isValidBudget, 
  setIsValidBudget
}) => {

  return (
    <header>
      <h1>Expense planner</h1>
      
      {isValidBudget ? (
        <ControlBudget
          expenses={expenses}
          setExpenses={setExpenses}
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget} 
        />
      ) : (
        <NewExpense
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget} 
        />
      )}
     
    </header>
  )
}

export default Header
