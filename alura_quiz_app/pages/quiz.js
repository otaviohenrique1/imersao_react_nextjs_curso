/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import LoadingWidgetSpin from '../src/components/LoadingWidgetSpin';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        {/* [Desafio do Loading] */}
        <LoadingWidgetSpin />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;

  return (
    <>
      <Widget>
        <Widget.Header>
          {/* <BackLinkArrow href="/" /> */}
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h3>
        </Widget.Header>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          // src="https://placehold.it/400x400"
          src={question.image}
        />
        <Widget.Content>
          <h2>{question.title}</h2>
          <p>{question.description}</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          >
            {/* eslint-disable-next-line arrow-body-style */}
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `altenative__${alternativeIndex}`;
              return (
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                >
                  <input
                    // style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    type="radio"
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
          </form>
          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="button">Confirmar</Button>
        </Widget.Content>
      </Widget>
    </>
  );
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/otaviohenrique1" />
    </QuizBackground>
  );
}
