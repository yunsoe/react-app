import React from "react";

const state = {
    isAuth: false,
    email: '',
    username:''
};

const AuthContext = React.createContext({ isAuth: state.isAuth, email: state.email, username:state.username }); //passing initial value

export default AuthContext;