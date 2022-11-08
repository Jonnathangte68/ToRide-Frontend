import Form from "react-bootstrap/esm/Form";
import { CSSProperties } from "react";
import COLORS from "../../utils/colors";

interface SelectInputProps {
    id?: string;
    options?: Array<{ id: any, name: string }>;
    default?: { id: number | string, name: string };
    containerStyle?: CSSProperties;
    title?: string;
    defaultChecked?: number;
    name?: string;
    boxStyle?: CSSProperties;
    onChange?: (value: string) => any;
}

const SelectBox = (props: SelectInputProps) => {

    console.log("to set", props?.options);
    
    return (
    <Form.Group>
        <Form.Label style={{ float: "left", clear: "both", fontWeight: 800, color: COLORS.SECONDARY_COLOR, fontSize: "0.75rem", ...props?.containerStyle }} >{props?.title}</Form.Label>
        <Form.Select
            id={props?.id}
            aria-label="Default select example"
            style={props?.boxStyle}
            onChange={(e) => props?.onChange(e.target.value)}
            name={props?.name}
        >
        {!!props?.default ? <option value={props?.default?.id}>{props?.default?.name}</option> : null}
        {(!!props?.options && props?.options?.length > 0) && props?.options.map((option, idx) => {
            return <option selected={!!props?.defaultChecked && props?.defaultChecked === idx ? true : false } value={option?.id}>{option?.name}</option>
        })}
        </Form.Select>
    </Form.Group>
)};

export default SelectBox;