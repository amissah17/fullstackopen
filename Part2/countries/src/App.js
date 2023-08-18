import axios from 'axios'
import { useEffect, useState } from 'react';
import Countries from './component/Countries';

function App() {
  const [resData, setResData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  const req = async () => {
    await axios.get(baseURL)
      .then(res => {
        setResData(res.data)
      })
  }
  useEffect(()=>{req()}, [])

  const filterData = (value) => {
    const searchStr = new RegExp(value, "i")
    if(value === ''){setFilteredData([]); return}
    
    setFilteredData(resData.filter((country) => {
      return (country.name.official.match(searchStr) || country.name.common.match(searchStr))
    }))
  }

  return (
    <div>
      Find countries <input name='search_country' onChange={(e) => { filterData(e.target.value) }} placeholder='Enter country name'/>
      <Countries nations={filteredData} setFilteredData={setFilteredData} />
    </div>
  );
}

export default App;
