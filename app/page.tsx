import Link from "next/link";
import { ManagedVideo } from "@/components/ManagedVideo";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <main>
      <section className="hero sectionShell" id="top">
        <header className="siteHeader">
          <Link href="#top" className="brand">CO.BECREATOR</Link>
          <nav className="nav" aria-label="Primary navigation">
            <Link href="#work">Work</Link>
            <Link href="#about">About</Link>
            <Link href="#contact">Contact</Link>
          </nav>
        </header>

        <div className="heroGrid">
          <p className="eyebrow">AI FILM DIRECTOR · CREATIVE DIRECTION · 2026</p>
          <h1>Images that feel<br />found, not generated.</h1>
          <div className="heroMeta">
            <p>Direction, moving image and visual systems built between fashion, music and synthetic cinema.</p>
            <span>PORTO ALEGRE / WORLDWIDE</span>
          </div>
        </div>
      </section>

      <section className="marquee" aria-label="Creative disciplines">
        <div className="marqueeTrack">
          <span>AI FILM · CREATIVE DIRECTION · FASHION · MUSIC · EXPERIMENTAL IMAGE · </span>
          <span aria-hidden="true">AI FILM · CREATIVE DIRECTION · FASHION · MUSIC · EXPERIMENTAL IMAGE · </span>
        </div>
      </section>

      <section className="work sectionShell" id="work">
        <div className="sectionIntro">
          <span>Selected Work</span>
          <span>{projects.length.toString().padStart(2, "0")} PROJECTS</span>
        </div>

        <div className="projectStack">
          {projects.map((project) => (
            <article className="projectCard" key={project.slug}>
              <div className="projectMedia">
                {project.video ? <ManagedVideo src={project.video} className="projectVideo" /> : <div className="mediaFallback" />}
                <div className="projectIndex">{project.index}</div>
              </div>
              <div className="projectInfo">
                <div>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
                <div className="projectMeta">
                  <span>{project.discipline}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services sectionShell" id="about">
        <div className="sectionIntro">
          <span>Capabilities</span>
          <span>02—05</span>
        </div>
        <div className="serviceRows">
          <div><span>01</span><h3>AI Film Direction</h3><p>Concept, visual language, shot systems and final moving image.</p></div>
          <div><span>02</span><h3>Creative Direction</h3><p>Campaign worlds, fashion language, music visuals and launch systems.</p></div>
          <div><span>03</span><h3>Image Systems</h3><p>Repeatable visual grammar for brands that need consistency without looking templated.</p></div>
          <div><span>04</span><h3>Post & Motion</h3><p>Editing, pacing, transitions, texture, sound-led cuts and delivery formats.</p></div>
        </div>
      </section>

      <section className="statement sectionShell">
        <p className="eyebrow">APPROACH</p>
        <p className="statementText">The frame should carry evidence: imperfect light, strange timing, texture, obstruction, scale. The synthetic part stays underneath the image instead of becoming the subject.</p>
      </section>

      <section className="contact sectionShell" id="contact">
        <p className="eyebrow">NEW PROJECTS / COLLABORATIONS</p>
        <a className="contactLink" href="mailto:hello@cobecreator.com">LET&apos;S MAKE SOMETHING<br />HARD TO IGNORE.</a>
        <footer>
          <span>CO.BECREATOR © 2026</span>
          <a href="#top">BACK TO TOP ↑</a>
        </footer>
      </section>
    </main>
  );
}
