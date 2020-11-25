import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HeaderNewsCategory from '../../HeaderNewsCategory/HeaderNewsCategory';
import CategoryPage from './../../CategoryPage/CategoryPage';
import ManageAPI from '../ManageAPI';
import Login from '../../LoginForm/Login';
import RegistrateForm from '../../RegistrationForm/RegistrateForm';
import './app.css';

const App = () => {

  return (
    <div className="ui container">
      <BrowserRouter>
        <div className="navbar-container">
          {/* <Overlay/> */}
          <HeaderNewsCategory />
        </div>
        <Switch>
          <Redirect exact from='/' to='/category/general' />
          <Route exact path="/category/livenews" component={ManageAPI} />
          <Route exact path="/category/:categoryname" component={CategoryPage} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/register"  component={RegistrateForm} />
        </Switch>
      </BrowserRouter>
    </div>

  );
};


export default App;
