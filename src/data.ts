// ── shreyshi thapliyal — content (extracted from her live site) ──

export const profile = {
  name: "shreyshi.",
  tagline: "i believe in the process of making.",
  role: "visual communication designer, uttarakhand, india",
  location: "dehradun, in",
};

// selected work (homepage)
export const work: { title: string; kind: string; meta: string; url: string }[] = [
  {
    title: "fable vs goodreads",
    kind: "comparative infographics",
    meta: "curating and exploration, my process, design thinking",
    url: "https://www.behance.net/gallery/246810579/Infographics-(-FABLE-vs-GOODREADS)",
  },
  {
    title: "rules for surviving in hostel",
    kind: "illustrated guide",
    meta: "witty writing skills, graphics",
    url: "https://www.behance.net/gallery/246438427/Rules-For-Surviving-In-Hostel",
  },
  {
    title: "never ending story",
    kind: "brand guidelines",
    meta: "copy writing, design thinking, logo",
    url: "/never-ending-story.pdf",
  },
  {
    title: "dhong",
    kind: "an audioplay · collab",
    meta: "group work, sound design, storyboarding",
    url: "https://www.behance.net/gallery/245294185/Dhong-an-audioplay",
  },
  {
    title: "escape the rush",
    kind: "a zine",
    meta: "take a break project, touch grass",
    url: "https://www.behance.net/gallery/246050545/Escape-The-Rush-(zine)",
  },
];

// current work
export const currentWork: { title: string; meta: string; url: string }[] = [
  { title: "playit", meta: "branding · documentation", url: "https://bykins.com/work/play-it" },
  { title: "lml", meta: "branding · design system", url: "https://bykins.com/work/lml" },
];

// elsewhere
export const links: { name: string; url: string }[] = [
  { name: "instagram", url: "https://www.instagram.com/lacuna.3/" },
  { name: "behance", url: "https://www.behance.net/shreyshthapliy" },
  { name: "linkedin", url: "https://www.linkedin.com/in/shreyshi-thapliyal-34b490240/" },
  { name: "email", url: "mailto:shreyshithapliyal.st@gmail.com" },
];

// what i can do
export const skills =
  "editorial · graphic design · editing · typography · photography · videography · storyboarding · paint on clothes · illustration · & much more";

// lacuna gallery (the journal — /lacuna)
export const lacunaMeta = {
  definition: "noun · a gap, a blank space",
  heading: "lacuna",
  line: "a blank canvas, the one i paint on.",
  song: "longing",
};

// each artwork links to its instagram post. only 2 are confidently matched to an
// exact post (blue-portrait + dragon, verified by image + caption); the rest fall
// back to her IG profile so a tap always lands somewhere real (never a wrong post).
// → ohm: to wire more exact posts, set `link` to the /p/<shortcode>/ url per piece.
const IG = "https://www.instagram.com/lacuna.3/";
export const gallery: { src: string; alt: string; portrait: boolean; link: string }[] = [
  { src: "/lacuna/blue-portrait.jpg", alt: "lacuna portrait", portrait: true, link: "https://www.instagram.com/lacuna.3/p/DVQxd_5kfjv/" },
  { src: "/lacuna/sharmeeli.jpg", alt: "sharmeeli", portrait: false, link: IG },
  { src: "/lacuna/dragon.jpg", alt: "evil eye dragon", portrait: true, link: "https://www.instagram.com/lacuna.3/p/DWHXbB9k_3f/" },
  { src: "/lacuna/faces-box.jpg", alt: "faces in a box", portrait: false, link: IG },
  { src: "/lacuna/eye-niche.jpg", alt: "eye niche", portrait: true, link: IG },
  { src: "/lacuna/queen-clubs.jpg", alt: "queen of clubs", portrait: true, link: IG },
  { src: "/lacuna/green-niche.jpg", alt: "green niche", portrait: false, link: IG },
  { src: "/lacuna/centipede.jpg", alt: "centipede", portrait: true, link: IG },
  { src: "/lacuna/scream.jpg", alt: "scream", portrait: true, link: IG },
  { src: "/lacuna/blue-botanical.jpg", alt: "blue botanical", portrait: true, link: IG },
  { src: "/lacuna/yellow-eye.jpg", alt: "yellow eye", portrait: true, link: IG },
  { src: "/lacuna/bed-water.jpg", alt: "bed of water", portrait: true, link: IG },
  { src: "/lacuna/passionflower.jpg", alt: "passionflower", portrait: true, link: IG },
  { src: "/lacuna/eyes-face.jpg", alt: "eyes on a face", portrait: true, link: IG },
  { src: "/lacuna/blue-muse.jpg", alt: "blue muse", portrait: true, link: IG },
  { src: "/lacuna/photo-flowers.jpg", alt: "photo with flowers", portrait: true, link: IG },
  { src: "/lacuna/green-pins.jpg", alt: "green pins", portrait: true, link: IG },
  { src: "/lacuna/eye-petals.jpg", alt: "eye petals", portrait: true, link: IG },
];
