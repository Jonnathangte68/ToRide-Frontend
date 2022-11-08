import { MDBCol, MDBRow } from "mdbreact";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import RadioButton from "../../RadioButton";

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
    const renderElements = () => (
        props.list.map((item, index) => {
            console.log("in map LeftPaneListItems");
            console.log("item to map", item);
            return (
                <div key={item?.id} onClick={() => props.onSelected(index)} className={css`padding: 0.15vh 0px 0.15vh 0px; line-height: 2;`}>
                    <MDBRow className="mt-3 mb-3">
                        <MDBCol md="1">
                            <RadioButton selected={item?.selected} class={css`margin-top: 2.55vh; margin-left: .7vh`} />
                        </MDBCol>
                        <MDBCol md="2">
                            <img
                                src={item?.image}
                                alt="profile im item row"
                                style={{ objectFit: "cover", borderRadius: "50%", width: "7.75vh", height: "7.75vh" }}
                            /> 
                        </MDBCol>
                        <MDBCol md="5">
                            <div>
                                <TextTruncated className={css`
                                    font-size: 0.92rem;
                                    font-weight: bold;
                                `}>
                                    {item?.title}
                                </TextTruncated>
                                <TextTruncated className={css`
                                    font-size: 0.77rem;
                                `}>
                                    {item?.sub}
                                </TextTruncated>
                            </div>
                        </MDBCol>
                        <MDBCol md="4">
                            <div>
                                <p> </p>
                                <TextTruncated className={css`
                                    font-size: 0.77rem;
                                    margin-top: 2.33vh;
                                `}>
                                {item?.description}
                                </TextTruncated>
                            </div>
                        </MDBCol>
                    </MDBRow>
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
