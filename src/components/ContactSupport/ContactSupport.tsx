import "./contact-support-style.css";

const ContactSupport = (props) => {
    return (
        <div className="contact-support-cs flex-col-hstart-vstart-cs" style={props?.style}>
            <div className="content-cs flex-row-cs">
                <img
                    src="../assets/img/headset-contact-support.png"
                    alt="Not Found"
                    className="icon-others-cs"
                />
                <span className="frame-1-cs flex-row-vstart-hstart-cs">
                    <p className="txt-552-cs" style={{ paddingTop: "0.388vh", fontSize: "1rem" }}>Contact Support</p>
                </span>
            </div>
        </div>
    );
}

export default ContactSupport;
