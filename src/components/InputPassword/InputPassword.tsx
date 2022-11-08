import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { CSSProperties } from "react";

interface InputPasswordProps {
    placeholder?: string;
    class?: string;
    value?: string;
    name: string;
    containerStyle?: CSSProperties;
    onChange?: (text: string) => any;
}

const InputPassword = (props: InputPasswordProps) => (
    <FloatingLabel controlId="floatingPassword" label="Password" style={props?.containerStyle} >
        <Form.Control
            type="password"
            placeholder={props?.placeholder}
            className={props?.class}
            value={props.value}
            name={props.name}
            onChange={(e) => props?.onChange && (props.onChange(e.target.value) || null)}
        />
    </FloatingLabel>
);

export default InputPassword;
