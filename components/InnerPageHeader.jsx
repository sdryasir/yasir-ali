"use client"
import React from "react";

function InnerPageHeader({title}) {
  return (
    <div className="inner-page-header py-3 bg-dark text-white">
      <div className="container">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default InnerPageHeader;
