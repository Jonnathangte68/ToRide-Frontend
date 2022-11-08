import Form from "react-bootstrap/esm/Form";
import { CSSProperties } from "react";
import COLORS from "../../utils/colors";

interface TextInputProps {
    placeholder?: string;
    class?: any;
    value?: string;
    name: string;
    title: string;
    ref?: any;
    containerStyle?: CSSProperties | undefined;
    onChange?: (text: any) => any;
    extraProps?: any;
    inputType?: "text" | "number";
}

const RegularTextInput = (props: TextInputProps) => (
    <Form.Group>
        <Form.Label style={{ float: "left", clear: "both", fontWeight: 800, color: COLORS.SECONDARY_COLOR, fontSize: "0.75rem", ...props?.containerStyle }} >{props?.title}</Form.Label>
        <Form.Control
            type={props?.inputType || "text"}
            placeholder={props?.placeholder}
            className={props?.class}
            value={props.value}
            name={props.name}
            ref={props.ref}
            onChange={(e) => props?.onChange && (props.onChange(e.target.value) || null)}
            {...props?.extraProps}
        />
    </Form.Group>
);

export default RegularTextInput;