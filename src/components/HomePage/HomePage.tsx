import React, { useState } from "react";
import { useRouter } from "next/router";
import QuestionsView from "../QuestionView/QuesitonsView";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform code verification logic here
    const isCorrect = validCodes.includes(code);

    setIsCodeCorrect(isCorrect);
    setIsCodeInvalid(!isCorrect);

    if (isCorrect) {
      router.push("/questions"); // Navigate to the questions page
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center text-black justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Model Code Verification</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
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
