import React, { Component } from 'react';
import { loginUser } from "../lib/auth";
import Router from "next/router";

export default class LoginForm extends Component {

    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org',
        error: "",
        isLoading: false,
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        const { email, password } = this.state;

        event.preventDefault();
        this.setState({ error: "", isLoading: true });
        loginUser(email, password)
            .then(() => {
                Router.push("/profile");
            })
            .catch(this.showError)
    }

    showError = err => {
        console.log(err)
        const error = err.response && err.response.data || err.message;
        this.setState({ error, isLoading: false })
    }

    render() {
        const { email, password, error, isLoading } = this.state
        return (
            <form onSubmit={this.handleSubmit} action="">
                <div>
                    <input type="email"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                        value={email} />
                </div>
                <div>
                    <input type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                        value={password} />
                </div>
                <button disabled={isLoading} type="submit" >
                    {isLoading ? "Sending" : "Submit"}
                </button>
                {error && <div>{error}</div>}
            </form>
        )
    }
}
