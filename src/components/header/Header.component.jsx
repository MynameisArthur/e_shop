import React from 'react';
import './Header.styles.scss';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/CartIcon.component';
import CartDropdown from '../cart-dropdown/CartDropdown.component';

const Header = ({currentUser, hidden}) => {
    return (
        <div className="header">
            <Link to="/" className="logo-container">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link to="/shop" className="option">
                    SHOP
                </Link>
                <Link to="/shop" className="option">
                    CONTACT
                </Link>
                {currentUser ? (
                    <div className="option" onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div>
                ) : (
                    <Link className="option" to="/signin">
                        SIGN IN
                    </Link>
                )}
                <CartIcon />
            </div>
            {hidden ? null : <CartDropdown />}
        </div>
    );
};
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden,
});

export default connect(mapStateToProps)(Header);
