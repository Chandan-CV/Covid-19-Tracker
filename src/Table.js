import React from 'react'
import './Table.css'
function Table({ countries }) {
    return (
        <div className="table">
       {
           countries.map((country)=>(
              <tr>
              <td>{country.country}</td>
              <td ><strong>{Intl.NumberFormat('en').format(country.cases)}</strong></td>
                    
              </tr> 
           ))
       }
      </div>
    )
}

export default Table
