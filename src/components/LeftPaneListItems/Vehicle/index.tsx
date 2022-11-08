import { MDBCol, MDBRow } from "mdbreact";
import { Dot, Speedometer } from "react-bootstrap-icons";
import { css } from "@emotion/css";
import OptionsToggleHorizontal from "../../OptionToggleHorizontal";

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
                <div key={item?.id} onClick={() => props.onSelected(index)} className={css`padding: 0.15vh 0px 0.15vh 0px; line-height: 2; background-color: ${!!item?.selected ? "rgba(255,67,17,.15)" : "unset"};`}>
                    <MDBRow className="mt-3 mb-3">
                        <MDBCol md="2">
                            <img
                                src={item?.image}
                                alt="profile im item row"
                                style={{ objectFit: "cover", borderRadius: "50%", width: "7.75vh", height: "7.75vh" }}
                            /> 
                        </MDBCol>
                        <MDBCol md="8">
                            <p className={css`
                                font-size: 0.92rem;
                                font-weight: bold;
                            `}>
                                {item?.title}
                            </p>
                            <p className={css`
                                font-size: 0.72rem;
                                font-weight: 400;
                                margin-top: 0px !important;
                                padding-top: 0px !important;
                            `}>
                                {item?.sub}
                                <Dot style={{ fontSize: "22px" }} />
                                <Speedometer style={{ fontSize: "11.5px", marginRight: "10px" }} />
                                {`${item?.description} miles`}
                            </p>
                        </MDBCol>
                        <MDBCol md="2">
                            <OptionsToggleHorizontal itemId={item?.id} onDelete={() => handleDelete(item?.id)} onEdit={() => handleEdit(item?.id)} />
                        </MDBCol>
                    </MDBRow>
                    <div style={{ paddingLeft: "2.4vh", paddingRight: "2.4vh" }}>
                        <MDBRow className="mt-3 mb-3">
                            {!!item?.col_1 && <MDBCol md="4">
                                <span style={{ fontWeight: "bold" }}>VIN NO</span>
                            </MDBCol>}
                            {!!item?.col_2 && <MDBCol md="4">
                            <span style={{ fontWeight: "bold" }}>PLATE ID</span>
                            </MDBCol>}
                            {!!item?.col_3 && <MDBCol md="4">
                            <span style={{ fontWeight: "bold" }}>MODEL</span>
                            </MDBCol>}
                            {!!item?.col_1 && <MDBCol md="4">
                                {item?.col_1}
                            </MDBCol>}
                            {!!item?.col_2 && <MDBCol md="4">
                            {item?.col_2}
                            </MDBCol>}
                            {!!item?.col_3 && <MDBCol md="4">
                            {item?.col_3}
                            </MDBCol>}
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
