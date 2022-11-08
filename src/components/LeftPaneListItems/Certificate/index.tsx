import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { CSSProperties } from "react";
import { MDBCol, MDBRow } from "mdbreact";
import { CartDash, Dot, Speedometer, ThreeDots, ThreeDotsVertical } from "react-bootstrap-icons";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Dropdown, DropdownButton } from "react-bootstrap";
import OptionsToggle from "../../OptionsToggle";
import OptionsToggleHorizontal from "../../OptionToggleHorizontal";

interface LeftPaneListItemsProps {
    list: any[];
    onSelected: (id: number) => any;
    onDelete: any;
}

const TextTruncated = styled.p`
width: 100%;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

const LeftPaneListItems = (props: LeftPaneListItemsProps) => {

    const handleDelete = (id: number) => {
        props?.onDelete(id);
    };

    const renderElements = () => (
        props.list.map((item, index) => {
            console.log("in map LeftPaneListItems");
            return (
                <div onClick={() => props.onSelected(index)}>
                    <MDBRow className="mt-3 mb-3">
                        <MDBCol md="10">
                            <p className={css`
                                font-size: 0.92rem;
                                font-weight: bold;
                            `}>
                                {item?.name}
                            </p>
                        </MDBCol>
                        <MDBCol md="2">
                            <OptionsToggleHorizontal itemId={item?.id} hideActive onDelete={() => handleDelete(item?.id)} />
                        </MDBCol>
                    </MDBRow>
                    <div style={{ paddingLeft: "0.15vh", paddingRight: "0.15vh" }}>
                        <MDBRow className="mt-3 mb-3">
                            <MDBCol md="4">
                                <span style={{ fontWeight: "bold" }}>CODE</span>
                            </MDBCol>
                            <MDBCol md="4">
                            <span style={{ fontWeight: "bold" }}>TYPE</span>
                            </MDBCol>
                            <MDBCol md="4">
                            <span style={{ fontWeight: "bold" }}>STATUS</span>
                            </MDBCol>
                            <MDBCol md="4">
                                {item?.code}
                            </MDBCol>
                            <MDBCol md="4">
                                {item?.location_type}
                            </MDBCol>
                            <MDBCol md="4">
                                {!!item?.is_Active ? "true" : "false"}
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>
            );
        })
    );

    if (props?.list && props.list.length > 0) {
        return (
            <>
                {renderElements()}
            </>
        );
    }
    return null;
};

export default LeftPaneListItems;
