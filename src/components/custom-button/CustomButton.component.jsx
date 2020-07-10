import React from 'react';
import './CustomButton.styles.scss';

const CustomButton = ({children, ...otherProps}) => {
    return (
        <div className="custom-button" {...otherProps}>
            {children}
        </div>
    );
};

export default CustomButton;
