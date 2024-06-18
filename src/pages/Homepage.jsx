import PageTransitionWrapper from "../component/Animations/PageTransitionWrapper";
import Navigation from "../component/Layout/Navigation";
import HeroHeader from "../component/HomeComp/HeroHeader";
import FeaturesItem from "../component/HomeComp/FeaturesItem";
import DetailFeatures from "../component/HomeComp/DetailFeatures";
import FaqComponent from "../component/HomeComp/FaqComponent";
import Footer from "../component/Layout/Footer";

export default function Homepage() {
  return (
    <>
      <Navigation />
      <PageTransitionWrapper>
        <HeroHeader />
        <FeaturesItem />
        <DetailFeatures />
        <FaqComponent />
      </PageTransitionWrapper>
      <Footer />
    </>
  );
}
