import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import QuestionsView from "../QuestionView/QuesitonsView";
import Cookies from "js-cookie";

const HomePage = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);

  const validCodes = [
    "AB12CD34",
    "EF56GH78",
    "IJ90KL12",
    "MN34OP56",
    "QR78ST90",
    "UV12WX34",
    "YZ56AB78",
    "CD90EF12"
  ]; // Array of valid codes

  useEffect(() => {
    const usedCode = Cookies.get("usedCode");
    if (usedCode) {
      setIsCodeInvalid(true);
    }
  }, []);
  
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform code verification logic here
    const isCorrect = validCodes.includes(code);

    setIsCodeCorrect(isCorrect);
    setIsCodeInvalid(!isCorrect);
    if (isCorrect) {
      console.log(isCorrect)
      Cookies.set("usedCode", code);
      router.push("/questions");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center text-black justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Model Code Verification</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg mb-4"
            placeholder="Enter code"
            required
          />
          {isCodeInvalid && (
            <p className="text-red-500 mb-2">Invalid code. Please try again.</p>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
  
  
  
};

export default HomePage;
