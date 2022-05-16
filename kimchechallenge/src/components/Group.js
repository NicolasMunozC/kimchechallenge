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
    <div className='resultContainer'>
      {!data && !searchedData && !loading ? <h2>We can not find what are you searching for...</h2> : null}
      { isSearching && (
        loading ?
        <div className='loading'>
          <p>Loading...</p>
        </div>
        :
        (groupingByContinent ?
          groupingData.map(continent => (<div><h1 className='groupName'>{continent}</h1><div className='countriesResult'>{data.countries.map(country => (country.continent.name === continent && <Country key={country.code} groupingByContinent={groupingByContinent} data={country}/>))}</div></div>))
          :
          groupingData.map(language => (<div><h1 className='groupName'>{language}</h1><div className='countriesResult'>{data.countries.map(country => (country.languages.map( countryLanguage => (countryLanguage.name === language && <Country key={country.code} groupingByContinent={groupingByContinent} data={country}/>))))}</div></div>))
          )
      )
      }
    </div>
  )
}
export default Group