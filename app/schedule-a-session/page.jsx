import InnerPageHeader from "@/components/InnerPageHeader";
import React from "react";

function Page() {
  return (
    <>
      <InnerPageHeader title="Schedule a meeting" />
      <div className="container">
        <p className="my-3">
            <strong>Feeling Stuck or Unsure About Your Learning Path?</strong><br />
            Schedule a personalized one-on-one session with an expert counselor to gain clarity. Together, we'll explore your strengths, identify the skills that align with your goals, and create a customized learning roadmap to help you move forward with confidence.   </p>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://calendly.com/sdr-yasir/30min?hide_event_type_details=1&hide_gdpr_banner=1"
            title="Calendly Booking"
            allowFullScreen
            style={{ border: 0 }}
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Page;
