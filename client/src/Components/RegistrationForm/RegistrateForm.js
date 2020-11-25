import React from 'react';
import api from '../Core/api';
import './registrationform.css';
import validateData from '../../Utils/formvalidation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;


class RegistrateForm extends React.Component {
    state = { name:"",email: "", password: "", confirmPassword: "", passwordShown: false, confirmPasswordShown:false, errors: [],
                successMessage:"" };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    togglePasswordVisiblity = (password) => {
        let show= this.state.passwordShown ? false : true;
        this.setState({passwordShown:show});
    };

    handleSubmitClick = (e) => {
        e.preventDefault();
        debugger;

        const { name,email, password, confirmPassword } = this.state;
        let validationErrors = validateData(name,email, password, confirmPassword);

        if (validationErrors.length > 0) {
            this.setState({ name:"",email: "", password: "", confirmPassword: "", errors: validationErrors });
        }
        else {
            this.setState({ name:"",email: "", password: "", confirmPassword: "", errors: [] });
            this.postLoginToServer();
        }
    }

    postLoginToServer = async () => {

        const { name,email, password, confirmPassword } = this.state;
        const payload = {
            "name":name,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword
        }

        try {
            debugger;
            let response = await api.register(payload);
            
            console.log(response);

            if (response.status === 201) {
                this.setState({ 'successMessage': 'Registration successful. Redirecting to home page..' });

                this.props.history.push('/category/general');
            }
            else {
                this.state.errors("Some error ocurred");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    renderErrors = () => {
        return this.state.errors.map((error, index) =>
            <ul key={index}>
                <li key={index}>{error}</li>
            </ul>
        )
    }

    render() {
        return (
            <>
                <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                    <form>
                        <h3 className="form-group text-center">Register</h3>
                        <div className="form-group text-left">
                            <label htmlFor="name">First Name</label>
                            <input type="name"
                                className="form-control"
                                id="name"
                                name="name"
                                aria-describedby="nameHelp"
                                placeholder="Enter name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="email">Email address</label>
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
                            <label htmlFor="password">Password</label>
                            <input 
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                type={this.state.passwordShown ? "text" : "password"}
                                onChange={this.handleChange}>
                            </input>
                            <i className= "regpassword" onClick={this.togglePasswordVisiblity}>{eye}</i>
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="confirmpassword">Confirm Password</label>
                            <input 
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                type={this.state.passwordShown ? "text" : "password"}
                                onChange={this.handleChange}>
                            </input>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSubmitClick}>
                            Register
                        </button>
                        {this.state.errors.length !== 0 ? <div className="ui negative message">
                        <div>{this.renderErrors()}</div>
                        </div> : null}
                    </form>
                </div>
            </>
        )
    }
}

export default RegistrateForm;
