import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const questions = [
    { id: 1, text: "How satisfied are you with our products?", type: "rating", options: [1, 2, 3, 4, 5] },
    { id: 2, text: "How fair are the prices compared to similar retailers?", type: "rating", options: [1, 2, 3, 4, 5] },
    { id: 3, text: "How satisfied are you with the value for money of your purchase?", type: "rating", options: [1, 2, 3, 4, 5] },
    { id: 4, text: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { id: 5, text: "What could we do to improve our service?", type: "text" },
];

const Survey = () => {
    const [currentScreen, setCurrentScreen] = useState('welcome');
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [sessionId] = useState(uuidv4());
    const [isSubmitted, setIsSubmitted] = useState(false);

    const startSurvey = () => {
        setCurrentScreen('question');
    };

    const finishSurvey = async () => {
        setIsSubmitted(true);
        setCurrentScreen('thankYou');
        try {
            await fetch('http://localhost:5000/api/surveys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, answers, status: 'COMPLETED' })
            });
        } catch (error) {
            console.error('Error saving survey data:', error);
        }
        setTimeout(() => setCurrentScreen('welcome'), 5000); 
    };

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [questions[step].id]: value });
        setSelectedOption(value); 
    };

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
            setSelectedOption(null);
        } else {
            finishSurvey();
        }
    };

    const handlePrev = () => {
        if (step > 0) {
            setStep(step - 1);
            //setSelectedOption(null); //if required we can make previous question value also null
        }
    };

    const handleSkip = () => {
        handleNext();
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            {currentScreen === 'welcome' && (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Welcome to the Survey</h1>
                    <button 
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        onClick={startSurvey}
                    >
                        Start Survey
                    </button>
                </div>
            )}

            {currentScreen === 'question' && !isSubmitted && (
                <div className="text-center">
                    <h1 className="text-xl font-semibold mb-4">
                        Question {step + 1} of {questions.length}
                    </h1>
                    <p className="mb-4">{questions[step].text}</p>
                    {questions[step].type === 'rating' ? (
                        <div className="flex justify-center mb-4">
                            {questions[step].options.map(option => (
                                <button
                                    key={option}
                                    className={`px-3 py-2 rounded mx-1 ${selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-gray-300`}
                                    onClick={() => handleAnswer(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <textarea
                            className="w-full border border-gray-300 p-2 rounded"
                            rows="4"
                            onBlur={(e) => handleAnswer(e.target.value)}
                        />
                    )}
                    <div className="mt-4">
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded mx-2"
                            onClick={handlePrev}
                            disabled={step === 0}
                        >
                            Prev
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
                            onClick={handleSkip}
                        >
                            Skip
                        </button>
                        <button
                            className="bg-pink-500 text-white px-4 py-2 rounded mx-2"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {currentScreen === 'thankYou' && (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                    <p>We appreciate your feedback.</p>
                </div>
            )}
        </div>
    );
};

export default Survey;
