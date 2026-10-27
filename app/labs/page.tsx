import { buildPageMetadata } from "@/lib/metadata";
import { getPublishedLabProjects } from "@/data/labs";
import LabsClient from "./LabsClient";

export const metadata = buildPageMetadata({
  title: "Labs — Albanexa'nın İnteraktif Proje Evreni",
  description:
    "Albanexa Labs: bulutların üzerinde yüzen bir adadaki hayat ağacında, her altın elma ürettiğimiz bir projeyi temsil eder. İnteraktif 3D proje portföyü.",
  path: "/labs",
});

// Pre-render the experience; project data is static so the route is SSG-friendly.
export default function LabsPage() {
  const projects = getPublishedLabProjects();

  return (
    <>
      {/* SEO / crawler-accessible project list — visually hidden, not inside the canvas */}
      <div className="sr-only">
        <h1>Albanexa Labs — İnteraktif Proje Evreni</h1>
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              <a href={`/labs/${p.slug}`}>{p.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <LabsClient />
    </>
  );
}
