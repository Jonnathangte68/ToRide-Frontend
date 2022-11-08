import styled from "@emotion/styled";

const MainContainer = styled.div`
    padding: 2.5px 114px 0px 672px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 1);
    width: 2vh;
    height: 5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 2vh;
    height: 5vh;
    padding-right: 15%;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const ContactSupport = () => {
    return (
        <MainContainer>
            <Wrapper>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/wyn6chgpvj9-I32%3A1660%3B26%3A1361?alt=media&token=8e5f8ae3-5964-441e-86dd-1d2cb10df0fb"
                    alt="Not Found"
                    className="icon-others-cs"
                />
                <span className="frame-1-cs flex-row-vstart-hstart-cs">
                    <p className="txt-552-cs">Contact Support</p>
                </span>
            </Wrapper>
        </MainContainer>
    );
}

export default ContactSupport;
