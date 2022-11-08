import COLORS from "../../utils/colors";

const StatusButton = (props: any) => {

    const color = () => {
        if (props?.text === "Created") {
            return COLORS.BUTTONS_ACTIVE;
        }
        if (props?.text === "Premium") {
            return COLORS.RED;
        }
        return COLORS.BUTTONS_WARNING;
    };

    return (
        <span style={{
            width: "11.62vh",
            height: "5.12vh",
            backgroundColor: color(),
            borderRadius: "0.33rem",
            textAlign: "center",
            padding: "0.88vh",
            color: "white",
            fontWeight: "400",
            ...props?.style
        }}>
            {props?.text}
        </span>
    );
};

export default StatusButton;
