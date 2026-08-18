import { BookOpen, FlaskConical } from "lucide-react";
import { navigate } from "../../app/routes.js";
import { Badge } from "../../ui/Badge.jsx";
import { Card } from "../../ui/Card.jsx";
import { EmptyState } from "../../ui/EmptyState.jsx";

export function CatalogPage({ bootstrap }) {
  const grades = bootstrap?.grades || [];
  const subjects = bootstrap?.subjects || [];
  const chapters = bootstrap?.chapters || [];
  const concepts = bootstrap?.featuredConcepts || [];

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Curriculum</p>
          <h1>Catalog browser</h1>
          <p>Grade-first structure for students now, with clean expansion points for staff later.</p>
        </div>
      </header>

      {grades.map((grade) => (
        <Card className="content-section" key={grade.id}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">{grade.status || "active"}</p>
              <h2>{grade.title}</h2>
            </div>
            <Badge tone={grade.status ? "neutral" : "copper"}>{subjects.filter((subject) => subject.gradeId === grade.id).length} subjects</Badge>
          </div>

          <div className="catalog-grid">
            {subjects.filter((subject) => subject.gradeId === grade.id).map((subject) => {
              const subjectChapters = chapters.filter((chapter) => chapter.subjectId === subject.id);
              return (
                <article className={`catalog-panel tone-${subject.tone || "neutral"}`} key={subject.id}>
                  <div className="catalog-title">
                    {subject.tone === "chemistry" ? <FlaskConical size={20} /> : <BookOpen size={20} />}
                    <strong>{subject.title}</strong>
                    {subject.status && <Badge>{subject.status}</Badge>}
                  </div>

                  {subjectChapters.length ? subjectChapters.map((chapter) => (
                    <div className="chapter-block" key={chapter.id}>
                      <span>{chapter.title}</span>
                      {concepts.filter((concept) => concept.chapterId === chapter.id).map((concept) => (
                        <button key={concept.id} onClick={() => navigate(`/app/concepts/${concept.id}`)} type="button">
                          {concept.title}
                        </button>
                      ))}
                    </div>
                  )) : <EmptyState title="Planned" text="Content source will be added after the next chapter pass." />}
                </article>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}
