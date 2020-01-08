import React from 'react';
import styled from 'styled-components';
import Todo from './Views/Todo';

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
`;

function App() {
  return (
    <Container>
      <Todo />
    </Container>
  );
}

export default App;
