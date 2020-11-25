import React from 'react';
import './loginform.css';
import {ACCESS_TOKEN_NAME} from '../Core/apiConstants';
import api from '../Core/api';
import validateData from '../../Utils/formvalidation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

class LoginForm extends React.Component{
    state = {email : "",password : "", passwordShown: false, successMessage: null,errors: []};
    
    handleChange = (event) => {
        // debugger;
        this.setState({ [event.target.name]: event.target.value });
    }

    togglePasswordVisiblity = (password) => {
        let show= this.state.passwordShown ? false : true;
        this.setState({passwordShown:show});
    };
    // openOverlay()
    // {
    //     return <Overlay/>
    // }
    handleSubmitClick = async(e) => {
        e.preventDefault();

        // this.openOverlay();
        
        const { email, password} = this.state;

        let validationErrors = validateData(email, password);

        if (validationErrors.length > 0) {
            this.setState({ email: "", password: "", errors: validationErrors });
        }
        else {
            this.setState({ email: "", password: "", errors: [] });
            this.postLoginToServer();
        }
    }

    postLoginToServer = async () => {

        const { email, password} = this.state;

        const payload = {
            "email": email,
            "password": password
        }

        try{
            let response = await api.login(payload);
        
            if(response.status === 200){
                this.setState({'successMessage' : 'Login successful. Redirecting to home page..'});
                debugger;
                localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                this.redirectToHome();
            }
            else if(response.code === 204){
                this.setState({errors:"Username and password do not match"});
            }
            else{
                this.setState({errors:"Username does not exists"});
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    redirectToHome = () => {
        this.props.history.push('/category/general');
    }
    redirectToRegister = () => {
        this.props.history.push('/user/register'); 
    }
    renderErrors = () => {
        return this.state.errors.map((error, index) =>
            <ul key={index}>
                <li key={index}>{error}</li>
            </ul>
        )
    }

    render()
    {
        return(
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form className="form">

                    <div className="form-group text-left">
                    <div className="form-group text-center">
                    <h5>Login</h5>
                    </div>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    </div>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type={this.state.passwordShown ? "text" : "password"}
                        className="form-control" 
                        id="password" 
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange} 
                    />
                    <i className= "password" onClick={this.togglePasswordVisiblity}>{eye}</i>
                    </div>
                    <div className="form-check">
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={this.handleSubmitClick}
                    >Submit</button>
                </form>
                <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                    {this.state.successMessage}
                </div>
                <div className="registerMessage">
                    <span>Dont have an account? </span>
                    <span className="loginText" onClick={() => this.redirectToRegister()}>Register</span> 
                </div>
                {this.state.errors.length !== 0 ? <div className="ui negative message">
                                <div>{this.renderErrors()}</div>
                            </div> : null}
            </div>
        )
    }
}


export default LoginForm;