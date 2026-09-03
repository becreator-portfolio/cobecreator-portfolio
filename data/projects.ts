export type Project = {
  slug: string;
  index: string;
  title: string;
  displayTitle: string;
  meta: string;
  year: string;
  video: string;
  poster?: string;
  objectPosition?: string;
};

export const projects: Project[] = [
  {
    slug: "block-office",
    index: "01",
    title: "Block Office",
    displayTitle: "BLOCK OFFICE / FILME DE MODA",
    meta: "MODA · FILME · 2026",
    year: "2026",
    video: "/media/block-office.mp4",
    poster: "/media/block-office-poster.jpg",
    objectPosition: "50% 50%",
  },
  {
    slug: "nos-contra-o-mundo",
    index: "02",
    title: "Nós Contra o Mundo",
    displayTitle: "ALBUM NÓS CONTRA O MUNDO / RIRI & SLIME CUNHA",
    meta: "VISUALIZER · 2026",
    year: "2026",
    video: "/media/nos-contra-o-mundo.mp4",
    poster: "/media/nos-contra-o-mundo-poster.jpg",
    objectPosition: "50% 50%",
  },
  {
    slug: "peso-da-historia",
    index: "03",
    title: "Peso da História",
    displayTitle: "PESO DA HISTÓRIA / CANAL LAERTE VIANA NA ÁREA - MMA",
    meta: "EDIÇÃO DE VIDEO · STORYTELLING · 2026",
    year: "2026",
    video: "/media/peso-da-historia.mp4",
    poster: "/media/peso-da-historia-poster.jpg",
    objectPosition: "50% 50%",
  },
];
