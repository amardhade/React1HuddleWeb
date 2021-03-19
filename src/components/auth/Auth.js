import axios from 'axios';
import React from 'react';
import axiosInstance from '../axios/AxiosNetworkInterceptors';
import * as APIConstants from '../../variables/APIConstants';
import * as OHAxios from '../axios/OHAxios';
import configureStore from '../../store/ConfigureStore';
import { doLogin } from './AuthActions';
import { verifyEmail } from './AuthReducer'

export default class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            email: undefined,
            password: undefined,
            isEmailVerified: this.props ? this.props.isEmailVerified : false,
            isPasswordVerified: this.props ? this.props.isPasswordVerified : false,
            isFetchingDetails: this.props ? this.props.isFetchingDetails : false,
            errorMsg: this.props ? this.props.errorMsg : undefined,
            isError: undefined
        }
        console.log('typeof: ', typeof (axiosInstance))
        this.store = configureStore();
        this.store.subscribe(() => {
            const updateState = this.store.getState();
            const authDetails = updateState.authDetails;
            console.log('Subscribe: ', authDetails);
            this.setState(() => ({ 
                data: authDetails.data,
                isFetchingDetails: authDetails.isFetchingDetails,
                isError: authDetails.isError,
                errorMsg: authDetails.errorMsg,
                isEmailVerified: authDetails.isEmailVerified,
                isPasswordVerified: authDetails.isPasswordVerified
             }));
        });
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
        console.log('Email: ', email, 'isEmailVerified: ', this.state.isEmailVerified);
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
        console.log('verifuing pwd')
        this.store.dispatch(doLogin(payload));
        // OHAxios.post(APIConstants.LOGIN, payload)
        // .then((response) => {
        //     console.log(response);
        //     if (response.data.success) {
        //         this.setState(() => ({ isPasswordVerified: true }))
        //         console.log('Token: ', response.data.data.authentication.onehuddletoken);
        //         localStorage.setItem("token", response.data.data.authentication.onehuddletoken);
        //         window.location.reload();
        //     } else {
        //         this.setState(() => ({ isError: "Incorrect password" }));
        //     }
        // }).catch((error) => {
        //     console.log(error);
        //     this.setState(() => ({ isError: "Something went wrong" }));
        // });
    }

    verifyEmail(email) {
        if (!/.+@.+\.[A-Za-z]+$/.test(email)) {
            this.setState(() => ({ isError: "Not a valid email address" }))
            return;
        }
        this.setState(() => ({ isError: undefined }))
        console.log('verifuing email: ', email)
        this.store.dispatch(verifyEmail({ email }))
        // OHAxios.post(APIConstants.VERIFY_EMAIL, payload)
        // .then((response) => {
        //     console.log(response);
        //     if (response.data.success) {
        //         this.updateState(true);
        //     } else {
        //         this.setState(() => ({ isError: "Email not registered" }));
        //     }
        // }).catch((error) => {
        //     console.log(error);
        //     this.updateState(false);
        // });
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
                            <button type="submit" disabled={!this.state.email || this.state.isFetchingDetails}>Verify Email</button>
                        </div>}
                        {this.state.isEmailVerified && <div>
                            <input type="password" autoFocus onChange={this.onPasswordChange} />
                            <button type="submit" disabled={!this.state.password || this.state.isFetchingDetails}>Verify Password</button>
                        </div>}
                        {this.state.isError && <p>{this.state.errorMsg}</p>}
                    </form>
                </div>
            </div>
        )
    }
}
