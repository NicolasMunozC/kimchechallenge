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
// FALTA AGREGAR QUE CUANDO BUSQUE UN NOMBRE LA PRIMERA LETRAS SE HAGA MAYUSCULA INTERNAMENTE

function App() {
  const [continentButtonState, setContinentButtonState] = React.useState(true)
  const [searchCountry, setSearchCountry] = React.useState('')
  const [searchCodeCountry, setSearchCodeCountry] = React.useState([])
  const [isSearchingCountries, setIsSearchingCountries] = React.useState(false)

  const allCountriesBasic = useQuery(countriesBasic)

  //Un array que almacenara todos los codigos de cada pais autocompletado en la busqueda
  const searchedCodesCountries = []


  function filteringCountries(event) {
    //Almacena el valor buscado
    const newSearch = event.target.value
    setSearchCountry(newSearch)

    //Obtiene un array con todos los nombres de paises
    const allCountriesArray = allCountriesBasic.data.countries.map(country => country.name)

    //Obtiene un array con todos los posibles paises que se esta buscando. AUTOCOMPLETADO
    const autoCompletedCountries = allCountriesArray.filter(country => country.indexOf(newSearch) >-1)
        
    
    //Me entrega un array con cada objeto por pais autocompletado anteriormente
    const searchedCodesArray = autoCompletedCountries.map(eachCountry => allCountriesBasic.data.countries.filter(country => country.name === eachCountry))
    
    // "For" para dejar una array solo con los codigos de los paises buscados
    for (let i = 0; i < searchedCodesArray.length; i++) {
      const [code] = searchedCodesArray[i]
      searchedCodesCountries.push(code.code)
      setSearchCodeCountry(searchedCodesCountries)

      if(newSearch.length < 3) {
        setIsSearchingCountries(false)
      }
      if(newSearch.length >= 3){ 
        setIsSearchingCountries(true)
      }
    }


  }

  return (
    <div>
    <h1>Country Search</h1>
    <p>Hi! :) Please write something below...</p>
    <input type='text' autoFocus value={searchCountry} onChange={filteringCountries} placeholder={isSearchingCountries === false ? "Please write something..." : ""}></input>
    <p>Group by:</p>
    <button className={continentButtonState === true ? "active" : ''} onClick={()=>{setContinentButtonState(!continentButtonState)}}>Continent</button>
    <button className={continentButtonState === false ? "active" : ''} onClick={()=>{setContinentButtonState(!continentButtonState)}}>Language</button> <br/>
    <Group isSearching={isSearchingCountries} groupingByContinent={continentButtonState} searchedData={searchCodeCountry}/>

    </div>
  )
}

export default App