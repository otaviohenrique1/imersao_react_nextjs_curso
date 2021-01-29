import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

// eslint-disable-next-line react/prop-types
export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    // eslint-disable-next-line react/prop-types
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        // eslint-disable-next-line react/prop-types
        externalQuestions={dbExterno.questions}
        // eslint-disable-next-line react/prop-types
        dbExterno={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((respostaDoServidor) => {
        if (respostaDoServidor.ok) {
          return respostaDoServidor.json();
        }
        throw new Error('Falha em pegar os dadis');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto);
      // eslint-disable-next-line no-console
      // .catch((err) => console.error(err));

    // eslint-disable-next-line no-console
    console.log('dbExterno', dbExterno);
    // eslint-disable-next-line no-console
    console.log('Infos', context.query.id);

    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
