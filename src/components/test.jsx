import React from 'react'

function test() {
    const url = 'https://api.themoviedb.org/3/genre/tv/list?language=en';
    const options = {method: 'GET', headers: {accept: 'application/json'}};

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url, options)
        const data = await response.json()
      console.log(data)
    }
    getData()
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default test
