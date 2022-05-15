import React from 'react'
import Country from './Country'
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery} from "@apollo/react-hooks"

const allCountries = gql`
query {
  countries{
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

function Group({groupingByContinent, continentsData, languagesData, searchedData}) {

    const allCountriesData = useQuery(allCountries)


  return (
    <div>
        {groupingByContinent ? 
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
        }
    </div>
  )
}
export default Group