export default function AboutUsPage() {
  return (
    <div className="container mt-2 mb-2">
      <header className="header-container d-flex justify-content-center">
        <div className="header-text">
          <h1 className="header-title">
            Eco<span className="header-highlight">Recycle</span>
          </h1>
          <h2 className="header-subtitle">Capstone Team</h2>
        </div>
        <img
          src="./src/assets/Recycle.png"
          alt="EcoRecycle Logo"
          className="header-logo"
        />
      </header>

      <section className="mb-5 mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="aboutus-subtitle">
              Visi <span className="aboutus-title-highlight">Kami</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div className="col-md-6">
            <div className="bg-secondary" style={{ height: "500px" }}></div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <h1 className="aboutus-subtitle">
              Misi <span className="aboutus-title-highlight">Kami</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div className="col-md-6 order-md-1">
            <div className="bg-secondary" style={{ height: "500px" }}></div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="aboutus-subtitle">
              Harapan <span className="aboutus-title-highlight">Kami</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div className="col-md-6">
            <div className="bg-secondary" style={{ height: "500px" }}></div>
          </div>
        </div>
      </section>

      <section>
        <h1 className="aboutus-subtitle text-center">
          Our <span className="aboutus-title-highlight">Team</span>
        </h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="bg-secondary" style={{ height: "200px" }}></div>
              <div className="card-body text-center">
                <h5 className="card-title">Isep Firmansyah</h5>
                <p className="card-text">Back End Engineer</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="bg-secondary" style={{ height: "200px" }}></div>
              <div className="card-body text-center">
                <h5 className="card-title">M. Natasya Ramadana</h5>
                <p className="card-text">Front End & UI/UX</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="bg-secondary" style={{ height: "200px" }}></div>
              <div className="card-body text-center">
                <h5 className="card-title">M. Agus Dharma Killin</h5>
                <p className="card-text">Front End & Project Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
