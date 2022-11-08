import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

interface InputEmailProps {
    placeholder?: string;
    class?: string;
    value?: string;
    name: string;
    onChange?: (text: string) => any;
}

const InputEmail = (props: InputEmailProps) => (
    <FloatingLabel
        controlId="floatingInput"
        label="Email Address"
    >
        <Form.Control
            type="email"
            placeholder={props?.placeholder}
            className={props?.class}
            value={props.value}
            name={props.name}
            onChange={(e) => props?.onChange && (props.onChange(e.target.value) || null)}
        />
    </FloatingLabel>
);

export default InputEmail;