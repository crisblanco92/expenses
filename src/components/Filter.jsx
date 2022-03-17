import {useEffect, useState} from 'react'

const Filter = ({filter, setFilter}) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
            <label>Filter expenses</label>
            <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
            >
                <option value="">-- All --</option>
                <option value="clay">Clay and materials</option>
                <option value="classes">Classes</option>
                <option value="website">Website</option>
                <option value="branding">Branding and packaging</option>
                <option value="kiln">Kiln hrs</option>
                <option value="miscelaneous">Miscelaneous</option>
                <option value="suscriptions">Suscriptions</option>
            </select>
        </div>
      </form>
    </div>
  )
}

export default Filter
