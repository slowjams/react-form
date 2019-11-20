import React, { Component } from "react";

export class Testz extends Component {

    static aaa = 1

    constructor(props) {
        super(props);
        this.state = {
            greeting:'Hi'
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(Testz.aaa = 2) {
           console.log("getDerived is " + this.props.try) 
        }

        Testz.aaa += 1;
        // aaa += 1;
       // console.log("getDerived is " + props.try);
        //console.log("getDerived is " + this.props.try)  //undefined
        return state;
    }

    shouldComponentUpdate(newProps, newState) {
        console.log("old is " + this.props.try)
        console.log("new is " + newProps.try)

        return true;
    }

    render() {
        return <p>{this.props.try}</p>
    }
}