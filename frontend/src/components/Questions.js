import React, { useState } from 'react';

const Questions = ({ question, onNext, onPrev, onSkip, questionIndex, totalQuestions, onAnswer }) => {
    const [answer, setAnswer] = useState('');

    const handleAnswer = (e) => {
        setAnswer(e.target.value);
        onAnswer(e.target.value);
    };

    return (
        <div className="survey-question">
            <h2>Question {questionIndex + 1}/{totalQuestions}</h2>
            <p>{question.text}</p>
            {question.type === 'rating' ? (
                <div>
                    {question.options.map(option => (
                        <button key={option} onClick={() => setAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <textarea onChange={handleAnswer} value={answer} />
            )}
            <div>
                <button onClick={onPrev} disabled={questionIndex === 0}>Prev</button>
                <button onClick={onSkip}>Skip</button>
                <button onClick={onNext} disabled={!answer}>Next</button>
            </div>
        </div>
    );
};

export default Questions;
