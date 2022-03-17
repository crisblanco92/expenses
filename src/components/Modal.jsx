import { useState, useEffect } from 'react'
import IconCerrar from '../img/cerrar.svg'
import Message from './Message'

const Modal = ({
    setModal, 
    animateModal, 
    setAnimateModal, 
    saveExpense, 
    editExpense,
    setEditExpense
}) => {

    const [name, setName] = useState('')
    const [qty, setQty] = useState('')
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    const [date, setDate] = useState('')
    const [id, setId] = useState('')

    //con este useEffect vamos a comprobar si el registro viene vacio (por lo que seria nuevo) o si viene lleno(por lo que lo estariamos editando)
    //utilizamos la misma logica que en el de app.js
    useEffect(() => { 
        if(Object.keys(editExpense).length > 0){
            //si estamos editando, llenamos los campos con los hooks
            setName(editExpense.name)
            setQty(editExpense.qty)
            setCategory(editExpense.category)
            setDate(editExpense.date)
            setId(editExpense.id)
        }
    }, [])

    const hideModal = () => {
        //tengo q volver el modal a false para que la animacion suceda de nuevo al cerrar-abrir again. les agrego una pequeña transicion
        //tambien desaparece el Modal de la lista de componentes
        setAnimateModal(false)
        setEditExpense({}) //limpiar el state cuando se cierre el modal despues de que se llena al editarlo
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([name, qty, category].includes('')) {
            setMessage('all fields are mandatory')
            
            setTimeout(() => {
                setMessage('')
            }, 3000);
            return
        }
        saveExpense({name, qty, category, date, id})
    }


  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={IconCerrar} 
                alt="cerrar modal"
                onClick={hideModal}
            />
        </div>
        {/* si animateModal es true, agregar clase .animar */}
        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animateModal ? "animar" : ''}`}
        >
            {/* Si existe la propiedad editExpense.name, quiere decir que estoy editando, por lo que voy a condicionar al titulo del modal */}
            <legend>{editExpense.name ? 'Edit Expense' : 'New Expense'}</legend>
            {message && <Message tipo="error">{message}</Message>}

            <div className="campo">
                <label htmlFor="name">Expense name</label>
                <input 
                    id="name"
                    type="text" 
                    placeholder="Add a expense name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="campo">
                <label htmlFor="quantity">Quantity</label>
                <input 
                    id="quantity"
                    type="number" 
                    placeholder="Add expense quantity: i.e 200"
                    value={qty}
                    onChange={e => setQty(Number(e.target.value))}
                />
            </div>
            <div className="campo">
                <label htmlFor="category">Category</label>
                <select 
                    id="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">-- Select --</option>
                    <option value="clay">Clay and materials</option>
                    <option value="classes">Classes</option>
                    <option value="website">Website</option>
                    <option value="branding">Branding and packaging</option>
                    <option value="kiln">Kiln hrs</option>
                    <option value="miscelaneous">Miscelaneous</option>
                    <option value="suscriptions">Suscriptions</option>
                </select>
            </div>
            <input 
                type="submit"
                value={editExpense.name ? 'Save changes' : 'Add Expense'}
            />
        </form>
    </div>
  )
}

export default Modal
