import React from 'react'

function Country({data, groupingByContinent}) {

  // Constante para que una los lenguages para cuando son mas de 1 en el mismo pais
  const languages = (data.languages.map(language => language.name)).join(", ")

  return (
    <div className='countryBox'>
      <p>{data.emoji}</p>
      <h2>{data.name}</h2>
      {groupingByContinent ? <p>{"Language(s): " + languages}</p> : <p>{"Continent: " + data.continent.name}</p>}
      <p>{"Capital: " + data.capital}</p>
      <p>{"Currency: " + data.currency}</p>
      <p>{"Native: " + data.native}</p>
      <p>{"Phone code: +" + data.phone}</p>
      
    </div>
  )
}

export default Country