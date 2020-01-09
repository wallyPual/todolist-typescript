import React, {
  MouseEvent,
  FormEvent,
  useState,
  useRef,
  useCallback
} from 'react';
import styled from 'styled-components';
import { IoMdCreate, IoIosTrash } from 'react-icons/io';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

type TStyledContainer = {
  isActive: boolean;
};

type TStyledColumn = {
  last?: boolean;
};

type TStyledInput = {
  isActive: boolean;
};

type TodoItem = {
  id: number;
  title: string;
  done: boolean;
  editTodo: Function;
  deleteTodo: Function;
  checkTodo: Function;
};

const Container = styled.div<TStyledContainer>`
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

const Column = styled.div<TStyledColumn>`
  display: flex;
  align-items: center;
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

const Input = styled.input<TStyledInput>`
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

const CompleteButton = styled.button`
  ${props => props.theme.resetButton};
  margin-right: 10px;
  outline: none;
  color: #019cdc;
`;

const EditButton = styled.button`
  ${props => props.theme.resetButton}
  padding: 0 8px;
  font-size: 15px;
  color: #019cdc;
`;

const DeleteButton = styled.button`
  ${props => props.theme.resetButton}
  padding: 0 8px;
  font-size: 15px;
  color: #eb2822;
`;

function TodoItem({
  id,
  title,
  done,
  editTodo,
  deleteTodo,
  checkTodo
}: TodoItem) {
  const [sedit, setSedit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(title);

  const inputEl = useRef<HTMLInputElement>(null);

  const editStart = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setSedit(prev => !prev);
    if (inputEl.current === null) return;
    inputEl.current.focus();
  }, []);

  const editEnd = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      editTodo(id, editText);
      setSedit(prev => !prev);
    },
    [editText, editTodo, id]
  );

  const handleInput = useCallback((e: FormEvent<HTMLInputElement>): void => {
    setEditText(e.currentTarget.value);
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
        {!sedit && (
          <CompleteButton onClick={e => checkTodo(e, id)}>
            {done ? <FaRegCheckCircle size={25} /> : <FaRegCircle size={25} />}
          </CompleteButton>
        )}
        {!sedit && <Title>{title}</Title>}
      </Column>
      <Column last={true}>
        {!done &&
          (sedit ? (
            <EditButton onClick={editEnd}>done</EditButton>
          ) : (
            <div>
              <EditButton onClick={editStart}>
                <IoMdCreate />
              </EditButton>
              <DeleteButton onClick={() => deleteTodo(id)}>
                <IoIosTrash />
              </DeleteButton>
            </div>
          ))}
      </Column>
    </Container>
  );
}

export default TodoItem;
