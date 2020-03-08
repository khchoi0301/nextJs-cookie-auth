import React, { Component } from 'react';
import { loginUser } from "../lib/auth";
import Router from "next/router";

export default class LoginForm extends Component {

    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org'
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        const { email, password } = this.state;

        event.preventDefault();
        loginUser(email, password)
            .then(() => {
                Router.push("/profile");
            })
    }

    render() {
        const { email, password } = this.state
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
                <button type="submit">Submit</button>
            </form>
        )
    }
}
