/* eslint-disable @typescript-eslint/no-unused-expressions */
import './App.css'
import './Schedule';
import Schedule from './Schedule';
"use client";



function App() {

    return (
        <div id="weeks" className="flex justify-center items-center min-h-screen" >
            <Schedule></Schedule>
      </div>
  )
}

export default App