import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import fetch from 'isomorphic-unfetch';

class AuthenticationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginError: false,
            success: false
        };
        this.view = {
            login: {
                path: "/signin",
                name: "Login"
            },
            register: {
                path: "/signup",
                name: "Register"
            }
        }
        this.vManager = (this.props.view === "login") ? this.view.login : this.view.register;
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            fetch(this.vManager.path, {
                method: "post",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(values)
            }).then(async res => {
                if (res.status !== 200) this.setState({ loginError: true });
                return await res.json();
            }).then(data => {
                if (data.token) {
                    localStorage.setItem("stockAppToken", data.token);
                }
                this.setState({ success: true })
            }).catch(err => {
                if (err) this.setState({ loginError: true })
            }) 
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                { /* Move into Flash Message Component */ }
                { this.state.loginError && <p>LOGIN ERROR!</p> }
                { this.state.success && (
                    <p>{ this.vManager.name } Successful.</p>
                )}
                <Form.Item>
                    {
                        getFieldDecorator("email", { rules: [{ required: true, message: "Please enter valid email" }] })(
                            <Input name="email" placeholder="Enter your email" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator("password", { rules: [{ required: true, message: "Please enter password!" }] })(
                            <Input name="password" type="pasword" placeholder="Enter your password" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        { this.vManager.name }
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({ name: "authForm" })(AuthenticationForm);