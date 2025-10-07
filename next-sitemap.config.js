/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://laughterephraim.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/404"],

  // Custom transformation for specific routes
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === "/") {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Works page gets high priority
    if (path === "/works") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Additional paths (for hash-based sections)
  additionalPaths: async (config) => {
    const result = [];

    // Add homepage sections with hash anchors
    const sections = [
      { path: "/#home", priority: 0.9, changefreq: "monthly" },
      { path: "/#selected-works", priority: 0.9, changefreq: "weekly" },
      { path: "/#about-laughter", priority: 0.8, changefreq: "monthly" },
      { path: "/#testimonials", priority: 0.7, changefreq: "monthly" },
      { path: "/#contact-me", priority: 0.8, changefreq: "monthly" },
    ];

    for (const section of sections) {
      result.push({
        loc: section.path,
        changefreq: section.changefreq,
        priority: section.priority,
        lastmod: new Date().toISOString(),
      });
    }

    return result;
  },

  // robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/api", "/404"],
      },
    ],
    additionalSitemaps: [
      // If you add more sitemaps in the future
      // "https://laughterephraim.vercel.app/server-sitemap.xml",
    ],
  },
};
