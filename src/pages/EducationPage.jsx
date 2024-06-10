import PageTransitionWrapper from "../component/Animations/PageTransitionWrapper";
import ArticlesList from "../component/Article/ArticlesList";

export default function EducationPage() {
  return (
    <PageTransitionWrapper>
      <div className="container mt-2 mb-5">
        <h1 className="text-center">Article</h1>
        <ArticlesList />
        <h1 className="text-center">Dokumentasi</h1>
      </div>
    </PageTransitionWrapper>
  );
}
