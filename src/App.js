import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './components/Login';
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import Checkout from './components/Checkout';

function App() {
  return (
      <div className="app">
      <Router>
        <AuthProvider>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
        </Switch>
        </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
