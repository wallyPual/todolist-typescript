import React, { useState, FormEvent } from 'react';
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

type ITodo = {
  id: number;
  title: string;
  done: boolean;
  edit: boolean;
};

function Todo() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [value, setValue] = useState<string>('');
  const [uniqId, setUniqId] = useState<number>(0);

  const getToday = (): string => {
    const today = new Date();
    const day = ['월', '화', '수', '목', '금', '토', '일'];

    return `${day[today.getDay() - 1]} ${today.getMonth() +
      1}월 ${today.getDate()}일`;
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setTodoList(prev => [
      ...prev,
      { id: uniqId, title: value, done: false, edit: false }
    ]);
    setValue('');
    setUniqId(prev => prev + 1);
  };

  const editTodo = (id: number, title: string): void => {
    const newTodo = todoList.map(todo => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });
    console.log({ id, title, newTodo });
    setTodoList(newTodo);
  };

  const deleteTodo = (id: number): void => {
    const newTodo = todoList.filter(todo => todo.id !== id);
    console.log({ id });
    console.log({ newTodo });
    setTodoList(newTodo);
  };

  return (
    <Container>
      <Title>오늘 {getToday()}</Title>
      <Contents>
        {todoList.length > 0 &&
          todoList !== [] &&
          todoList.map((todo, index) => (
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
