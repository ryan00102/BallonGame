import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
   
    font-family:
      "Montserrat",
      "Helvetica Neue",
      "NanumSquare",
      "Noto Sans",
      "Noto Sans CJK KR",
      sans-serif;
    
  }
`;