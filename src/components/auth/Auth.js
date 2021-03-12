import axios from 'axios';
import React from 'react';

export default class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            isEmailVerified: this.props ? this.props.isEmailVerified : false,
            isPasswordVerified: this.props ? this.props.isPasswordVerified : false,
            isError: undefined
        }
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        const email = this.state.email;
        console.log('isEmailVerified: ', this.state.isEmailVerified);
        if (!this.state.isEmailVerified) {
            this.verifyEmail(email);
        } else {
            const password = this.state.password;
            this.verifyPassword(email, password);
        }
    }

    verifyPassword(email, password) {
        if (password.length < 4) {
            this.setState(() => ({ isError: "Incorrect password" }))
            return;
        }
        this.setState(() => ({ isError: undefined }))
        const payload = {
            email,
            password
        }
        axios.post('https://api-v15.1huddle.co/api/rest/v1.5/auth/login', payload, {
            headers: {
                'user-type': 'player',
                'Content-Type': 'application/json',
                'api-key': 'G9w0BAQsFADAxMS8wLQYDVQQDEyZREFF',
                'api-secret': 'FADA0MTIwMAYDVQQDEylBREZTITEDCVB',
                'locale': 'en',
                'platform': 'WebApp'
            }
        })
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    this.setState(() => ({ isPasswordVerified: true }))
                    console.log('Token: ', response.data.data.authentication.onehuddletoken);
                    localStorage.setItem("token", response.data.data.authentication.onehuddletoken);
                    window.location.reload();
                } else {
                    this.setState(() => ({ isError: "Incorrect password" }));
                }
            }).catch((error) => {
                console.log(error);
                this.setState(() => ({ isError: "Something went wrong" }));
            });
    }

    verifyEmail(email) {
        if (!/.+@.+\.[A-Za-z]+$/.test(email)) {
            this.setState(() => ({ isError: "Not a valid email address" }))
            return;
        }
        this.setState(() => ({ isError: undefined }))
        const payload = {
            email
        }
        axios.post('https://qa-api.1huddle.co/api/rest/v1.5/login/check_login_email', payload, {
            headers: {
                'user-type': 'player',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data.success);
                if (response.data.success) {
                    this.updateState(true);
                } else {
                    this.setState(() => ({ isError: "Email not registered" }));
                }
            }).catch((error) => {
                console.log(error);
                this.updateState(false);
            });
    }

    updateState(emailVeriifed) {
        this.setState(() => ({
            isEmailVerified: emailVeriifed
        }))
    }

    render() {
        return (
            <div>
                <h2>1Huddle</h2>
                <div>
                    <form onSubmit={this.onSubmit}>
                        {!this.state.isEmailVerified && <div>
                            <input type="text" autoFocus onChange={this.onEmailChange} />
                            <button type="submit" disabled={!this.state.email}>Verify Email</button>
                        </div>}
                        {this.state.isEmailVerified && <div>
                            <input type="password" autoFocus onChange={this.onPasswordChange} />
                            <button type="submit" disabled={!this.state.password}>Verify Password</button>
                        </div>}
                        {this.state.isError && <p>{this.state.isError}</p>}
                    </form>
                </div>
            </div>
        )
    }
}
