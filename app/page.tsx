"use client";
import { useState } from "react";

export default function Home() {
  const [passwordGen, setPasswordGen] = useState({
    length: 10,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [handleText, setHandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

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
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
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
      return characters;
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
            <label>Include uppercase letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={passwordGen.uppercase}
              onChange={handleChangeUppercase}
            />
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label>Include lowercase letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={passwordGen.lowercase}
              onChange={handleChangeLowercase}
            />
          </div>
        </div>
        <div className="word-criteria__box">
          <div>
            <label>Include numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={passwordGen.numbers}
              onChange={handleChangeNumbers}
            />
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
