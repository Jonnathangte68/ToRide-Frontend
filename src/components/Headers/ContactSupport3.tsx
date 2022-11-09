import styled from "@emotion/styled";

const MainContainer = styled.div`
flex: 2;
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
                    src="../assets/img/headset-contact-support.png"
                    alt="Not Found"
                    className="icon-others-cs"
                    style={{ paddingTop: "0.21vh" }}
                />
                <span className="frame-1-cs flex-row-vstart-hstart-cs">
                    <p className="txt-552-cs" style={{ paddingTop: "0.388vh", fontSize: "1rem" }}>Contact Support</p>
                </span>
            </Wrapper>
        </MainContainer>
    );
}

export default ContactSupport;
