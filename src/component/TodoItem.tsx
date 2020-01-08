import React, {
  MouseEvent,
  FormEvent,
  useState,
  useRef,
  useEffect
} from 'react';
import styled from 'styled-components';

type StyledContainerProps = {
  isActive: boolean;
};

type StyledColumnProps = {
  last?: boolean;
};

type StyledInputProps = {
  isActive: boolean;
};

type TodoItem = {
  id: number;
  title: string;
  done: boolean;
  edit: boolean;
  editTodo: Function;
  deleteTodo: Function;
};

const Container = styled.div<StyledContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ddd;
  text-decoration: none;
  color: #000;
  ${props =>
    props.isActive &&
    `
    text-decoration: line-through;
  `}
`;

const Column = styled.div<StyledColumnProps>`
  padding: 0 0 0 10px;
  width: 90%;
  ${props =>
    props.last &&
    `
    padding: 0 10px 0 0;
    width: 10%;
    text-align: right;
  `}
`;

const Title = styled.span``;

const Input = styled.input<StyledInputProps>`
  ${props => props.theme.resetInput}
  position: absolute;
  top: -200%;
  left: -200%;
  opacity: 1;
  height: 40px;
  font-size: 15px;
  outline: none;
  ${props =>
    props.isActive &&
    `
    opacity: 1;
    position: static;
  `}
`;

const Button = styled.button`
  ${props => props.theme.resetButton}
  font-size: 15px;
  color: blue;
`;

function TodoItem({ id, title, done, edit, editTodo, deleteTodo }: TodoItem) {
  const [sedit, setSedit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(title);

  const inputEl = useRef<HTMLInputElement>(null);

  const editStart = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setSedit(prev => !prev);
    if (inputEl.current === null) return;
    inputEl.current.focus();
  };

  const editEnd = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    editTodo(id, editText);
    setSedit(prev => !prev);
  };

  const handleInput = (e: FormEvent<HTMLInputElement>): void => {
    setEditText(e.currentTarget.value);
  };

  useEffect(() => {
    const { current } = inputEl;

    if (sedit && current !== null) {
      current.focus();
    }
  }, []);

  return (
    <Container isActive={done}>
      <Column>
        <Input
          ref={inputEl}
          type='text'
          onChange={handleInput}
          isActive={sedit}
          value={editText}
        />
        {!sedit && <Title>{title}</Title>}
      </Column>
      <Column last={true}>
        {!done &&
          (sedit ? (
            <Button onClick={editEnd}>수정완료</Button>
          ) : (
            <div>
              <Button onClick={editStart}>수정</Button>
              <Button onClick={() => deleteTodo(id)}>제거</Button>
            </div>
          ))}
      </Column>
    </Container>
  );
}

export default TodoItem;
