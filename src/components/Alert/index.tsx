import Alert from 'react-bootstrap/Alert'
import { random } from "lodash";
import { css } from '@emotion/css';
import COLORS from '../../utils/colors';

interface AlertProps {
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    text: string;
};

const AlertComponent = (props: AlertProps) => {
    return (
        <>
            <Alert key={random(1, 852737952389)} variant={props.variant} className={css`
                position: absolute;
                top: 2.5vh;
                left: 30%;
                right: 30%;
                width: "40%";
                height: auto;
                z-index: 1000;
                color: white;
                font-weight: 700;
                ${props.variant === "primary" ? "background-color: "+COLORS.GREEN_LIGHT+" !important;" : null}
                -webkit-box-shadow: -10px 0px 13px -7px ${props.variant === "primary" ? COLORS.GREEN_LIGHT : "#000000"}, 10px 0px 13px -7px ${props.variant === "primary" ? COLORS.GREEN_LIGHT : "#000000"}, 5px 5px 15px 5px rgba(5,255,64,0); 
                box-shadow: -10px 0px 13px -7px ${props.variant === "primary" ? COLORS.GREEN_LIGHT : "#000000"}, 10px 0px 13px -7px ${props.variant === "primary" ? COLORS.GREEN_LIGHT : "#000000"}, 5px 5px 15px 5px rgba(5,255,64,0);
            `}>
                {props?.text}
            </Alert>
        </>
    );
};

export default AlertComponent;
