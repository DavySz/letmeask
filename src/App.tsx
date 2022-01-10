import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AdminRoom } from "./pages/AdminRoom";
import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContex'

export default function App() {


  return (
    <Router>
      <AuthContextProvider>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/rooms/new'>
            <NewRoom />
          </Route>
          <Route path='/rooms/:id'>
            <Room />
          </Route>
          <Route path='/admin/rooms/:id'>
            <AdminRoom />
          </Route>
        </Switch>
      </AuthContextProvider>
    </Router>
  );
}