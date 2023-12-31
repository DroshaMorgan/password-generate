"use client";
import { useState } from "react";

export default function Home() {
  const [passwordGen, setPasswordGen] = useState({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [handleText, setHandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val: any) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

  function generatePassword() {
    const charSymbolsArray = Array.from(Array(10)).map((_, i) => i + 33);
    const charNumbersArray = Array.from(Array(10)).map((_, i) => i + 48);
    const allLettersArray = Array.from(Array(26)).map((_, i) => i + 97);

    const lowerCaseLetters = allLettersArray.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );
    const numbersArray = charNumbersArray.map((code) =>
      String.fromCharCode(code)
    );
    const symbolsArray = charSymbolsArray.map((code) =>
      String.fromCharCode(code)
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length: any,
      uppercase: any,
      lowercase: any,
      numbers: any,
      symbols: any
    ) => {
      const availableCharacters = [
        ...(uppercase ? upperCaseLetters : []),
        ...(lowercase ? lowerCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];

      const shuffleArray = (array: any) =>
        array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandleText(characters.join(""));

      const typeCheck = (type: any, typeArray: any) => {
        if (type) {
          if (
            characters.filter((element: any) => typeArray.includes(element))
              .length > 0
          ) {
            return characters;
          } else {
            generateTheWord(length, uppercase, lowercase, numbers, symbols);
          }
        }
      };

      typeCheck(symbols, symbolsArray);
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }
  return (
    <div className="wrapper">
      <div className="container wrapper-box">
        <h2>Password Generator</h2>
        <div className="password-box">
          <input
            type="text"
            value={handleText}
            placeholder=""
            autoComplete="off"
            onChange={(e) => setHandleText(e.target.value)}
          />
          <button
            className="copy-button"
            onClick={() => {
              if (handleText.length > 0) {
                navigator.clipboard.writeText(handleText);
                setCopied(true);
              }
            }}
          >
            {copied ? "Copied!" : "Copy text"}
          </button>
        </div>
        <br />
        <div className="word-criteria__box">
          <div>
            <label>Password length (4-20 symbols)</label>
          </div>
          <div className="flex">
            <input
              type="range"
              min="4"
              max="20"
              value={passwordGen.length}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
            <div className="ml-2 w-3">{passwordGen.length}</div>
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label>Include symbols</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={passwordGen.symbols}
              onChange={handleChangeSymbols}
            />
          </div>
        </div>
        <div>
          <button
            className="generate-button"
            onClick={() => (generatePassword(), setCopied(false))}
          >
            Generate password
          </button>
        </div>
      </div>
    </div>
  );
}
