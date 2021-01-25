import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`

export default function Home() {
  return <Title>Pombo Cavalo 3000</Title>
}
