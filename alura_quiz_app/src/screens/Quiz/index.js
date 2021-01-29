/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

// import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import GitHubCorner from '../../components/GitHubCorner';
import Button from '../../components/Button';
import LoadingWidgetSpin from '../../components/LoadingWidgetSpin';
import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.reduce((somatoriaAtual, resultadoAtual) => {
            const isAcerto = resultadoAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((index, result) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`result__${result}`}
              // key={`result__${index}`}
            >
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
          {/* {results.map((index, result) => (
            <li>
              {`#${index} Resultado: ${result === true ? 'Acertou' : 'Errou'}`}
            </li>
          ))} */}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

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
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const hasAlternativeSubmited = selectedAlternative !== undefined;

  return (
    <>
      <Widget>
        <Widget.Header>
          <BackLinkArrow href="/" />
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
          <AlternativesForm
            onSubmit={(e) => {
              e.preventDefault();
              setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmited(true);
                setSelectedAlternative(undefined);
              }, 3 * 1000);
            }}
          >
            {/* eslint-disable-next-line arrow-body-style */}
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `altenative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;
              return (
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                  key={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    // style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                    type="radio"
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
          </AlternativesForm>
          {/*
            <form onSubmit={(e) => {
              e.preventDefault();
              setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmited(true);
                setSelectedAlternative(undefined);
              }, 3 * 1000);
            }}
            >
              {question.alternatives.map((alternative, alternativeIndex) => {
                const alternativeId = `altenative__${alternativeIndex}`;
                return (
                  <Widget.Topic
                    as="label"
                    htmlFor={alternativeId}
                    key={alternativeId}
                  >
                    <input
                      // style={{ display: 'none' }}
                      id={alternativeId}
                      name={questionId}
                      onChange={() => setSelectedAlternative(alternativeIndex)}
                      type="radio"
                    />
                    {alternative}
                  </Widget.Topic>
                );
              })}
            </form>
          */}
          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button
            type="submit"
            disabled={!hasAlternativeSubmited}
          >
            Confirmar
          </Button>
          <p>{`selectedAlternative: ${selectedAlternative}`}</p>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
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

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const bg = externalBg;

  function addResult() {
    setResults(
      ...results,
      results,
    );
  }

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
    <QuizBackground backgroundImage={bg}>
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
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
        {/* eslint-disable-next-line max-len */}
        {/* {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>} */}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/otaviohenrique1" />
    </QuizBackground>
  );
}
