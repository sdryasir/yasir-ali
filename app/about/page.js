import InnerPageHeader from "@/components/InnerPageHeader";
import React from "react";

function Page() {
  return (
    <>
    <InnerPageHeader title="About Us"/>
    <div className="container mt-5">
      <h1>What is <span className="about-heading">EasyLearn?</span></h1>
      <p className="about-para">
        Are you ready to turn your passion for coding into real-world skills?
        EasyLearn is your trusted companion on the journey to becoming a
        confident and capable programmer. <br/>As the <strong>founder and CEO of EasyLearn</strong>, I
        know how challenging it can be to start your programming journey. That's
        why I built this platform — to empower beginners with the resources,
        support, and community they need to succeed in the tech industry. <br/>
        <strong>Our YouTube channel</strong> is packed with beginner-friendly tutorials,
        project-based learning, and advanced tips — all designed to make complex
        concepts simple and practical. And for those ready to go deeper, <strong>our
        affordable online courses</strong> deliver quality education without the high
        price tag. <br/>
        At <strong>EasyLearn</strong>, we believe <strong>learning should be accessible to
        everyone.</strong> That’s why our courses are priced to fit any budget — so no
        matter where you're from or what your background is, you can start
        learning and growing today. <br/>But EasyLearn is more than just a learning
        platform — it’s a <strong>community</strong>. A place where learners support each other,
        share progress, and celebrate every step forward. <br/>With EasyLearn by your
        side, there’s nothing stopping you from building the skills and
        confidence to land your dream job in tech. <br/>So why wait? <strong>Join the
        EasyLearn community today</strong> — and let’s build your future together, one
        line of code at a time.
      </p>
      <br/>
      <h4>Yasir Ali - <small>Founder & CEO</small></h4>
    </div>
    </>
  );
}

export default Page;
