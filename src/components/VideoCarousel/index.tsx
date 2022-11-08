import { MDBCol, MDBRow } from "mdbreact";
import COLORS from "../../utils/colors";

function VideoCarousel(props: any) {
  return (
      <MDBRow>
          <MDBCol md="1">
            <i className="fa fa-angle-left" style={{ fontSize: "6rem", position: "relative", top: "33%", WebkitTextStroke: `8px ${COLORS.WHITE}` }} aria-hidden="true"/>
          </MDBCol>
          <MDBCol md="10">
            <video key={`carousel-video-${props?.name}`} width="85%" height="325vh" style={{ paddingRight: "1.15vh" }} controls>
                <source src={props?.src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          </MDBCol>
          <MDBCol md="1">
            <i className="fa fa-angle-right" style={{ fontSize: "6rem", position: "relative", top: "33%", WebkitTextStroke: `8px ${COLORS.WHITE}` }} aria-hidden="true"/>
          </MDBCol>
      </MDBRow>
  );
}

export default VideoCarousel;