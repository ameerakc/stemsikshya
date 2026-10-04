import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import GalleryMotion from "@/components/GalleryMotion";
import {
  type Post,
  posts,
  sortedPosts,
  allCategories,
  allTags,
  allMonths,
  slugify,
  dateLabel,
  monthKey,
  monthLabel,
} from "@/lib/gallery";

export const metadata = {
  title: "Gallery – STEM Sikshya",
  description: "Stories, projects and news from STEM Sikshya classrooms.",
};

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

// Link / accent color. Your screenshot uses a vivid blue (#2a14e8); this uses the site navy.
const BRAND = "#1c3d7a";

const socials = [
  { href: "https://www.facebook.com/profile.php?id=61587347109625", label: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", fill: true },
  { href: "https://np.linkedin.com/company/stem-sikshya", label: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", fill: true },
];

/* ------------------------------ icons ------------------------------ */

function Ico({ children, size = 14, stroke = BRAND }: { children: React.ReactNode; size?: number; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="shrink-0"
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
const IUser = () => <Ico><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></Ico>;
const IClock = () => <Ico><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Ico>;
const IBook = () => <Ico><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z" /><path d="M5 17a3 3 0 0 1 3-3h11" /></Ico>;
const ITag = () => <Ico><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1" /></Ico>;
const IChat = () => <Ico><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.3A8 8 0 1 1 21 12z" /></Ico>;
const IChevron = () => <Ico size={16}><path d="M9 6l6 6-6 6" /></Ico>;
const ICopy = () => <Ico size={16}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></Ico>;
const ISearch = () => <Ico size={18}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></Ico>;

/* ------------------------------ small parts ------------------------------ */

function LinkList({ items, base }: { items: string[]; base: string }) {
  return (
    <>
      {items.map((name, i) => (
        <span key={name}>
          <Link href={`${base}/${slugify(name)}`} className="transition-colors hover:text-[#0a0a0a]" style={{ ["--c" as string]: BRAND }}>
            {name}
          </Link>
          {i < items.length - 1 ? ", " : ""}
        </span>
      ))}
    </>
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <ul className="mt-5 flex flex-wrap items-center gap-x-[clamp(1rem,1.8vw,1.75rem)] gap-y-2 text-[13px] text-[#777]">
      <li className="flex items-center gap-2"><IUser />{post.author}</li>
      <li className="flex items-center gap-2"><IClock />{dateLabel(post.date)}</li>
      <li className="flex items-center gap-2"><IBook /><span><LinkList items={post.categories} base="/gallery/category" /></span></li>
      <li className="flex items-center gap-2"><ITag /><span><LinkList items={post.tags} base="/gallery/tag" /></span></li>
      <li className="flex items-center gap-2"><IChat />{post.comments} Comments</li>
    </ul>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="g-card rounded-xl border border-black/[0.08] bg-white p-[clamp(1.5rem,2.2vw,2.25rem)]">
      <h3 className="relative border-b border-black/10 pb-3 text-[1.1rem] font-semibold text-[#0a0a0a]">
        {title}
        <span className="absolute -bottom-px left-0 h-[2px] w-[55%]" style={{ background: BRAND }} />
      </h3>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Sidebar({ q, activeCategory }: { q: string; activeCategory?: string }) {
  return (
    <aside className="g-side space-y-[clamp(1.25rem,1.9vw,1.75rem)]">
      {/* Search (plain GET form, no JavaScript needed) */}
      <form action="/gallery" method="get" role="search" className="g-card flex overflow-hidden rounded-lg border border-black/[0.08] bg-white">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Type search keyword..."
          aria-label="Search the gallery"
          className="h-[54px] min-w-0 flex-1 bg-transparent px-4 text-[14px] text-[#111] outline-none placeholder:text-black/40"
        />
        <button type="submit" aria-label="Search" className="flex h-[54px] w-[54px] items-center justify-center border-l border-black/[0.08] transition-colors hover:bg-black/[0.03]">
          <ISearch />
        </button>
      </form>

      <Card title="Categories">
        <ul className="space-y-[clamp(0.9rem,1.4vw,1.25rem)]">
          {allCategories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/gallery/category/${c.slug}`}
                className={`flex items-center gap-2 text-[15px] transition-transform duration-300 hover:translate-x-1 ${activeCategory === c.slug ? "font-semibold" : ""}`}
                style={{ color: BRAND }}
              >
                <IChevron />
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Archives">
        <ul className="space-y-[clamp(0.9rem,1.4vw,1.25rem)]">
          {allMonths.map((m) => (
            <li key={m}>
              <Link href={`/gallery/archive/${m}`} className="flex items-center gap-2 text-[15px] transition-transform duration-300 hover:translate-x-1" style={{ color: BRAND }}>
                <ICopy />
                {monthLabel(m)}
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Tags">
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link
              key={t.slug}
              href={`/gallery/tag/${t.slug}`}
              className="rounded-md border border-black/[0.08] px-3 py-1.5 text-[13px] tracking-wide text-[#777] transition-colors hover:border-[color:var(--c)] hover:text-[color:var(--c)]"
              style={{ ["--c" as string]: BRAND }}
            >
              {t.name}
            </Link>
          ))}
        </div>
      </Card>

      <Card title="Blog Posts">
        <ul>
          {sortedPosts.slice(0, 3).map((p, i, arr) => (
            <li key={p.slug} className={`py-4 first:pt-0 ${i < arr.length - 1 ? "border-b border-black/[0.08]" : "pb-0"}`}>
              <Link href={`/gallery/post/${p.slug}`} className="text-[14px] leading-snug text-[#111] transition-colors hover:text-[color:var(--c)]" style={{ ["--c" as string]: BRAND }}>
                {p.title}
              </Link>
              <p className="mt-2 text-[12px]" style={{ color: BRAND }}>{dateLabel(p.date)}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Social">
        <div className="flex gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#eef3fa] text-[#111] transition-all duration-300 hover:-translate-y-1 hover:text-white hover:bg-[color:var(--c)]"
              style={{ ["--c" as string]: BRAND }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d={s.d} /></svg>
            </a>
          ))}
        </div>
      </Card>
    </aside>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <GalleryMotion>
      <section className="bg-[#eff4f8] pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(7rem,10vw,9.5rem)]">
        <h1 className="site-container overflow-hidden pb-[0.1em] text-center text-[clamp(1.8rem,2.8vw,2.8rem)] font-bold leading-tight text-[#0a0a0a]">
          <span className="g-title inline-block">{title}</span>
        </h1>
      </section>
      {children}
    </GalleryMotion>
  );
}

/* ------------------------------ page ------------------------------ */

type Props = {
  params: Promise<{ filter?: string[] }>;
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function GalleryPage({ params, searchParams }: Props) {
  const { filter = [] } = await params;
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q ?? "").trim();
  const [kind, value] = filter;

  let list = sortedPosts;
  let title = "Gallery";
  let activeCategory: string | undefined;

  /* ----- Single post ----- */
  if (kind === "post") {
    const post = posts.find((p) => p.slug === value);
    if (!post) notFound();

    return (
      <>
        <Navbar />
        <main className="relative z-10 bg-white" style={sans}>
          <Shell title={post.title}>
            <div className="site-container py-[clamp(3rem,6vw,6rem)]">
              <div className="mx-auto max-w-[820px]">
                <Meta post={post} />
                <div className="mt-8 space-y-6 text-[clamp(1rem,0.3vw+0.9rem,1.15rem)] leading-[1.85] text-[#555]">
                  {post.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <Link href="/gallery" className="mt-12 inline-flex h-[43px] items-center rounded-lg border px-5 text-sm transition-colors hover:text-white hover:bg-[color:var(--c)]" style={{ borderColor: BRAND, color: BRAND, ["--c" as string]: BRAND }}>
                  ← Back to Gallery
                </Link>
              </div>
            </div>
          </Shell>
        </main>
        <SiteFooter />
        <Footer />
        <ScrollProgress />
      </>
    );
  }

  /* ----- Filters ----- */
  if (kind === "category") {
    const cat = allCategories.find((c) => c.slug === value);
    if (!cat) notFound();
    list = list.filter((p) => p.categories.includes(cat.name));
    title = cat.name;
    activeCategory = cat.slug;
  } else if (kind === "tag") {
    const tag = allTags.find((t) => t.slug === value);
    if (!tag) notFound();
    list = list.filter((p) => p.tags.includes(tag.name));
    title = `Tag: ${tag.name}`;
  } else if (kind === "archive") {
    if (!value || !allMonths.includes(value)) notFound();
    list = list.filter((p) => monthKey(p.date) === value);
    title = monthLabel(value);
  } else if (kind) {
    notFound();
  }

  if (q) {
    const needle = q.toLowerCase();
    list = list.filter((p) => `${p.title} ${p.excerpt}`.toLowerCase().includes(needle));
    title = `Search: ${q}`;
  }

  return (
    <>
      <Navbar />
      <main className="relative z-10 bg-white" style={sans}>
        <Shell title={title}>
          <div className="site-container py-[clamp(3rem,6vw,6.5rem)]">
            <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-[minmax(0,1fr)_clamp(290px,27.5%,410px)] lg:gap-x-[clamp(2rem,5.5vw,6rem)]">
              {/* Posts */}
              <div>
                {list.length === 0 ? (
                  <div className="py-10">
                    <p className="text-[clamp(1.1rem,1.5vw,1.5rem)] text-[#111]">No posts found.</p>
                    <Link href="/gallery" className="mt-4 inline-block text-sm underline underline-offset-4" style={{ color: BRAND }}>
                      View all posts
                    </Link>
                  </div>
                ) : (
                  list.map((post) => (
                    <article key={post.slug} className="g-post border-b border-black/[0.07] py-[clamp(2rem,3.4vw,3.5rem)] first:pt-0 last:border-b-0">
                      <h2 className="text-[clamp(1.45rem,2.3vw,2.4rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-[#0a0a0a]">
                        <Link href={`/gallery/post/${post.slug}`} className="transition-colors hover:text-[color:var(--c)]" style={{ ["--c" as string]: BRAND }}>
                          {post.title}
                        </Link>
                      </h2>
                      <Meta post={post} />
                      <p className="mt-7 max-w-[760px] text-[clamp(0.95rem,0.25vw+0.88rem,1.075rem)] leading-[1.85] text-[#666]">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/gallery/post/${post.slug}`}
                        className="group mt-8 inline-flex h-[43px] items-center gap-3 rounded-lg border px-5 text-sm transition-colors duration-300 hover:bg-[#eef3fa]"
                        style={{ borderColor: BRAND, color: BRAND }}
                      >
                        Continue Reading
                        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                          <circle cx="12" cy="12" r="11" fill="currentColor" />
                          <path d="M7 12h10M13 8l4 4-4 4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </article>
                  ))
                )}
              </div>

              <Sidebar q={q} activeCategory={activeCategory} />
            </div>
          </div>
        </Shell>
      </main>
      <SiteFooter />
      <Footer />
      <ScrollProgress />
    </>
  );
}