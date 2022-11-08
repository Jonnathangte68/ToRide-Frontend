import { MDBCol, MDBRow } from "mdbreact";
import { css } from "@emotion/css";
import OptionsToggleHorizontal from "../../OptionToggleHorizontal";
import StatusButton from "../../StatusButton";

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

    console.log("list class", props?.list);

    const renderElements = () => (
        props.list.map((item, index) => {
            console.log("in map LeftPaneListItems");
            return (
                <div key={item?.id} onClick={() => props.onSelected(index)} className={css`padding: 0.15vh 0px 0.15vh 0px; line-height: 2; background-color: ${!!item?.selected ? "rgba(255,67,17,.15)" : "unset"};`}>
                    <MDBRow className="mt-3 mb-3">
                        <MDBCol md="7">
                            <p className={css`
                                font-size: 0.92rem;
                                font-weight: bold;
                            `}>
                                {item?.title}
                            </p>
                        </MDBCol>
                        <MDBCol md="3">
                            {!!item?.status && <StatusButton text={item?.status} style={{ display: "block", width: "100% !important" }} />}
                        </MDBCol>
                        <MDBCol md="2">
                            <OptionsToggleHorizontal itemId={item?.id} hideActive onDelete={() => handleDelete(item?.id)} onEdit={() => handleEdit(item?.id)} />
                        </MDBCol>
                    </MDBRow>
                    <div style={{ paddingLeft: "0.15vh", paddingRight: "0.15vh" }}>
                        <MDBRow className="mt-3 mb-3">
                            <MDBCol md="4">
                                <span style={{ fontWeight: "bold" }}>CLASS SIZE</span>
                            </MDBCol>
                            <MDBCol md="4">
                            <span style={{ fontWeight: "bold" }}>INSTRUCTOR</span>
                            </MDBCol>
                            <MDBCol md="4">
                            <span style={{ fontWeight: "bold" }}>START DATE</span>
                            </MDBCol>
                            <MDBCol md="4">
                                {item?.col_1}
                            </MDBCol>
                            <MDBCol md="4">
                                {item?.col_2}
                            </MDBCol>
                            <MDBCol md="4">
                                {item?.col_3}
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
