import { DefaultTheme } from 'styled-components';

const styles: DefaultTheme = {
  resetButton: `
    padding: 0;
    border: none;
    background: none;
    color: #000;
  `,
  resetInput: `
    padding: 0;
    width: 100%;
    border: none;
    background: none;
  `,
  addButton: `
    display: flex;
    align-items: center;
    padding: 0;
    min-width: 100px;
    height: 40px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    color: #ee2825;
  `
};

export default styles;