/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';

import db from '../db.json';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';

export default function Resultado() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizContainer>
        <p>Ganhou</p>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/otaviohenrique1" />
    </QuizBackground>
  );
}
