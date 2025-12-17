export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601
  readTimeMinutes: number;
  category: string;
  tags: string[];
  heroImage: string;
  seo: {
    title: string;
    description: string;
  };
  content: {
    type: "heading" | "paragraph" | "list";
    text?: string;
    items?: string[];
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "top-10-gadgets-2025",
    title: "Top 10 Guerrilla Gadgets Every Creator Needs in 2025",
    excerpt:
      "From desk lights to stealthy carry, these are the 10 gadgets we actually use in our own setups.",
    date: "2025-01-10",
    readTimeMinutes: 8,
    category: "Buying Guides",
    tags: ["gadgets", "creator setup", "buying guide"],
    heroImage:
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1600",
    seo: {
      title: "Top 10 Gadgets for Creators in 2025 | Guerrilla Social Club",
      description:
        "The 10 must-have gadgets every creator should have in 2025 – curated by the Guerrilla Social Club team.",
    },
    content: [
      {
        type: "paragraph",
        text:
          "Algorithms change. Good gear doesn\'t. We pulled data from our community, order history, and real creator setups to rank the 10 gadgets that punch way above their price.",
      },
      {
        type: "heading",
        text: "What makes a gadget \"guerrilla-grade\"?",
      },
      {
        type: "list",
        items: [
          "It solves a real, annoying problem for creators.",
          "It\'s affordable enough to recommend to your audience.",
          "It survives being tossed into a bag, not just sitting on a shelf.",
        ],
      },
      {
        type: "paragraph",
        text:
          "From lighting to cable management, everything on this list is something we\'d happily run in our own studio or EDC.",
      },
    ],
  },
  {
    slug: "why-we-ship-fast",
    title: "Why Guerrilla Social Club Obsesses Over Shipping Speed",
    excerpt:
      "Dropshipping doesn\'t have to mean mystery ship times. Here\'s how we keep it tight.",
    date: "2025-02-02",
    readTimeMinutes: 6,
    category: "Behind the Brand",
    tags: ["shipping", "operations", "trust"],
    heroImage:
      "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1600",
    seo: {
      title: "Fast Shipping, Even with Dropshipping | Guerrilla Social Club",
      description:
        "Learn how Guerrilla Social Club uses vetted suppliers and smart routing to keep shipping times predictable.",
    },
    content: [
      {
        type: "paragraph",
        text:
          "We started Guerrilla Social Club as frustrated customers. We knew dropshipping could be better – transparent, curated, and fast enough to trust.",
      },
      {
        type: "heading",
        text: "Curated suppliers only",
      },
      {
        type: "paragraph",
        text:
          "Every product passes a test order before it ever hits the site. If shipping, packaging, or quality disappoints us, it doesn\'t make the cut.",
      },
    ],
  },
  {
    slug: "build-neon-room-setup",
    title: "How to Build a Neon Room Setup That Still Looks Clean",
    excerpt:
      "Neon doesn\'t have to mean visual chaos. Here\'s how to keep things sharp on and off camera.",
    date: "2025-03-15",
    readTimeMinutes: 7,
    category: "Setup Guides",
    tags: ["room decor", "lighting", "aesthetic"],
    heroImage:
      "https://images.pexels.com/photos/3166817/pexels-photo-3166817.jpeg?auto=compress&cs=tinysrgb&w=1600",
    seo: {
      title: "Neon Room Setup Guide | Guerrilla Social Club",
      description:
        "Design a neon room setup that looks incredible on camera without turning into cable spaghetti.",
    },
    content: [
      {
        type: "paragraph",
        text:
          "Most neon setups fall apart when the lights turn off and the camera shuts down. We prefer spaces that feel good to live in, not just film in.",
      },
      {
        type: "heading",
        text: "Start with one hero wall",
      },
      {
        type: "paragraph",
        text:
          "Pick a single wall or corner to treat as your \"set\" and build up from there with strips, signs, and a clean foreground.",
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.slice().sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentPosts(limit: number = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}
