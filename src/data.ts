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

// each artwork links to its exact instagram post — matched against her @lacuna.3 grid
// by perceptual-hash over every carousel slide of each post (not just the cover), then
// visually spot-checked. 17/18 wired to their exact post. green-niche has no IG post,
// so it falls back to her profile so a tap always lands somewhere real (never a WRONG post).
const IG = "https://www.instagram.com/lacuna.3/";
const post = (sc: string) => `https://www.instagram.com/lacuna.3/p/${sc}/`;
export const gallery: { src: string; portrait: boolean; link: string }[] = [
  { src: "/lacuna/blue-portrait.jpg", portrait: true, link: post("DVQxd_5kfjv") },
  { src: "/lacuna/sharmeeli.jpg", portrait: false, link: post("DPYn3xqEUH0") },
  { src: "/lacuna/dragon.jpg", portrait: true, link: post("DWHXbB9k_3f") },
  { src: "/lacuna/faces-box.jpg", portrait: false, link: post("DSaW1qGk-66") },
  { src: "/lacuna/eye-niche.jpg", portrait: true, link: post("DQ9rN70E8PW") },
  { src: "/lacuna/queen-clubs.jpg", portrait: true, link: post("DTGFp9WEz8B") },
  { src: "/lacuna/green-niche.jpg", portrait: false, link: IG },
  { src: "/lacuna/centipede.jpg", portrait: true, link: post("DVLyJQ1Ed4f") },
  { src: "/lacuna/scream.jpg", portrait: true, link: post("DPl6oEQESH3") },
  { src: "/lacuna/blue-botanical.jpg", portrait: true, link: post("DRHyZwMk6-o") },
  { src: "/lacuna/yellow-eye.jpg", portrait: true, link: post("DSDUWhzE5eh") },
  { src: "/lacuna/bed-water.jpg", portrait: true, link: post("DTDBgi0kbK9") },
  { src: "/lacuna/passionflower.jpg", portrait: true, link: post("DRCbx_UkYko") },
  { src: "/lacuna/eyes-face.jpg", portrait: true, link: post("DTAca0-EaPg") },
  { src: "/lacuna/blue-muse.jpg", portrait: true, link: post("DZyAfFGk0U1") },
  { src: "/lacuna/photo-flowers.jpg", portrait: true, link: post("DZPA4pDEUQR") },
  { src: "/lacuna/green-pins.jpg", portrait: true, link: post("DYNdfcOk_j0") },
  { src: "/lacuna/eye-petals.jpg", portrait: true, link: post("DYVC1ebkxbi") },
];
