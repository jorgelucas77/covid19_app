import React, { memo, useState, useCallback, useEffect } from 'react'
import Api from '../../api'
import Board from './components/Board'
import Panel from './components/Panel'
import { ContainerStyled } from './style'

function Main() {
  const [data, setData] = useState({})
  const [country, setCountry] = useState('portugal')
  const updateAt = new Date().toLocaleString()

  const getCovidData = useCallback((country) => {
    Api.getCountry(country)
      .then(data => setData(data))
  }, [])

  useEffect(() => {    
    getCovidData(country)
  }, [getCovidData, country])

  const handleChange = ({ target }) => {
    const country = target.value
    setCountry(country)
  }

  return (
    <ContainerStyled>
      <div className="mb-2">
        <Panel
          data={data}
          updateAt={updateAt}
          onChange={handleChange}
          country={country}
          getCovidData={getCovidData}
        />
      </div>
      <Board data={data} />
      <div className="xp-2"><p>Developed by: <b>Jorge Lucas</b></p></div>
    </ContainerStyled>
    
  )
}

export default memo(Main)
