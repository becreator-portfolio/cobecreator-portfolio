import Link from "next/link";
import { ManagedVideo } from "@/components/ManagedVideo";
import { MotionControl } from "@/components/MotionControl";
import { ProjectGallery } from "@/components/ProjectGallery";

const services = [
  "FILMES COM IA",
  "FILMES PUBLICITÁRIOS",
  "FILMES DE MODA",
  "VISUAIS PARA MÚSICA",
];

const processSteps = [
  "CONCEITO + DIREÇÃO",
  "LINGUAGEM VISUAL",
  "IMAGEM + MOVIMENTO",
  "EDIÇÃO + ENTREGA",
];

const marqueeText = "FILMES — CAMPANHAS — MÚSICA — MODA — DIREÇÃO — ";

export default function HomePage() {
  return (
    <main className="site" id="top">
      <header className="siteHeader">
        <Link href="#top" className="brand" aria-label="Co.becreator — início">
          Co.becreator
        </Link>

        <nav className="desktopNav" aria-label="Navegação principal">
          <Link href="#work" className="rollLink">FILMES</Link>
          <Link href="#about" className="rollLink">SOBRE</Link>
          <Link href="#contact" className="rollLink">ORÇAMENTO</Link>
        </nav>

        <Link href="#contact" className="mobileContact">CONTATO</Link>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <ManagedVideo
          src="/media/hero.mp4"
          poster="/media/hero-poster.jpg"
          className="heroVideo"
          variant="hero"
          objectPosition="50% 50%"
        />
        <div className="heroShade" aria-hidden="true" />
        <div className="heroBottomShade" aria-hidden="true" />

        <div className="heroContent sectionShell">
          <p className="heroEyebrow">DIREÇÃO CRIATIVA COM IA</p>
          <h1 className="heroTitle" id="hero-title">
            <span>IDEIAS</span>
            <span>QUE VIRAM</span>
            <span className="heroGradientText">FILME.</span>
          </h1>

          <div className="heroSide">
            <p>FILMES E VISUAIS PARA MARCAS, ARTISTAS E CAMPANHAS.</p>
            <div className="heroActions">
              <Link href="#contact" className="pillButton pillButtonLime">COMEÇAR PROJETO</Link>
              <Link href="#work" className="textAction">VER TRABALHOS ↓</Link>
            </div>
          </div>

          <Link href="#work" className="continueLink">CONTINUE ↓</Link>
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="sectionShell workIntro">
          <p className="sectionLabel sectionLabelDark">02 / PORTFÓLIO</p>
          <h2 className="workTitle" id="work-title">TRABALHOS SELECIONADOS</h2>
        </div>
        <ProjectGallery />
      </section>

      <section className="marquee" aria-label="Áreas de atuação">
        <div className="marqueeTrack">
          <span>{marqueeText.repeat(3)}</span>
          <span aria-hidden="true">{marqueeText.repeat(3)}</span>
        </div>
      </section>

      <section className="services sectionShell" id="about" aria-labelledby="services-title">
        <div className="servicesLead">
          <p className="sectionLabel sectionLabelLight">03 / O QUE EU FAÇO</p>
          <h2 className="servicesTitle" id="services-title">
            FILMES. VISUAIS.<br />CAMPANHAS.
          </h2>
        </div>

        <div className="serviceList">
          {services.map((service, index) => (
            <div className="serviceItem" key={service}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="process sectionShell" aria-labelledby="process-title">
        <p className="sectionLabel sectionLabelDark">04 / COMO EU FAÇO</p>

        <div className="processTop">
          <h2 className="processTitle" id="process-title">DA IDEIA<br />AO FILME PRONTO.</h2>
          <div className="processVisual mediaPlaceholder" role="img" aria-label="Espaço reservado para o storyboard do processo" />
        </div>

        <div className="processRail" aria-hidden="true"><span /></div>
        <div className="processSteps">
          {processSteps.map((step, index) => (
            <div className="processStep" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="experiments sectionShell" aria-labelledby="experiments-title">
        <p className="sectionLabel sectionLabelLight">05 / EXPERIMENTOS</p>
        <h2 className="experimentsTitle" id="experiments-title">IDEIAS QUE NASCEM<br />NO CAMINHO.</h2>

        <div className="experimentCanvas">
          <figure className="experiment experimentA">
            <div className="mediaPlaceholder" />
            <figcaption>AI FILM CREATOR</figcaption>
          </figure>
          <figure className="experiment experimentB">
            <div className="mediaPlaceholder" />
            <figcaption>COMERCIAL / LV AGÊNCIA</figcaption>
          </figure>
          <figure className="experiment experimentC">
            <div className="mediaPlaceholder" />
            <figcaption>PUBLI DE PRODUTO / ESTUDO DE MATERIAL</figcaption>
          </figure>
          <figure className="experiment experimentD">
            <div className="mediaPlaceholder" />
            <figcaption>DESIGN DE INTERIORES / EDUARDO CIDADE</figcaption>
          </figure>
        </div>
      </section>

      <section className="positioning sectionShell" aria-labelledby="positioning-title">
        <p className="sectionLabel sectionLabelDark">06 / ABORDAGEM</p>

        <div className="positioningGrid">
          <div className="positioningCopy">
            <h2 id="positioning-title">A IDEIA VEM PRIMEIRO.<br />A IA ENTRA DEPOIS.</h2>
            <p>MARCAS / ARTISTAS / AGÊNCIAS / PRODUTORAS</p>
            <Link href="#contact" className="pillButton pillButtonLime positioningCta">ME CONTA A IDEIA ↗</Link>
          </div>

          <div className="positioningMedia" aria-hidden="true">
            <div className="positioningOrb positioningOrbA mediaPlaceholder" />
            <div className="positioningOrb positioningOrbB mediaPlaceholder" />
            <div className="positioningLoop mediaPlaceholder" />
          </div>
        </div>
      </section>

      <section className="contact sectionShell" id="contact" aria-labelledby="contact-title">
        <p className="sectionLabel contactLabel">07 / VAMOS CONVERSAR</p>

        <div className="contactTop">
          <h2 id="contact-title">TEM UM PROJETO<br />EM MENTE?</h2>
          <p>Me conta a ideia. A gente define o próximo passo.</p>
        </div>

        <div className="contactActions" aria-label="Canais de contato em preparação">
          <button className="contactButton contactButtonPrimary" type="button" disabled title="Integração de orçamento pendente">
            PEDIR ORÇAMENTO ↗
          </button>
          <button className="contactButton" type="button" disabled title="URL de WhatsApp pendente">
            FALAR NO WHATSAPP ↗
          </button>
          <button className="contactButton" type="button" disabled title="Integração de briefing pendente">
            ENVIAR BRIEFING ↗
          </button>
        </div>

        <div className="contactLinks" aria-label="Links de contato pendentes">
          <span>WHATSAPP</span>
          <span>INSTAGRAM</span>
          <span>E-MAIL</span>
        </div>

        <footer className="siteFooter">
          <span>© 2026 BE//CREATOR</span>
          <span>FILMES / VISUAIS / DIREÇÃO CRIATIVA</span>
        </footer>
      </section>

      <MotionControl />
    </main>
  );
}
