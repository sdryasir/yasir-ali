"use client"
import React from "react";
import Breadcrumbs from "./BreadCrumbs";

function InnerPageHeader({title}) {
  return (
    <div className="inner-page-header py-3 bg-dark" style={{"backgroundImage":"url(/img/breadcrumb-bg.webp)"}}>
      <div className="container">
        <h1>{title}</h1>
        <Breadcrumbs />
      </div>
    </div>
  );
}

export default InnerPageHeader;
