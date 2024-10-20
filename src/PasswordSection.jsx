import { useState, useCallback, useEffect, useRef } from "react";

export default function PasswordSection() {
  const [password, setPassword] = useState("Muhammad");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [chrAllowed, setChrAllowed] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (chrAllowed) str += "!@#$%^&*-_+=[]{}~`";
    // "!#$%&'()*+,-./:;<=>?@[]^_`{|}~"

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * str.length);
      // console.log(index);
      pass += str[index];
      console.log(str.charAt([index]));
    }

    setPassword(pass);
  }, [length, numberAllowed, chrAllowed, setPassword]);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, chrAllowed, setPassword]);

  return (
    <div className="container mx-auto">
      <div className="min-h-60 max-w-[600px] bg-slate-600 border-4 border-indigo-700 rounded-2xl mx-auto mt-8 p-5 flex flex-col justify-center">
        {/* Input And Copy Section */}
        <label htmlFor="" className="flex items-center gap-2">
          <input
            ref={passwordRef}
            type="text"
            className="input input-bordered w-full bg-gray-500 text-white text-xl"
            readOnly
            value={password}
          />
          <button
            onClick={copyPassword}
            className="btn btn-primary text-xl text-white"
          >
            Copy
          </button>
        </label>
        <br />
        {/* Dependency Section */}
        <div className="flex items-center gap-5">
          {/* Length */}
          <label
            htmlFor="length"
            className="flex items-center text-xl gap-2 text-teal-500 accent-teal-500"
          >
            <input
              onChange={(e) => setLength(e.target.value)}
              className=""
              type="range"
              name="length"
              id="length"
              value={length}
              min={8}
              max={60}
            />
            Length : ({length})
          </label>
          {/* Numbers */}
          <label
            htmlFor="numbers"
            className="flex items-center text-xl gap-2 text-teal-500 accent-teal-500"
          >
            <input
              onChange={() => setNumberAllowed(!numberAllowed)}
              className="bg-red-500"
              type="checkbox"
              name="numbers"
              id="numbers"
              value={numberAllowed}
            />
            Number
          </label>
          {/* Characters */}
          <label
            htmlFor="characters"
            className="flex items-center text-xl gap-2 text-teal-500 accent-teal-500"
          >
            <input
              onChange={() => setChrAllowed(!chrAllowed)}
              className="bg-red-500"
              type="checkbox"
              name="characters"
              id="characters"
              value={chrAllowed}
            />
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}
