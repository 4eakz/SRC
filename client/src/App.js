import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './components/Registration';

function App() {
  return (
    <Router>
      <div>

          {/* другие маршруты */}
          <Route path="/registration">
            <Registration />
          </Route>
        
      </div>
    </Router>
  );
}

export default App;
