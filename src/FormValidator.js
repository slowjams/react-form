import React, { Component } from "react";
import { ValidateData } from "./validation";
import { ValidationContext } from "./ValidationContext";
import { ValidateForm } from "./wholeFormValidation";

export class FormValidator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            dirty: {},
            formSubmitted: false,
            getMessagesForField: this.getMessagesForField
        }
    }

    get formValid() {
        return Object.keys(this.state.errors).length === 0;
    }

    static getDerivedStateFromProps(props, state) {
        state.errors = ValidateData(props.data, props.rules);
        if (state.formSubmitted && Object.keys(state.errors).length === 0) {
            let formErrors = ValidateForm(props.data);
            if (formErrors.length > 0) {
                state.errors.form = formErrors;
            }
        }
        return state;
    }


    handleChange = (ev) => {
        let name = ev.target.name;
        // this.setState(this.state.dirty[name] = true);
        this.setState(state => state.dirty[name] = true);
    }

    handleClick = (ev) => {
        this.setState({ formSubmitted: true }, () => {
            if (this.formValid) {
                let formErrors = this.props.validateForm(this.props.data);
                if (formErrors.length === 0) {
                    this.props.submit(this.props.data)
                }
            }
        });
    }

    getButtonClasses() {
        return this.state.formSubmitted && !this.formValid
            ? "btn-danger" : "btn-primary";
    }

    getMessagesForField = (field) => {
        return (this.state.formSubmitted || this.state.dirty[field]) ?
            this.state.errors[field] || [] : []
    }

    render() {
        return <React.Fragment>
            <ValidationContext.Provider value={this.state}>
                <div onChange={this.handleChange}>
                    {this.props.children}
                </div>
            </ValidationContext.Provider>
            <div className="text-center">
                <button className={`btn ${this.getButtonClasses()}`}
                    onClick={this.handleClick}
                    disabled={this.state.formSubmitted && !this.formValid} >
                    Submit
               </button>
            </div>
        </React.Fragment>
    }
}