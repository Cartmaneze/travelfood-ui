import React, {Component} from "react";
import styled from "styled-components";
import restApi from '../rest/login';

const StyledLogin = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border: 2px solid #000;
    border-radius: 20px;
    background: #eee;
    h2 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
    }
    button {
        background: green;
        color: #fff;
        padding: 10px;
        margin: 5px;
        width: 150px;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
    }
`;

const ContainerFlex = styled.div`
	display: flex;
`;

const StyledInput = styled.input`
    border: 1px solid #000;
    border-radius: 10px;
    padding: 10px;
    margin: 5px;
    width: 150px;
    box-sizing: border-box;
`;

export default class Login extends Component {

    state = {
        userAlreadyExists: false,
        userDoNotExists: false,
        usernameLogin: null,
        passwordLogin: null,
        usernameReg: null,
        passwordReg: null
    }

    async login(self, authorize) {
        try {
            await restApi.login(self.state.usernameLogin, self.state.passwordLogin);
            authorize();
        } catch (err) {
            self.setState({
                userDoNotExists: true
            })
        }
    }

    async register(self, authorize) {
        try {
            await restApi.register(self.state.usernameReg, self.state.passwordReg);
            authorize();
        } catch (err) {
            self.setState({
                userAlreadyExists: true
            })
        }
    }

    render() {
		return (
            <ContainerFlex>
                <StyledLogin>
                    {this.state.userDoNotExists ? <h2>User Not Exists</h2> : <h2>Login</h2>}
                    <StyledInput type="text" name="usernameLogin" value={this.state.email} onChange={ this.handleChange.bind(this) } placeholder="username" />
                    <StyledInput type="password" name="passwordLogin" value={this.state.password} onChange={ this.handleChange.bind(this) } placeholder="password" />
                    <button onClick={this.login.bind(this.props, this, this.props.authorize)}>Login</button>
                </StyledLogin>
                <StyledLogin></StyledLogin>
                <StyledLogin>
                    {this.state.userAlreadyExists ? <h2>User Already Exists</h2> : <h2>Register</h2>}
                    <StyledInput type="text" name="usernameReg" value={this.state.email} onChange={ this.handleChange.bind(this) } placeholder="username" />
                    <StyledInput type="password" name="passwordReg" value={this.state.password} onChange={ this.handleChange.bind(this) } placeholder="password" />
                    <button onClick={this.register.bind(this.props, this, this.props.authorize)}>Register</button>
                </StyledLogin>
            </ContainerFlex>
		)
    }
    
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
}