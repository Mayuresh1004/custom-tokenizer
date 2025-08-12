import { useState, useEffect } from "react";
import "./App.css";
import { loadVocab, encode, decode } from "./utils/tokenizer";
import InputBox from "./components/InputBox";

function App() {
  const [tokens, setTokens] = useState([]);
  const [fromText, setFromText] = useState("");
  const [toTokens, setToTokens] = useState([]);
  const [decodedText, setDecodedText] = useState("");
  const [mode, setMode] = useState("encode");

  useEffect(() => {
    loadVocab().then(setTokens);
  }, []);

  const convert = () => {
    if (!tokens.length) return;
    if (mode === "encode") {
      const enc = encode(fromText, tokens);
      setToTokens(enc);
      setDecodedText(decode(enc, tokens));
    } else {
      try {
        const tokenArray = JSON.parse(fromText);
        const dec = decode(tokenArray, tokens);
        setDecodedText(dec);
        setToTokens(tokenArray);
      } catch {
        setDecodedText("Invalid token array");
      }
    }
  };

  const swapMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    clearAll();
  };

  const clearAll = () => {
    setFromText("");
    setToTokens([]);
    setDecodedText("");
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg)",
      }}
    >
      <div className="w-full max-w-md mx-auto min-h-[350px] border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 flex flex-col justify-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="flex flex-col flex-grow"
        >
          {/* Input */}
          <div className="w-full mb-3">
            <InputBox
              label={mode === "encode" ? "Text" : "Tokens (JSON array)"}
              value={fromText}
              onChange={setFromText}
              disabled={false}
              placeholder={
                mode === "encode"
                  ? "Enter text to encode"
                  : "Example : [1,2,3]"
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mb-3">
            <button
              type="button"
              className="border-2 border-white rounded-md bg-blue-600 text-white px-2 py-1"
              onClick={swapMode}
            >
              Switch to {mode === "encode" ? "Decode" : "Encode"}
            </button>

            <button
              type="button"
              className="border-2 border-white rounded-md bg-red-600 text-white px-2 py-1"
              onClick={clearAll}
            >
              Clear All
            </button>
          </div>

          {/* Output */}
          <div className="w-full mb-3 flex-grow">
            <InputBox
              label={mode === "encode" ? "Tokens" : "Decoded Text"}
              value={
                mode === "encode" ? JSON.stringify(toTokens) : decodedText
              }
              onChange={() => {}}
              disabled={true}
            />
          </div>

          {/* Convert */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
          >
            {mode === "encode" ? "Encode Text" : "Decode Tokens"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
