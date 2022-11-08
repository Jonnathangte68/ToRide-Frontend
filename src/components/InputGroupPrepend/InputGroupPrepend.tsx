import { css } from "@emotion/css";
import { CSSProperties } from "react";
import { FormControl, InputGroup, InputGroupProps } from "react-bootstrap";
import "./style.css"

interface InputGroupPrependProps extends InputGroupProps {
    name?: string;
    img: string;
    defaultValue?: string;
    containerStyle: CSSProperties;
};

const InputGroupPrepend = (props: InputGroupPrependProps) => {
    return (
        <InputGroup size="lg" style={props?.containerStyle}>
            <InputGroup.Text id={props?.id}>
                <img alt="prepend" src={props?.img} style={{ width: "1.15vh" }} />
            </InputGroup.Text>
            <FormControl
                name={props?.name}
                placeholder={props?.placeholder}
                defaultValue={props?.defaultValue}
                className={css`font-size: .35rem;`}
                aria-label={props?.["aria-label"]}
                aria-describedby={props?.["aria-describedby"]}
            />
        </InputGroup>
    );
};

export default InputGroupPrepend;
  