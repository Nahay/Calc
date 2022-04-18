import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Header from './components/Header';
import Calc from './components/Calc';


function App() {
  return (
    <BrowserRouter>
    
      <div className="App">
        <Header/>

        <Switch>
          <Route exact path="/">
            <Calc calcType="+" min={2} max={20}/>
          </Route>
          <Route exact path="/soustraction">
            <Calc calcType="-" min={2} max={20}/>
          </Route>
          <Route exact path="/multiplication">
            <Calc calcType="x" min={2} max={20}/>
          </Route>
          <Route exact path="/division">
            <Calc calcType=":" min={2} max={40}/>
          </Route>
        </Switch>
      </div>
      
    </BrowserRouter>
    
  );
}

export default App;
