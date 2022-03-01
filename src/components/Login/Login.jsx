import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../storage/auth-context";
import Input from "../UI/Input/Input";

const USER_INPUT = "USER_INPUT";
const BLUR = "BLUR";
const emailReducer = (state, action) => {
  if (action.type === USER_INPUT) {
    console.log({ value: action.value, isValid: action.value.includes("@") });
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === BLUR) {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: state.value, isValid: state.isValid };
};
const passwordReducer = (state, action) => {
  if (action.type === USER_INPUT) {
    console.log({ value: action.value, isValid: action.value.trim().length > 6 });
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === BLUR) {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: state.value, isValid: state.isValid };
};

const Login = (props) => {
  const authCtx = useContext(AuthContext)
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailValid } = emailState;
  const { isValid: passwordValid } = passwordState;
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailValid && passwordValid);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [emailValid, passwordValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: USER_INPUT, value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: USER_INPUT, value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: BLUR });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: BLUR });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if(!emailValid){
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
            ref={emailInputRef}
            label="E-mail"
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            isValid={emailState.isValid}
            className={classes.control}
          />
        <Input 
            ref={passwordInputRef}
            label="Password"
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            isValid={passwordState.isValid}
            className={classes.control}
          />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
