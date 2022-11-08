import { css } from "@emotion/css";
import { Modal } from "react-bootstrap";
import InputButton from "../InputButton/InputButton";
import InputButton2 from "../InputButton2/InputButton2";

const DeleteModal = (props: any) => {
    return (
        <>
            <Modal
                show={props?.show}
                onHide={props?.onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <h1 style={{ fontSize: "1.87rem", fontWeight: "bold" }}>{props?.title1}</h1>
                    <h4 style={{ fontSize: "1.42rem" }}>{props?.title2}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className={css`
                        width: "300px";
                        margin-left: "20%";
                    `}>
                        {/* @ts-ignore */}
                        <InputButton2 name="gasjdbgisabgibu" title={"Cancel"} onClick={props?.onClose} class={css`background-color: white !important;color: black;border: 1px solid black;border-radius: 10px;`} />
                        <InputButton variant="danger" label="Delete" containerStyle={{ borderRadius: "10px" }} onClick={props?.onAction} />
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;
