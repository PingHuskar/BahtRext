import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BahtRext from './Functions/BahtRext';

function App() {
  const [num, setNum] = useState(localStorage.getItem(`num`) || 0)

  return (
    <div className="App">
      <h1>BahtRext</h1>
      <div className="output">
        {BahtRext(num.toString())}
      </div>
      <div className="">
        <input type="text" onChange={(e) => {
          e.preventDefault()
          localStorage.setItem(`num`,e.currentTarget.value)
          setNum(localStorage.getItem(`num`)!)
          toast.dismiss()
        }} value={num} />
      </div>
      <div className="">
      <button onClick={(e) => {
          e.preventDefault()
          navigator.clipboard.writeText(BahtRext(num.toString()))
          toast.dismiss()
          toast(`คัดลอก ${BahtRext(num.toString())}`,{
            toastId: `copy`
          })
        }}>Copy</button>
      </div>
      <a href="https://chrome.google.com/webstore/detail/bahtrext/fdehdmggnbjkonaiimejflhddmdgepgd" target="_blank" rel="noopener noreferrer">
        visit chrome web store
      </a>
      <ToastContainer limit={7} />
    </div>
  )
}

export default App
