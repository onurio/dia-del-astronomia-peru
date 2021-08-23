import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Trivia.scss';
import correct from '../../images/correcto.svg';
import incorrect from '../../images/incorrecto.svg';

export default function Trivia({ stand, fx }) {
  const [standQuestions, setStandQuestions] = useState([]);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [guessScreen, setGuessScreen] = useState({ on: false, correct: false });

  useEffect(() => {
    let answeredQuestions = userDetails.trivia[stand.id];
    let allQuestions = stand.trivia;
    if (answeredQuestions) {
      answeredQuestions.forEach((question) => {
        allQuestions = allQuestions.filter((q) => {
          if (q.q !== question) {
            return true;
          } else {
            return false;
          }
        });
      });
    }
    setStandQuestions(allQuestions);
  }, []);

  const onTry = (answer, question) => {
    if (answer.isCorrect) {
      fx('good');
      setGuessScreen({ on: true, correct: true });
      setTimeout(() => {
        setGuessScreen({ on: false, correct: false });
        setStandQuestions((s) => {
          let qs = [...s];
          qs.splice(0, 1);
          return qs;
        });
        let answeredIndexes = [];
        if (userDetails.trivia[stand.id]) {
          answeredIndexes = [...userDetails.trivia[stand.id]];
          answeredIndexes.push(question);
        }
        setUserDetails((s) => ({
          ...s,
          trivia: { ...s.trivia, [stand.id]: answeredIndexes },
          coins: s.coins + 3,
        }));
      }, 2000);
    } else {
      fx('bad');
      setGuessScreen({ on: true, correct: false });
      setTimeout(() => {
        setGuessScreen({ on: false, correct: false });
      }, 2000);
    }
  };

  if (standQuestions.length === 0) {
    return (
      <div className="content-container">
        <h2>Has respondido todas las preguntas!</h2>
      </div>
    );
  } else {
    let currentQ = standQuestions[0];
    return (
      <div className="content-container">
        <h3>Trivia</h3>
        <h4>{currentQ.q}</h4>
        {currentQ.a.map((a, index) => {
          return (
            <button
              disabled={guessScreen.on}
              key={a.text}
              onClick={() => onTry(a, currentQ.q)}
            >
              {a.text}
            </button>
          );
        })}
        {guessScreen.on && guessScreen.correct && (
          <div className="answer-info">
            <img src={correct} alt="Correcto!" />
            <p>Ganaste 3 monedas!</p>
          </div>
        )}
        {guessScreen.on && !guessScreen.correct && (
          <div className="answer-info">
            <img src={incorrect} alt="Incorrecto!" />
            <p>Trata otra vez!</p>
          </div>
        )}
      </div>
    );
  }
}
