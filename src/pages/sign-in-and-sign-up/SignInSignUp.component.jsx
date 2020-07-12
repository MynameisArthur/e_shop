import React from 'react';
import './SignInSignUp.styles.scss';
import SignIn from '../../components/sign-in/SignIn.component';
import SignUp from '../../components/sign-up/SignUp.component';

const SignInSignUp = () => {
    return (
        <div className="sign-in-and-sign-up">
            <SignIn />
            <SignUp />
        </div>
    );
};

export default SignInSignUp;
