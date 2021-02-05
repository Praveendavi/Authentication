import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './component/Home'
import Signup from './component/Signup'
import Signin from './component/Signin'
import Logout from './component/Logout'
import Protected from './component/Protected'
import ActiveEmail from './component/ActiveEmail'
import ForgetPassword from './component/ForgetPassword'
import ResetPassword from './component/ResetPassword' 

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/:activation_token" component={ActiveEmail} />
        <Route exact path="/user/forget_password" component={ForgetPassword} />
        <Route exact path="/user/reset/:token" component={ResetPassword} />
        <Protected exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
