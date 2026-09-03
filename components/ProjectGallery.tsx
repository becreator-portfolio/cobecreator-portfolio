"use client";

import { useEffect, useRef, useState } from "react";
import { ManagedVideo } from "@/components/ManagedVideo";
import { projects } from "@/data/projects";

export function ProjectGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeIndex !== null && !dialog.open) {
      dialog.showModal();
    }

    if (activeIndex === null && dialog.open) {
      dialog.close();
    }
  }, [activeIndex]);

  const closeProject = () => {
    dialogRef.current?.close();
    setActiveIndex(null);
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return 0;
      return (current + 1) % projects.length;
    });
  };

  const activeProject = activeIndex === null ? null : projects[activeIndex];

  return (
    <>
      <div className="projectStack">
        {projects.map((project, index) => (
          <article className="projectCard" key={project.slug}>
            <span className="projectNumber">{project.index}</span>
            <button
              type="button"
              className="projectOpen"
              onClick={() => setActiveIndex(index)}
              aria-label={`Assistir ${project.title}`}
            >
              <div className="projectMedia">
                <ManagedVideo
                  src={project.video}
                  poster={project.poster}
                  objectPosition={project.objectPosition}
                  className="projectVideo"
                  variant="portfolio"
                />
                <span className="watchIntent">ASSISTIR ↗</span>
              </div>
              <div className="projectCaption">
                <div>
                  <h3>{project.displayTitle}</h3>
                  <p>{project.meta}</p>
                </div>
                <span className="watchLabel">ASSISTIR ↗</span>
              </div>
            </button>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="projectDialog"
        onCancel={(event) => {
          event.preventDefault();
          closeProject();
        }}
        onClose={() => setActiveIndex(null)}
      >
        {activeProject && (
          <div className="projectView">
            <button type="button" className="projectClose" onClick={closeProject}>
              VOLTAR ×
            </button>

            <div className="projectViewMedia">
              <ManagedVideo
                key={activeProject.slug}
                src={activeProject.video}
                poster={activeProject.poster}
                objectPosition={activeProject.objectPosition}
                className="projectViewVideo"
                variant="project"
              />
            </div>

            <div className="projectViewFooter">
              <div>
                <h2>{activeProject.title}</h2>
                <p>{activeProject.meta}</p>
              </div>
              <button type="button" className="projectNext" onClick={showNext}>
                PRÓXIMO →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
