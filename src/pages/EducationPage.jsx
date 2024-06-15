import PageTransitionWrapper from "../component/Animations/PageTransitionWrapper";
import ArticlesList from "../component/Article/ArticlesList";
import Navigation from "../component/Navigation";

export default function EducationPage() {
  return (
    <>
      <Navigation />
      <PageTransitionWrapper>
        <div className="container mt-2 mb-5">
          <h1 className="text-center">Article</h1>
          <ArticlesList />
          <h1 className="text-center">Dokumentasi</h1>
        </div>
      </PageTransitionWrapper>
    </>
  );
}
