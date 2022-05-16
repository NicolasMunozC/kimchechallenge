import React from 'react'

function Country({data, groupingByContinent}) {

  const languages = (data.languages.map(language => language.name)).join(", ")

  return (
    <div className='countryBox'>
      <p>{data.emoji}</p>
      <h2>{data.name}</h2>
      <p>{languages}</p>
    </div>
  )
}

export default Country