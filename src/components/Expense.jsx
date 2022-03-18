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

import ClayIcon from '../img/clay.png'
import ClassesIcon from '../img/classes.png'
import WebsiteIcon from '../img/website.png'
import BrandingIcon from '../img/branding.png'
import KilnIcon from '../img/kiln.png'
import MiscIcon from '../img/misc.png'
import SuscIcon from '../img/subscription.png'

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

  const leadingActions = () => ( 
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
        Delete
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gastos">
          <div className="contenido-gasto">
              <img 
                src={iconLibrary[category]} 
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
 