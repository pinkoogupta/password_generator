import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useREf hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrst";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#%^&*(){}~:?><";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
 
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select(); // this  is taking the reference to select the password to show to the user
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password); // this is very important
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md 
    rounded-lg px-4 my-8 text-orange-500 bg-gray-700"
      >
        <h1 className="text-while text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden md-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <lable>Length: {length}</lable>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

