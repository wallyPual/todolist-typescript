import React, { useState, useCallback, FormEvent } from 'react';
import styled from 'styled-components';
import TodoItem from '../component/TodoItem';
import { IoIosAdd } from 'react-icons/io';

const Container = styled.div``;
const Contents = styled.div``;
const Button = styled.button`
  ${props => props.theme.addButton}
`;
const ButtonText = styled.span`
  margin-left: 5px;
`;
const Title = styled.h1`
  font-size: 24px;
  color: #000;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  ${props => props.theme.resetInput}
  padding-left: 10px;
  height: 40px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 15px;
  &:focus {
    border-color: #ee2825;
  }
`;

type TTodo = {
  id: number;
  title: string;
  done: boolean;
};

function Todo() {
  const [todoList, setTodoList] = useState<TTodo[]>([]);
  const [value, setValue] = useState<string>('');
  const [uniqId, setUniqId] = useState<number>(0);

  const getToday = (): string => {
    const today = new Date();
    const day = ['월', '화', '수', '목', '금', '토', '일'];

    return `${day[today.getDay() - 1]} ${today.getMonth() +
      1}월 ${today.getDate()}일`;
  };

  const addTodo = useCallback((): void => {
    const newTodo: TTodo[] = [
      ...todoList,
      { id: uniqId, title: value, done: false }
    ];
    setTodoList(newTodo);
  }, [todoList, uniqId, value]);

  const editTodo = (id: number, title: string): void => {
    const newTodo: TTodo[] = todoList.map(todo => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });
    setTodoList(newTodo);
  };

  const deleteTodo = (id: number): void => {
    const newTodo = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodo);
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      addTodo();
      setValue('');
      setUniqId(prev => prev + 1);
    },
    [addTodo]
  );

  return (
    <Container>
      <Title>오늘 {getToday()}</Title>
      <Contents>
        {todoList.length > 0 &&
          todoList.map((todo: TTodo, index: number) => (
            <TodoItem
              {...todo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              key={index}
            />
          ))}
        <form onSubmit={handleSubmit}>
          <Row>
            <Input
              type='text'
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <Button type='submit'>
              <IoIosAdd size={25} />
              <ButtonText>작업추가</ButtonText>
            </Button>
          </Row>
        </form>
      </Contents>
    </Container>
  );
}

export default Todo;
