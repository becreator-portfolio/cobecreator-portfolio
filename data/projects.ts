export type Project = {
  slug: string;
  index: string;
  title: string;
  discipline: string;
  year: string;
  description: string;
  video?: string;
  poster?: string;
};

export const projects: Project[] = [
  {
    slug: "synthetic-memory",
    index: "01",
    title: "Synthetic Memory",
    discipline: "AI Film / Direction",
    year: "2026",
    description: "A study in unreliable memory, low-resolution image culture and physically imperfect synthetic cinema.",
    video: "/media/synthetic-memory.mp4",
  },
  {
    slug: "street-luxury",
    index: "02",
    title: "Street Luxury",
    discipline: "Fashion Film / Visual Direction",
    year: "2026",
    description: "Underground fashion language colliding with ordinary spaces, direct flash and absurd objects treated as routine.",
    video: "/media/street-luxury.mp4",
  },
  {
    slug: "after-hours",
    index: "03",
    title: "After Hours",
    discipline: "Creative Direction / Moving Image",
    year: "2026",
    description: "Nightlife fragments built around intrusive framing, CCD texture, hard specular light and accidental composition.",
    video: "/media/after-hours.mp4",
  },
];
