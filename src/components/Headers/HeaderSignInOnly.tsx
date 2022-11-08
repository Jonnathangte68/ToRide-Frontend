import styled from '@emotion/styled'
import ContactSupport from './ContactSupport3';

const Container = styled.div`
  padding: 19px 80px 18px 80px;
  margin-bottom: 80px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 234, 1);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Logo = styled.img`
width: 201.74px;
margin-right: 46px;
height: 100%;
`;

const LoginOptions = styled.div`
flex: 1;
height: fix-content;
display: flex;
flex-direction: row;
width: 5vh;
`;

const SignInContainer = styled.div`
flex: 1;
display: flex;
padding: 1.33vh;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: rgba(44, 47, 52, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkSignIn = styled.a`
flex: 1;
font-size: 14px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 114%;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  word-wrap: break-word;
  justify-content: center;
  text-decoration: none;
  &:hover {
    font-family: Open Sans, sans-serif;
    font-weight: 700;
    line-height: 114%;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    word-wrap: break-word;
    justify-content: center;
    text-decoration: none;
  }
  &:visited {
    font-family: Open Sans, sans-serif;
    font-weight: 700;
    line-height: 114%;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    word-wrap: break-word;
    justify-content: center;
    text-decoration: none;
  }
  &:active {
    font-family: Open Sans, sans-serif;
    font-weight: 700;
    line-height: 114%;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    word-wrap: break-word;
    justify-content: center;
    text-decoration: none;
  }
}
`;

const HeaderSignInOnly = (props: any) => {

    return (
        <Container>
          <div style={{ flex: 2 }}>
            <Logo
              src="../assets/img/logo-landing-1.png"
              alt="Not Found"
              style={{ width: "12.25vh", height: "auto", paddingTop: "1.471vh" }}
            />
          </div>
          <div style={{ display: "flex", flex: 12, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
            <p style={{ flex: 4.5 }}/>
            <ContactSupport />
            <LoginOptions>
              <SignInContainer>
                <LinkSignIn href={props?.path ? props?.path : "/sign-in"}>
                  <p style={{ flex: 1, width: "100%", textAlign: "center" }}>Sign In</p>  
                </LinkSignIn>
              </SignInContainer>
            </LoginOptions>
          </div>
        </Container>
    );
};

export default HeaderSignInOnly;
