import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function page() {
  return (
    <div
      className=" d-flex justify-content-center align-items-center"
      style={{ height: "600px" }}
    >
      <div className="container">
        <div className="text-center">
          <Image
            src={"/img/icon-email-check.svg"}
            alt="icon-email-check"
            width={100}
            height={100}
          />
          <h3 className="mt-3">Activation Link Sent</h3>
            <strong>Please check your email to activate your account</strong><br />
            {/* <p className="mt-2">We have sent you an activation link, please check your email for account activation.</p> */}
            <p className="mt-3"><strong>Note:</strong>You will not be able to login unless you verify through email.<strong> Link is valid for next 1 hour</strong></p>
            <p className="text-muted fw-light fst-italic mb-4">(If you can't access email, you can try logging in using google or <Link href={'/support-center'}>contact support</Link>)</p>
            <Link className="btn btn-action text-white" href={'/auth/login'}>Go to Login <ArrowRight/></Link>
        </div>
      </div>
    </div>
  );
}

export default page;
