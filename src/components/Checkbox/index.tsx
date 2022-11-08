import Form from "react-bootstrap/esm/Form";
import COLORS from "../../utils/colors";

const Checkbox = (props) => (
    <>
        <Form.Check type={"checkbox"} color={COLORS.WHITE}>
            <Form.Check.Input
                type={"checkbox"}
                onClick={props?.onClick}
                checked={props?.checked}
            />
        </Form.Check>
    </>
);

export default Checkbox;