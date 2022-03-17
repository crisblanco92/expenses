import React from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import {formatDate} from '../helpers'

import ClayIcon from '../img/icono_ahorro.svg'
import ClassesIcon from '../img/icono_casa.svg'
import WebsiteIcon from '../img/icono_comida.svg'
import BrandingIcon from '../img/icono_gastos.svg'
import KilnIcon from '../img/icono_ocio.svg'
import MiscIcon from '../img/icono_salud.svg'
import SuscIcon from '../img/icono_suscripciones.svg'

const iconLibrary = {
    clay: ClayIcon,
    classes: ClassesIcon,
    website: WebsiteIcon,
    branding: BrandingIcon,
    kiln: KilnIcon,
    miscelaneous: MiscIcon,
    suscriptions: SuscIcon
}

const Expense = ({exp, setEditExpense, deleteExpense}) => {
  const {category, name, qty, date, id} = exp

  const leadingActions = () => ( //cambio las {} por () que quiere decir un return. es decir, muestra el siguiente componente
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(exp)}>
        Edit
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={()=> deleteExpense(id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
              <img 
                src={iconLibrary[category]} //al poner aqui que muestre la categoria del array, escribira ej. 'clay', entonces ira a clay y pintara el clay icon
                alt="Expense icon" 
              
              />
              <div className="descripcion-gasto">
                <p className="categoria">{category}</p>
                <p className="nombre-gasto">{name}</p>
                <p className="fecha-gasto">
                    Added on: {''}
                    <span>{formatDate(date)}</span>
                </p>
              </div>
          </div>
              <p className="cantidad-gasto">{qty}€</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense
 