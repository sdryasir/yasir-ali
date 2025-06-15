"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { Tooltip } from 'react-tooltip'

export default function EnrollPage({ courseId }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [course, setCourse] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(session?.user?.id || null);
  const [status, setStatus] = useState(null);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${courseId}`
      );
      const data = await res.json();
      setCourse(data);
    };
    fetchCourse();
  }, [courseId]);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-payment-receipt`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("File upload failed");
    }

    const data = await res.json();
    return data.url;
  };

  const handleEnroll = async () => {
    try {
      if (!userId) {
        const callbackUrl = `/courses/${course.slug}`;
        router.push(
          `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
        );
        return;
      }

      setLoading(true);
      setStatus(null);
      let receiptUrl = "";

      if (course.features.accessType !== "Free") {
        if (!file) {
          alert("Please upload payment receipt.");
          return;
        }
        receiptUrl = await handleFileUpload();
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            courseId: course._id,
            receiptUrl,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: data.message });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Server error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <div className="container mt-5">Loading course...</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title h4 mb-4">
                <span
                  style={{ display: "inline-block", backgroundColor: "green" }}
                  className="px-2 py-1 rounded text-white me-2"
                >
                  You are enrolling in
                </span>
                {course.title}
              </h1>

              <p className="mb-3">
                Course Type: <strong>{course.features.accessType}</strong>
              </p>
              <p className="mb-3">
                Course Price: <strong>PKR. {course.price}/-</strong>
                <HelpCircle id="email-label-tip" className="ms-2" size={14} />
                <Tooltip anchorSelect="#email-label-tip" place="top">
                  <div style={{ whiteSpace: "pre-line" }}>
                    Your enrollment will only be <strong>confirmed</strong> once you
                    {"\n"}
                    <strong>upload your payment receipt</strong>.
                  </div>
                </Tooltip>
                <Link className="ms-3" href={'#'}>How to Pay?</Link>
              </p>

              {course.features.accessType !== "Free" && (
                <div className="mb-3">
                  <label className="form-label fw-medium">
                    Upload Payment Receipt
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              )}
              <p className="mt-3">
                Please pay the fee through one of our accounts and upload your
                receipt, once done you enrollment will be confirmed within 24
                hours. <br />
                <br />
                In case of any inconvenience, please contact our{" "}
                <Link href={"/support-center"}>Support</Link>
              </p>

              <button
                onClick={handleEnroll}
                disabled={loading}
                className="btn btn-action fw-bold text-white w-100"
              >
                {loading ? "Processing..." : "Enroll Now"}
              </button>
              {status && (
                <div
                  className={`mt-3 alert alert-${
                    status.type === "success" ? "success" : "danger"
                  }`}
                  role="alert"
                >
                  {status.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
