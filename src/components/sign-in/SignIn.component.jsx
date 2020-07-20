import React, {useState} from 'react';
import './SignIn.styles.scss';
import FormInput from '../form-input/FormInput.component';
import CustomButton from '../custom-button/CustomButton.component';
import {
    googleSignInStart,
    emailSignInStart,
} from '../../redux/user/user.actions';
import {connect} from 'react-redux';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const {email, password} = userCredentials;
    const handleSubmit = async (e) => {
        e.preventDefault();
        emailSignInStart(email, password);
    };
    const handleChange = (e) => {
        const {value, name} = e.target;
        setCredentials({...userCredentials, [name]: value});
    };
    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    handleChange={handleChange}
                    value={email}
                    label="email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    handleChange={handleChange}
                    value={password}
                    label="password"
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton
                        onClick={googleSignInStart}
                        isGoogleSignIn
                        type="button"
                    >
                        Sign In with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({email, password})),
});

export default connect(null, mapDispatchToProps)(SignIn);
