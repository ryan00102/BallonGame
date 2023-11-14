// import { ThemeProviders } from "styled-components";
import { Suspense } from 'react';
import BalloonSearch from "./BalloonSearch";
import "./Styles/App.css";
import { GlobalStyles } from './Styles/GlobalStyles';
import { ThemeProviders } from './Styles/themeProvider';

function App() {
  return (
    <ThemeProviders>
      <GlobalStyles />
      <Suspense fallback={<div>...loading</div>}>
        <div className="App">
          <BalloonSearch />
        </div>
      </Suspense>
        
    </ThemeProviders>
      
  );
}
export default App;
