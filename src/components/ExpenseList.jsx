import Expense from "./Expense"

const ExpenseList = ({expenses, setEditExpense, deleteExpense, filter, filteredExpenses}) => {
  return (
    <div className="listado-gastos contenedor sombra">
     

      { 
        filter ? (
          <>
           <h2>{filteredExpenses.length ? 'Expenses' : 'There are no expenses in this category'}</h2>
            {filteredExpenses.map(exp => (
              <Expense 
                key={exp.id}
                exp={exp}
                setEditExpense={setEditExpense}
                deleteExpense={deleteExpense}
              />
            ))}
          </>
        ) : (
          <>
           <h2>{expenses.length ? 'Expenses' : 'There are no expenses registered yet'}</h2>
            {expenses.map(exp => (
              <Expense 
                key={exp.id}
                exp={exp}
                setEditExpense={setEditExpense}
                deleteExpense={deleteExpense}
              />
            ))}
          </>
        )
      }     
    </div>
  )
}

export default ExpenseList
