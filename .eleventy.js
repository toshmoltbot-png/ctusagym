module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/docs");
  eleventyConfig.addPassthroughCopy("src/favicon.png");

  // Custom filter: group calendar events by month
  eleventyConfig.addFilter("groupByMonth", function(events) {
    const grouped = {};
    for (const event of events) {
      const d = new Date(event.start + "T00:00:00");
      const key = d.toLocaleString("en-US", { month: "long", year: "numeric" });
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(event);
    }
    return Object.entries(grouped).map(([month, items]) => ({ month, items }));
  });

  // Format date range
  eleventyConfig.addFilter("dateRange", function(start, end) {
    const s = new Date(start + "T00:00:00");
    const e = new Date(end + "T00:00:00");
    const opts = { month: "short", day: "numeric", year: "numeric" };
    return `${s.toLocaleDateString("en-US", opts)}–${e.toLocaleDateString("en-US", opts)}`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
