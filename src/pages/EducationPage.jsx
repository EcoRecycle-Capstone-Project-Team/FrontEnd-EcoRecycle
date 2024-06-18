import PageTransitionWrapper from "../component/Animations/PageTransitionWrapper";
import ArticlesList from "../component/EduComp/Article/ArticlesList";
import DokumentasiList from "../component/EduComp/Dokumentasi/DokumentasiList";
import Navigation from "../component/Navigation";
import HeroSection from "../component/Hero/HeroSection";
import Footer from "../component/Footer";

export default function EducationPage() {
  return (
    <>
      <Navigation />
      <HeroSection
        title="Edukasi dan Jelajahi Ilmu Lingkungan Bersama untuk Bumi"
        subtitle="Temukan artikel dan dokumentasi gambar yang membantu meningkatkan kesadaran dan pengetahuan Kita tentang pentingnya pengelolaan sampah dan pelestarian lingkungan"
        imageUrl="/assets/mainbg-education.jpg"
      />
      <PageTransitionWrapper>
        <div className="container mt-2 mb-5">
          <div className="article-section mb-4">
            <h1 className="text-center mb-4">Article</h1>
            <ArticlesList />
          </div>
          <div className="documentation-section mt-2 mb-4">
            <h1 className="text-center">Dokumentasi</h1>
            <DokumentasiList />
          </div>
        </div>
      </PageTransitionWrapper>
      <Footer />
    </>
  );
}
