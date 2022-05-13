import React from "react";
import "./App.css";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks"

const allCountries = gql`
query {
  countries{
    name
    continent{
      name
    }
    languages{
      code
      name
    }
  }
}
`

function App() {
  const [searchCountry, setSearchCountry] = React.useState('')

  const {data, error, loading} = useQuery(allCountries)

  if(error){
    console.log(error);
  }

  return (
    <>
    <h1>Country Search</h1>
    <p>Hello my friend! :) Please write something below...</p>
    <input type='text' autoFocus value={searchCountry} onChange={(e)=>{setSearchCountry(e.target.value)}}></input>
    <p>Group by:</p>
    <button>Continent</button>
    <button>Language</button> <br/>
    {error && <span>Ops! There is a problem finding the information, please try again later...</span>}
    {loading ? <span>Loading...</span> : 
      <ul>
        { 
            data.countries.map(country => <li key={country.name}>{country.name}</li>)
        }
      </ul>
    }

    </>
  )
}

export default App