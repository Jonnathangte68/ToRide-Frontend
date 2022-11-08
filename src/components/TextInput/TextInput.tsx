import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { CSSProperties } from "react";

interface TextInputProps {
    placeholder?: string;
    class?: any;
    value?: string;
    name: string;
    title: string;
    defaultValue?: string;
    ref?: any;
    containerStyle?: CSSProperties | undefined;
    onChange?: (text: any) => any;
    extraProps?: any;
}

const TextInput = (props: TextInputProps) => (
    <FloatingLabel
        controlId="floatingInput"
        label={props?.title}
        style={props?.containerStyle} 
    >
        <Form.Control
            type="text"
            placeholder={props?.placeholder}
            className={props?.class}
            value={props.value}
            defaultValue={props?.defaultValue}
            name={props.name}
            ref={props.ref}
            onChange={(e) => props?.onChange && (props.onChange(e.target.value) || null)}
            {...props?.extraProps}
        />
    </FloatingLabel>
);

export default TextInput;