import { CSSProperties } from "react";
import Button, { ButtonProps } from "react-bootstrap/esm/Button";
import COLORS from "../../utils/colors";
import "./styles.css";

interface InputButtonProps extends ButtonProps {
    label?: string;
    icon?: any;
    class?: string;
    type?: "button" | "submit" | "reset";
    containerStyle?: CSSProperties;
    onClick?: () => {} | void;
}

const InputButton = (props: InputButtonProps) => {

    const getStyle = () => {
        if (props?.variant === "light") {
            const propsStyle = props?.containerStyle;
            propsStyle.backgroundColor = COLORS.WHITE;
            return {
                ...propsStyle,
                ...{ backgroundColor: `${COLORS.WHITE} !important`, border: "1px solid "+COLORS.GRAY_BUTTON_DEFAULT, color: "black" },
            };
        }
        return props?.containerStyle;
    };

    return (
        <Button
            type={props?.type || "button"}
            variant={props?.variant}
            className={props?.class}
            style={getStyle()}
            onClick={props?.onClick}
        >
            {props?.label && props.label}
            {props?.icon && props.icon}
        </Button>
    );
};

export default InputButton;
