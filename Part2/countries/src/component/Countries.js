import Country from "./Country";


const Countries =({ nations, setFilteredData }) => {

  if (nations.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (nations.length === 1) {
       return <Country nat_data={nations[0]}/>
  }

  return nations.map((nation) => {
    const { name: { common }, altSpellings } = nation
    return <p key={altSpellings[0]}>{common} <button onClick={() => { setFilteredData([].concat(nation)) }}>Show</button></p>
  })
}


export default Countries;