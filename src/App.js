import { Suspense } from 'react';
import BalloonSearch from "./Components/BalloonSearch";
import "./Themes/App.css";
import { GlobalStyles } from './Themes/GlobalStyles';
import { ThemeProviders } from './Themes/themeProvider';

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
