export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  author: string;
  excerpt: string;
  body: string[];
  categories: string[];
  tags: string[];
  comments: number;
};

// SAMPLE posts: replace with your real ones
export const posts: Post[] = [
  {
    slug: "students-showcase-robots-at-stem-exhibition",
    title: "Students Showcase Robots at the Annual STEM Exhibition",
    date: "2026-09-21",
    author: "STEM Sikshya",
    excerpt:
      "Our students from Grade 5 to 12 presented line-following robots, obstacle-avoidance cars and smart devices they designed, built and programmed themselves.",
    body: [
      "This year's exhibition brought together students from our partner schools to present the robots they built over the term.",
      "From Arduino-based line followers to sensor-driven obstacle avoidance, every project was designed, wired and programmed by the students.",
    ],
    categories: ["Robotics", "Student Projects"],
    tags: ["Arduino", "Competition", "Kathmandu"],
    comments: 0,
  },
  {
    slug: "drone-training-workshop-in-kathmandu",
    title: "Drone Training Workshop Takes Off in Kathmandu",
    date: "2026-09-02",
    author: "STEM Sikshya",
    excerpt:
      "Students learned flight physics, assembled their own drones and practised manual and autonomous flight in our hands-on weekend workshop.",
    body: [
      "The workshop started with the basics of lift, thrust and stability, then moved on to assembling a DIY drone from scratch.",
      "By the end of the day, every group had completed a supervised test flight on the school ground.",
    ],
    categories: ["Drone Training", "Events"],
    tags: ["Drones", "Workshop", "Kathmandu"],
    comments: 0,
  },
  {
    slug: "why-coding-should-start-from-grade-1",
    title: "Why Coding Should Start from Grade 1",
    date: "2026-08-15",
    author: "STEM Sikshya",
    excerpt:
      "Block-based tools like PictoBlox build logical thinking early, long before students write their first line of Python.",
    body: [
      "Young learners already think in steps and patterns. Block coding gives that thinking a visual, playful form.",
      "Starting early also makes the move to text-based languages like Python far less intimidating later on.",
    ],
    categories: ["Coding"],
    tags: ["Block Coding", "PictoBlox", "Grade 1-5"],
    comments: 0,
  },
  {
    slug: "first-steps-in-python-for-school-students",
    title: "First Steps in Python for School Students",
    date: "2026-07-10",
    author: "STEM Sikshya",
    excerpt:
      "A simple path from block coding to Python: variables, loops and small projects that make programming click.",
    body: [
      "Python's readable syntax makes it an ideal first text-based language for school students.",
      "We start with tiny, visible results such as drawing, quizzes and games, so students stay motivated.",
    ],
    categories: ["Coding", "Artificial Intelligence"],
    tags: ["Python", "Workshop"],
    comments: 0,
  },
  {
    slug: "introducing-machine-learning-to-teenagers",
    title: "Introducing Machine Learning to Teenagers",
    date: "2026-06-18",
    author: "STEM Sikshya",
    excerpt:
      "Students train their own image classifiers and chatbots to understand how intelligent systems learn from data.",
    body: [
      "Using beginner-friendly tools, students collect data, train a model and test how well it performs.",
      "Seeing a model fail on new data teaches more about AI than any lecture.",
    ],
    categories: ["Artificial Intelligence", "Student Projects"],
    tags: ["Machine Learning", "Python"],
    comments: 0,
  },
  {
    slug: "iot-projects-with-arduino-and-esp",
    title: "Building IoT Projects with Arduino and ESP Boards",
    date: "2026-05-05",
    author: "STEM Sikshya",
    excerpt:
      "From a smart plant monitor to a Wi-Fi controlled car, here are the IoT projects our robotics students built this term.",
    body: [
      "IoT projects connect code to the real world: sensors read the environment and boards respond.",
      "Students learned wiring, debugging and how to send data over Wi-Fi with ESP boards.",
    ],
    categories: ["Robotics", "Student Projects"],
    tags: ["Arduino", "IoT", "Workshop"],
    comments: 0,
  },
];

/* ------------------------------ helpers ------------------------------ */

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

const fmt = (opts: Intl.DateTimeFormatOptions, d: string) =>
  new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));

export const dateLabel = (iso: string) => fmt({ month: "long", day: "numeric", year: "numeric" }, iso);
export const monthKey = (iso: string) => iso.slice(0, 7);
export const monthLabel = (key: string) => fmt({ month: "long", year: "numeric" }, `${key}-01`);

const unique = (arr: string[]) => Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));

export const allCategories = unique(posts.flatMap((p) => p.categories)).map((name) => ({
  name,
  slug: slugify(name),
}));
export const allTags = unique(posts.flatMap((p) => p.tags)).map((name) => ({
  name,
  slug: slugify(name),
}));
export const allMonths = Array.from(new Set(sortedPosts.map((p) => monthKey(p.date))));