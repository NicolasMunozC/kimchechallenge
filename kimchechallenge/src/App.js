import React from "react";
import "./App.css";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks"
import Group from "./components/Group";

const countriesBasic = gql`
query {
  countries{
    name    
    code
  }
}
`

function App(){
  const [continentButtonState, setContinentButtonState] = React.useState(true)
  const [searchCountry, setSearchCountry] = React.useState('')
  const [searchCodeCountry, setSearchCodeCountry] = React.useState([])
  const [isSearchingCountries, setIsSearchingCountries] = React.useState(false)
  const allCountriesBasic = useQuery(countriesBasic)

  //Un array que almacenara todos los codigos de cada pais autocompletado en la busqueda
  const searchedCodesCountries = []

  
  //Funcion que filtrara los paises segun lo que se esta buscando en el input
  function filteringCountries(event) {

    //Almacena el valor buscado y lo normaliza dejando la primera letra mayuscula y las demas minusculas
    const newSearch = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase()
    setSearchCountry(newSearch)

    if(newSearch.length < 2) {
      setIsSearchingCountries(false)
    }

    if(newSearch.length >= 2){ 
      setIsSearchingCountries(true)

      //Obtiene un array con todos los nombres de paises
      const allCountriesArray = allCountriesBasic.data.countries.map(country => country.name)

      //Obtiene un array con todos los posibles paises que se esta buscando. (AUTOCOMPLETADO)
      const autoCompletedCountries = allCountriesArray.filter(country => country.indexOf(newSearch) >-1)

      //Resetea el listado si es que no encontro posibles paises en el autocompletado
      if(autoCompletedCountries.length <= 0){
        setSearchCodeCountry(null)
      }
    
      //Entrega un array con cada objeto por pais autocompletado anteriormente
      const searchedCodesArray = autoCompletedCountries.map(eachCountry => allCountriesBasic.data.countries.filter(country => country.name === eachCountry))
    
      // "For" para dejar una array solo con los codigos de los paises buscados
      for (let i = 0; i < searchedCodesArray.length; i++) {
        const [code] = searchedCodesArray[i]
        searchedCodesCountries.push(code.code)
        setSearchCodeCountry(searchedCodesCountries)
      }

    }

  }

  return (
    <div className="mainContainer">
      <div className="searchingContainer">
        <h1>Country Search</h1>
        <p>Hi! :) Type something below...</p>
        <input type='text' autoFocus value={searchCountry} onChange={filteringCountries} placeholder={isSearchingCountries === false ? "Search..." : ""}></input>
        <p>Group by:</p>
        <button className={continentButtonState === true ? "active" : ''} onClick={()=>{setContinentButtonState(!continentButtonState)}}>Continent</button>
        <button className={continentButtonState === false ? "active" : ''} onClick={()=>{setContinentButtonState(!continentButtonState)}}>Language</button> <br/>
      </div>
    <Group isSearching={isSearchingCountries} groupingByContinent={continentButtonState} searchedData={searchCodeCountry}/>
    <span className="footer">Made in <span aria-label="CL" role={"img"}>🇨🇱</span> with <span aria-label="hearth" role="img">❤️</span></span>
    </div>
  )
}

export default App