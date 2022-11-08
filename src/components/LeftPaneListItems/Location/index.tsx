import { MDBCol, MDBRow } from "mdbreact";
import { css } from "@emotion/css";
import OptionsToggleHorizontal from "../../OptionToggleHorizontal";
import ActiveInactiveButton from "../../ActiveInactiveButton";

interface LeftPaneListItemsProps {
    list: any[];
    onSelected: (id: number) => any;
    onDelete: any;
    onEdit?: any;
}

const LeftPaneListItems = (props: LeftPaneListItemsProps) => {

    const handleDelete = (id: number) => {
        props?.onDelete(id);
    };

    const handleEdit = (id: number) => {
        props?.onEdit(id);
    };

    const renderElements = () => (
        props.list.map((item, index) => {
            console.log("in map LeftPaneListItems");
            return (
                <div onClick={() => props.onSelected(index)} className={css`padding: 0.15vh 0px 0.15vh 0px; line-height: 2; background-color: ${!!item?.selected ? "rgba(255,67,17,.15)" : "unset"};`}>
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
                            <OptionsToggleHorizontal itemId={item?.id} hideActive onDelete={() => handleDelete(item?.id)} onEdit={() => handleEdit(item?.id)} />
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
                            <MDBCol md="4" className="mt-3">
                                {item?.code}
                            </MDBCol>
                            <MDBCol md="4" className="mt-3">
                                {item?.location_type}
                            </MDBCol>
                            <MDBCol md="4" className="mt-3">
                                <ActiveInactiveButton status={!!item?.is_Active ? "active" : "inactive"} text={!!item?.is_Active ? "Active" : "Inactive"} />
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
