import React from 'react'
import InnerPageHeader from '@/components/InnerPageHeader'
import SmartImage from '@/components/SmartImage'
function HireDeveloper() {
  return (
    <div>
        <InnerPageHeader title="Hire a Developer"/>
        <div className="container my-5">
            <p>Looking to hire a skilled developer? You've come to the right place! We have trained many students who are ready to take on new challenges. We conduct multiple assessments to ensure they are a good fit for your project. Either you need a front-end developer, back-end developer, or a full-stack developer, we have got you covered for all roles like internee, an intermediate developer or an experienced professional.</p>
            <p><strong>Contact us today to find the perfect developer for your needs!</strong></p>
            <div className="row mt-5">
                <div className="col-md-3">
                    <div className="card text-center shadow-lg p-3 mb-4 bg-white rounded">
                        <SmartImage src="/img/avatar.jpg" 
                        className="rounded-circle mx-auto d-block mt-3" 
                        alt="Developer Avatar" width={100} height={100} />
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Jazib Iqbal</h5>
                            <p className="card-text text-muted">Full-Stack Developer | MERN | Firebase | React Native</p>
                            <a href="#" className="btn btn-primary mt-2">Hire Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HireDeveloper