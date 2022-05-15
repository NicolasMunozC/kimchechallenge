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
    emoji
  }
}
`

function Group({isSearching, groupingByContinent, continentsData, languagesData, searchedData}) {

  const [getCountriesByCode, {loading, data, error}] = useLazyQuery(findCountriesByCode)

  const getData = code =>{
    getCountriesByCode({variables: { codeToSearch : code}})
  }

  React.useEffect( ()=> {
    if(isSearching){
      console.log(searchedData);
        getData(searchedData)

  }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedData])

  if(loading){
    console.log("Estamos preparando la informacion");
  }
  if(data){
    console.log(data.countries);
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
          <h1>Continent</h1>
          :
          <h1>Language</h1>
          )
      )
      }
        {/* {isSearching && (
        groupingByContinent ? 
        continentsData.continents.map(
            continent => 
            <div>
            <h1>{continent.name}</h1>
            <Country groupingBy={groupingByContinent} groupName={continent.name} searchedData={searchedData}/>
            </div>
        )
        : 
        languagesData.languages.map(
            language =>
            <div>
            <h1>{language.name}</h1>
            <Country groupingBy={groupingByContinent} groupName={language.name} searchedData={searchedData}/>
            </div>
        )
        )
        } */}
    </div>
  )
}
export default Group