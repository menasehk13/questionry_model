import React, { useState, useEffect } from "react";
import { questions } from "../Data/QuestionModel1";
import Image from "next/image";

const QuestionsView = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(180 * 60);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      handleTimerEnd();
    }

    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      handleTimerEnd();
    }
  }, [timer]);

  useEffect(() => {
    shuffleQuestions();
  }, []);

  const shuffleQuestions = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffledQuestions);
    setQuestionIndex(0);
    setUserAnswers([]);
    setSelectedOption("");
  };

  const handleAnswer = (event) => {
    setSelectedOption("");
    const optionLabel = event.target.value;
    const optionValue = optionLabel.charAt(0);

    setSelectedOption(optionValue);

    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[questionIndex] = optionValue;
    setUserAnswers(updatedUserAnswers);
  };

  const handleNext = () => {
    if (questionIndex < shuffledQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption("");
    } else {
      setShowResultModal(true);
    }
  };

  const handleTimerEnd = () => {
    setShowResultModal(true);
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
    shuffleQuestions();
    setTimer(180 * 60);
  };

  const calculateResult = () => {
    let score = 0;
    let answeredQuestions = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
        score++;
      }
      if (userAnswers[i] !== undefined) {
        answeredQuestions++;
      }
    }
    return { score, answeredQuestions };
  };

  const currentQuestion = shuffledQuestions[questionIndex];
  const { score, answeredQuestions } = calculateResult();
  const totalQuestions = questions.length;
  const passPercentage = 50;
  const isPass = (score / totalQuestions) * 100 >= passPercentage;
  const unansweredQuestions = totalQuestions - answeredQuestions;

  return (
    <div className="bg-gray-200 min-h-screen px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-4 text-center">Model Exam Test</h1>
      <div className="max-w-[70rem] mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <div className="flex flex-wrap md:space-x-2 mb-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded ${
                  userAnswers[index] ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span className="text-xs text-white flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="md:ml-auto mb-4 md:mb-0">
            <div className="bg-blue-500 text-white px-3 py-1 rounded">
              {Math.floor(timer / 3600)}:
              {Math.floor((timer % 3600) / 60).toString().padStart(2, "0")}:
              {(timer % 60).toString().padStart(2, "0")}
            </div>
          </div>
        </div>
        {currentQuestion && (
          <div className="border border-black p-4">
            <p className="text-base font-bold mt-4 mb-6">{currentQuestion.question}</p>
            {currentQuestion.image && (
              <div className="mb-4">
                <Image
                  src={currentQuestion.image}
                  alt="Question Image"
                  className="object-contain"
                  width={300}
                  height={300}
                />
              </div>
            )}
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <label
                  className="flex items-center space-x-2 cursor-pointer"
                  key={option}
                >
                  <input
                    type="radio"
                    value={option}
                    checked={userAnswers[questionIndex] === option.charAt(0)}
                    onChange={handleAnswer}
                    className="form-radio h-4 w-4"
                    key={option}
                  />
                  <span
                    className={`text-lg ${
                      selectedOption === option.charAt(0) ? "font-bold" : ""
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleNext}
                disabled={userAnswers[questionIndex] === undefined}
                className={`px-4 py-2 bg-blue-500 text-white rounded ${
                  userAnswers[questionIndex] === undefined
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                {questionIndex === questions.length - 1 ? "Confirm Answer" : "Next Question"}
              </button>
            </div>
          </div>
        )}
      </div>
  
      {showResultModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 text-center">
            {timer === 0 ? (
              <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
            ) : (
              <h2 className="text-2xl font-bold mb-4">Exam Result</h2>
            )}
            <p className="text-5xl font-bold mb-4">
              Your Score: {score}/{totalQuestions}
            </p>
            {unansweredQuestions > 0 && (
              <p className="text-lg mb-4">
                Unanswered Questions: {unansweredQuestions}
              </p>
            )}
            {timer === 0 ? (
              <p className="text-lg mb-4">
                The timer has ended. <br />
                <span
                  className={`text-xl mb-4 ${
                    isPass ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPass
                    ? "\n Congratulations! You passed the exam."
                    : "Sorry, you failed the exam."}
                </span>
              </p>
            ) : (
              <p
                className={`text-xl mb-4 ${
                  isPass ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPass
                  ? "Congratulations! You passed the exam."
                  : "Sorry, you failed the exam."}
              </p>
            )}
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retake Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default QuestionsView;
