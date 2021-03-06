import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlBudget = ({expenses, setExpenses, budget, setBudget, setIsValidBudget}) => {

const [porcentaje, setPorcentaje] = useState(0)

const [available, setAvailable] = useState(0)
const [spent, setSpent] = useState(0)

useEffect(() => {
    const totalSpent = expenses.reduce((total, exp) => exp.qty + total, 0) 
    const totalAvailable = budget - totalSpent

    //calcular porcentaje gastado
    const newPorcentaje = (((budget - totalAvailable) / budget) * 100).toFixed(2)
    
    setSpent(totalSpent)
    setAvailable(totalAvailable)

    setTimeout(() => {
        setPorcentaje(newPorcentaje)
    }, 1500);
}, [expenses])

const formatQuantity = (qty) => {
    return qty.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}

const handleResetApp = () => {
    const result = confirm('Are you sure?')
    if (result) {
        setExpenses([])
        setBudget(0)
        setIsValidBudget(false)
    } 
}

return (
<div className="contenedor-presupuesto contenedor sombra dos-columnas">
    <div>
        <CircularProgressbar
            styles={buildStyles({
                pathColor: porcentaje > 100 ? '#DC2626' : '#ac88be',
                trailColor: '#e6d1f0',
                textColor: porcentaje > 100 ? '#DC2626' : '#ac88be'
            })}
            value={porcentaje}
            text={`${porcentaje}% spent`}
        />
    </div>
    <div className="contenido-presupuesto">
        <button 
            className="reset-app"
            type="button"
            onClick={handleResetApp}
        >
            Reset App
        </button>
        <p>
            <span>Budget:</span> {formatQuantity(budget)}
        </p>

        <p className={`${ available < 0 ? 'negativo' : '' }`}>
            <span>Available:</span> {formatQuantity(available)}
        </p>

        <p>
            <span>Spent:</span> {formatQuantity(spent)}
        </p>

    </div>
</div>
)
}

export default ControlBudget
