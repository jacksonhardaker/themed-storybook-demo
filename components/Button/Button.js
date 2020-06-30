import React from 'react';
import { btn } from './Button.module.scss';

const Button = ({ children, ...rest }) => {
    return <button className={btn} {...rest}>{children}</button>;
}

export default Button;