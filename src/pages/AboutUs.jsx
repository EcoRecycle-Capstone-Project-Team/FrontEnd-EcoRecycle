import AnimatedSection from "../component/AnimatedSection";
import PropTypes from "prop-types";
import teamProfile from "../data/teamProfiles.json";
import NameCardList from "../component/NameCardList";
import Navigation from "../component/Navigation";

export default function AboutUsPage() {
  return (
    <>
      <Navigation />
      <div className="container mt-2 mb-2">
        <AnimatedSection>
          <header className="header-container d-flex justify-content-center">
            <div className="header-text">
              <h1 className="header-title">
                Eco<span className="header-highlight">Recycle</span>
              </h1>
              <h2 className="header-subtitle">Capstone Team</h2>
            </div>
            <img
              src="./assets/Recycle.png"
              alt="EcoRecycle Logo"
              className="header-logo"
            />
          </header>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-5 mt-5">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="aboutus-subtitle">
                  Visi <span className="aboutus-title-highlight">Kami</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className="col-md-6">
                <div className="bg-secondary" style={{ height: "500px" }}></div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-5">
            <div className="row align-items-center">
              <div className="col-md-6 order-md-2">
                <h1 className="aboutus-subtitle">
                  Misi <span className="aboutus-title-highlight">Kami</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className="col-md-6 order-md-1">
                <div className="bg-secondary" style={{ height: "500px" }}></div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-5">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="aboutus-subtitle">
                  Harapan <span className="aboutus-title-highlight">Kami</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className="col-md-6">
                <div className="bg-secondary" style={{ height: "500px" }}></div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section>
            <h1 className="aboutus-subtitle text-center">
              Our <span className="aboutus-title-highlight">Team</span>
            </h1>
            <NameCardList team={teamProfile} />
          </section>
        </AnimatedSection>
      </div>
    </>
  );
}

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
};
