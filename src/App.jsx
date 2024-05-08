import { useState, useCallback, useEffect, useRef} from 'react'



function App() {
  
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if(numberAllow) str+="0123456789"
    if(charAllow) str+="`~!@#$%^&*()_-+=:;[]{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
     pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numberAllow, charAllow, setPassword])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
    
  }, [length, numberAllow, charAllow, passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-80 text-orange-600 bg-gray-800 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow roudned-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 rounded-lg px-3"
          placeholder='password' 
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='{my} outline-none bg-blue-700  rounded-lg mx-1 text-white px-3 py-0.5 shrink-0 hover:bg-sky-400 hover:text-black'>
            copy
          </button>

        </div>
          <div className ="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-2"><input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer' 
            onChange={(e) =>{
              setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-2'>
                <input type="checkbox"
                defaultChecked ={numberAllow}
                id="numberInput" 
                onChange={()=>{
                  setNumberAllow((prev) =>! prev);
                }}
                />
                <label htmlFor="numberInput">Numbers</label>
  

            </div>
            <div className='flex items-center gap-x-2'>
              <input type="checkbox"
              defaultChecked={charAllow}
              id='charInput'
              onChange={() =>{
                setCharAllow((prev) => !prev)
              }}
              />
              <label htmlFor="charInput">Characters</label>
            </div>

          </div>
      </div>
    </>
  )
}

export default App
