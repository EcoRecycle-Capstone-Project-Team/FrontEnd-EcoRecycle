import AnimatedSection from "../component/AnimatedSection";
import PropTypes from "prop-types";
import teamProfile from "../data/teamProfiles.json";
import NameCardList from "../component/NameCard/NameCardList";
import Navigation from "../component/Layout/Navigation";
import Footer from "../component/Layout/Footer";
import { Image } from "react-bootstrap";

export default function AboutUsPage() {
  return (
    <>
      <Navigation />
      <div className="container mt-4 mb-2">
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
                <p style={{ lineHeight: "2", textAlign: "justify" }}>
                  Visi kami di EcoRecycle adalah mewujudkan lingkungan yang
                  bersih dan lestari melalui pengelolaan sampah yang inovatif
                  dan berkelanjutan. Kami percaya bahwa dengan teknologi dan
                  pendekatan yang tepat, kita dapat mengatasi tantangan
                  pengelolaan sampah di Indonesia. Kami berupaya menciptakan
                  ekosistem yang mendukung pengelolaan sampah yang efektif dan
                  efisien, serta mendorong partisipasi aktif dari seluruh
                  lapisan masyarakat. Dengan visi ini, kami ingin menginspirasi
                  masyarakat untuk lebih peduli terhadap lingkungan dan
                  bersama-sama menciptakan masa depan yang lebih hijau dan
                  sehat. Kami berkomitmen untuk terus berinovasi dan
                  mengembangkan solusi yang dapat membantu mewujudkan visi ini.
                </p>
              </div>
              <div className="col-md-6">
                <div
                  style={{
                    position: "relative",
                    height: "600px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src="/assets/background-aboutus1.jpeg"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
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
                <p style={{ lineHeight: "2", textAlign: "justify" }}>
                  Misi kami adalah meningkatkan kesadaran masyarakat tentang
                  pentingnya pengelolaan sampah yang baik melalui berbagai
                  program edukasi dan kampanye. Kami menyediakan solusi digital
                  yang memudahkan masyarakat dalam mengelola sampah, seperti
                  peta lokasi TPA, bank sampah, dan titik sebaran sampah. Kami
                  juga berkomitmen untuk memfasilitasi partisipasi aktif
                  komunitas dan individu dalam kegiatan daur ulang dan
                  pengelolaan sampah. Dengan terus berinovasi dalam teknologi
                  pengelolaan sampah, kami berharap dapat menciptakan solusi
                  yang lebih efektif dan efisien. Selain itu, kami berkolaborasi
                  dengan pemerintah, lembaga swadaya masyarakat, dan sektor
                  swasta untuk mendukung inisiatif pengelolaan sampah yang
                  berkelanjutan. Kami percaya bahwa dengan misi ini, kita dapat
                  mencapai visi bersama untuk lingkungan yang lebih bersih dan
                  lestari.
                </p>
              </div>
              <div className="col-md-6">
                <div
                  style={{
                    position: "relative",
                    height: "600px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src="/assets/background-aboutus2.jpeg"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
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
                <p style={{ lineHeight: "2", textAlign: "justify" }}>
                  Kami berharap EcoRecycle dapat menjadi pionir dalam
                  pengelolaan sampah di Indonesia, membangun ekosistem yang
                  kolaboratif dan berkelanjutan. Dengan kolaborasi bersama
                  pemerintah, LSM, dan sektor swasta, kami berupaya mendukung
                  inisiatif pengelolaan sampah yang lebih baik. Komitmen kami
                  adalah mendukung masyarakat dalam menciptakan lingkungan yang
                  lebih hijau dan menjadikan pengelolaan sampah sebagai bagian
                  dari gaya hidup sehari-hari. Kami yakin bahwa melalui platform
                  ini, kita semua dapat berkontribusi pada masa depan yang lebih
                  baik dan lebih lestari.
                </p>
              </div>
              <div className="col-md-6">
                <div
                  style={{
                    position: "relative",
                    height: "600px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src="/assets/background-aboutus3.jpeg"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-5">
            <h1 className="aboutus-subtitle text-center">
              Our <span className="aboutus-title-highlight">Team</span>
            </h1>
            <NameCardList team={teamProfile} />
          </section>
        </AnimatedSection>
      </div>
      <Footer />
    </>
  );
}

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
};
