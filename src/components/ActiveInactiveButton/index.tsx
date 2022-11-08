import COLORS from "../../utils/colors";

const ActiveInactiveButton = (props: any) => {
    return (
        <span style={{
            width: "11.62vh",
            height: "5.12vh",
            backgroundColor: (!!props?.status ? (props?.status === "active" ? COLORS.BUTTONS_ACTIVE : COLORS.BUTTONS_DANGER) : COLORS.BUTTONS_ACTIVE),
            borderRadius: "0.33rem",
            textAlign: "center",
            padding: "0.88vh",
            color: "white",
            fontWeight: "400",
            fontSize: "0.88rem",
            ...props?.style
        }}>
            {props?.text}
        </span>
    );
}

export default ActiveInactiveButton;
