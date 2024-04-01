import React from 'react'
import "./styles.css";
function SplashScreen() {
  return (
  
    <div id="app-splash" >
      <div class="app-loader">
        <div class="global-loader-container">
            <div class="global-loader">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
            </div>
        </div>
        <h1 id='splashtext' className='text-4xl font-bold p-2 '>Weather Now</h1>
              </div>
      </div>
  )
}

export default SplashScreen;