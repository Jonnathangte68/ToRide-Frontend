import React from "react"
import "./style.css"

export default function MobileVerification() {
  return (
    <div className="mobile-verification flex-col-hstart-vstart clip-contents">
      <div className="group-802 flex-col-hcenter">
        <div className="header flex-row-vstart-hstart">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/22r65sozsaf-I1646%3A91787%3B24%3A1027?alt=media&token=018e381b-f57f-435d-8b62-f039726facc4"
            alt="Not Found"
            className="to-ride-logo"
          />
          <div className="content flex-row">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/22r65sozsaf-I1646%3A91787%3B26%3A420?alt=media&token=a8c0ede5-a16f-46f0-aee9-eeba5dffaffe"
              alt="Not Found"
              className="icon-others"
            />
            <div className="frame-1 flex-row-vstart-hstart">
              <p className="txt-429">Contact Support</p>
            </div>
          </div>
          <div className="cta">
            <div className="text-40px-medium-1-primary flex-col-hstart-vstart">
              <p className="txt-263 flex-hcenter">Sign In</p>
            </div>
          </div>
        </div>
        <div className="details flex-col-hstart-vstart">
          <div className="text flex-col-hcenter-vstart">
            <p className="txt-1042 flex-hcenter">Mobile Number Verification</p>
            <p className="txt-355 flex-hcenter">Please enter the 4 digit OTP</p>
          </div>
          <div className="group-972 flex-row">
            <div className="square-1">
              <div className="background flex-col-hstart-vstart"></div>
            </div>
            <div className="square-2">
              <div className="background flex-col-hstart-vstart"></div>
            </div>
            <div className="square-2">
              <div className="background flex-col-hstart-vstart"></div>
            </div>
            <div className="square-4">
              <div className="background flex-col-hstart-vstart"></div>
            </div>
          </div>
          <div className="cta-1">
            <div className="text-48px-large-1-primary flex-col-hstart-vstart">
              <p className="txt-424 flex-hcenter">Verify</p>
            </div>
          </div>
          <p className="txt-124">
            You didn’t receive the verification number ?{" "}
            <span className="txt-1242">Resend</span>
          </p>
        </div>
      </div>
    </div>
  )
}
