import { MDBCol, MDBRow } from "mdbreact";
import { css } from "@emotion/css";
import OptionsToggleHorizontal from "../../OptionToggleHorizontal";
import StatusButton from "../../StatusButton";

interface LeftPaneListItemsProps {
    list: any[];
    onSelected: (id: number) => any;
    onDelete: any;
}

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
                        <MDBCol md="7">
                            <p className={css`
                                font-size: 0.92rem;
                                font-weight: bold;
                            `}>
                                {item?.name}
                            </p>
                        </MDBCol>
                        <MDBCol md="3">
                            <StatusButton text={item?.status} />
                        </MDBCol>
                        <MDBCol md="2">
                            <OptionsToggleHorizontal itemId={item?.id} hideActive onDelete={() => handleDelete(item?.id)} onEdit={undefined} />
                        </MDBCol>
                    </MDBRow>
                    <div style={{ paddingLeft: "0.15vh", paddingRight: "0.15vh" }}>
                        <MDBRow className="mt-3 mb-3">
                            <MDBCol md="4">
                                <span style={{ fontWeight: "bold" }}>DATE</span>
                            </MDBCol>
                            <MDBCol md="8">
                            <span style={{ fontWeight: "bold" }}>LOCATION</span>
                            </MDBCol>
                            <MDBCol md="4">
                                {item?.date_start}
                            </MDBCol>
                            <MDBCol md="8">
                                {item?.location}
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
