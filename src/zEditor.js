import React, { Component } from "react";
import { FormValidator } from "./FormValidator";
import { ValidationMessage } from "./ValidationMessage";

export class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            order: ""
        }

        this.rules = {
            name: { required: true, minlength: 3, alpha: true },
            email: { required: true, email: true },
            order: { required: true }
        }
    }

    updateFormValue = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return <div className="h5 bg-info text-white p-2">
            <FormValidator data={this.state} rules={this.rules}
                submit={this.props.submit}>
                <div id="zzz" className="form-group">
                    <label>Name</label>
                    <input className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.updateFormValue} />
                    <ValidationMessage field="name" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.updateFormValue} />
                    <ValidationMessage field="email" />
                </div>
                <div className="form-group">
                    <label>Order</label>
                    <textarea className="form-control"
                        name="order"
                        value={this.state.order}
                        onChange={this.updateFormValue} />
                    <ValidationMessage field="order" />
                </div>
            </FormValidator>
        </div>
    }
}