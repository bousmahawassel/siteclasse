import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

const Home = (props) => {
    if (localStorage.getItem("token")) {
        return (
            <Redirect to="/edt"/>
        )
    } else {
        return (
            <Redirect to="/auth"/>
        )
    }
};

export default Home