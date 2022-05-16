import React from 'react'
import Country from './Country'
import { gql } from "apollo-boost";
import {useLazyQuery} from "@apollo/react-hooks"

const findCountriesByCode = gql`
query findCountriesByCode($codeToSearch: [String!]){
  countries(filter: {
    code: { in: $codeToSearch }
}){
  code
  name    
  continent{
    name
  }
  capital
  currency
  languages{
    code
    name
  }
  native
  phone
  emoji
  }
}
`

function Group({isSearching, groupingByContinent, searchedData}) {

  const [getCountriesByCode, {loading, data, error}] = useLazyQuery(findCountriesByCode)

  // un array variable donde se almacenara los titulos de los grupos por los cuales se ordenaran, ya sea continente o idioma
  let groupingData = []

  // obtiene la data segun una variable codigo que corresponde a los codigos de los paises buscados
  const getData = code =>{
    getCountriesByCode({variables: { codeToSearch : code}})
  }

  React.useEffect( ()=> {
    if(isSearching){
        getData(searchedData)

  }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedData])

  //Un "if" para saber si es que hay data encontrada con la busqueda, si es que la hay almacena el grupo con el cual se ordenaran, ya sea continente o idioma
  if(data){
    if(groupingByContinent){
      data.countries.map(country => groupingData.push(country.continent.name ))
      
    }else{
      data.countries.map(country => country.languages.map(languages => groupingData.push(languages.name)))

    }
    // remueve los datos duplicados del array, ya que los recorrio todos los posibles y los almaceno en el array
    groupingData = [...new Set(groupingData)];
  }

  if(error){
    console.log(error);
  }


  return (
    <div>
      { isSearching && (
        loading ?
        <p>Loading...</p>
        :
        (groupingByContinent ?
          groupingData.map(continent => (<div><h1>{continent}</h1>{data.countries.map(country => (country.continent.name === continent && <Country groupingByContinent={groupingByContinent} data={country}/>))}</div>))
          :
          groupingData.map(language => (<div><h1>{language}</h1>{data.countries.map(country => (country.languages.map( countryLanguage => (countryLanguage.name === language && <Country groupingByContinent={groupingByContinent} data={country}/>))))}</div>))
          )
      )
      }
    </div>
  )
}
export default Group