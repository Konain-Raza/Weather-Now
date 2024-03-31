import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Weather from './Components/Weather'
import Searchbar from './Components/Searchbar'

function App() {
  return (
    <div className='w-full h-full'>
      <Weather/>
    </div>
  )
}

export default App