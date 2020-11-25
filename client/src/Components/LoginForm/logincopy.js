import React, { useState } from 'react';
// import './CSS/LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../Core/apiConstants';
import api from '../Core/api';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

function LoginForm(props) {
    const [state, setState] = useState({ email: "", password: "", successMessage: null });

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const payload = {
            "email": state.email,
            "password": state.password,
        }

        try {
            let response = await api.login(payload);

            if (response.status === 200) {
                setState(prevState => ({
                    ...prevState,
                    'successMessage': 'Login successful. Redirecting to home page..'
                }))
                localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                redirectToHome();
                props.showError(null)
            }
            else if (response.code === 204) {
                props.showError("Username and password do not match");
            }
            else {
                props.showError("Username does not exists");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const redirectToHome = () => {
        props.history.push('/category/general');
    }
    const redirectToRegister = () => {
        props.history.push('/user/register');
    }
    return (
        <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                value={state.email}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={state.password}
                                onChange={handleChange}
                            />
                            <Button color='teal' fluid size='large' onClick={handleSubmitClick}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us?  <span className="loginText" onClick={() => redirectToRegister()}>Sign Up</span>
                    </Message>
                </Grid.Column>
            </Grid>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
    </div>

    )
}

export default LoginForm;