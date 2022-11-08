import "./contact-support-style.css";

const ContactSupport = (props) => {
    return (
        <div className="contact-support-cs flex-col-hstart-vstart-cs" style={props?.style}>
            <div className="content-cs flex-row-cs">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/wyn6chgpvj9-I32%3A1660%3B26%3A1361?alt=media&token=8e5f8ae3-5964-441e-86dd-1d2cb10df0fb"
                    alt="Not Found"
                    className="icon-others-cs"
                />
                <span className="frame-1-cs flex-row-vstart-hstart-cs">
                    <p className="txt-552-cs">Contact Support</p>
                </span>
            </div>
        </div>
    );
}

export default ContactSupport;
