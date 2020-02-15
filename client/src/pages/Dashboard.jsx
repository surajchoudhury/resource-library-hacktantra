import React from "react";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className="container pt-5 container-dashboard">
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col mb-4 ">
            <div className="card card-dashboard">
              <div className="dashboard-img-container">
              <img
                src="assets/images/html-css.jpg"
                className="card-img-top"
                alt="..."
              />
              </div>
            
              <div className="card-body">
                <h5 className="card-title text-center">HTML & CSS</h5>
                <p className="card-text">
                  Learn to make a static website and also animating them by
                  learning HTML & CSS.
                </p>
              </div>
              <a href="html-desc.html" className="btn btn-primary">
                Start Learning
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
