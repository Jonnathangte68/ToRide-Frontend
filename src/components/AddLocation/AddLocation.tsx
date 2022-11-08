import styled from "@emotion/styled";

const ButtonContainer = styled.button`
    all: unset;
    cursor: pointer;
    color: #FF7F4C;
    float: right;
    clear:both;
    font-weight: 500;
    &:focus {
        outline: unset;
    }
`;

const AddLocation = (props: any) => {
    return (
        <ButtonContainer type="button"  onClick={(e) => props?.onClick(e)}>
            + Add Location
        </ButtonContainer>
    );
};

export default AddLocation;
