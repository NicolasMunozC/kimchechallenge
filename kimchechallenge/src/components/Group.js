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

function Group({isSearching, groupingByContinent, searchedData}) {

  const [getCountriesByCode, {loading, data, error}] = useLazyQuery(findCountriesByCode)
  const groupingData = []

  const getData = code =>{
    getCountriesByCode({variables: { codeToSearch : code}})
  }

  React.useEffect( ()=> {
    if(isSearching){
        getData(searchedData)

  }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedData])

  if(data){
    if(groupingByContinent){
      data.countries.map(country => groupingData.push(country.continent.name ))
    }else{
      data.countries.map(country => country.languages.map(languages => groupingData.push(languages.name)))

    }
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
          groupingData.map(language => (<div><h1>{language}</h1>{data.countries.map(country => (country.language.name === language && <Country groupingByContinent={groupingByContinent} data={country}/>))}</div>))
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