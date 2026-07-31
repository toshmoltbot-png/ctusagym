module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/docs");
  eleventyConfig.addPassthroughCopy("src/favicon.png");

  // Parse date string - handles both "2025-10-24" and "2025-10-24T00:00:00.000Z"
  function parseDate(dateStr) {
    if (!dateStr) return new Date(NaN);
    const clean = String(dateStr).substring(0, 10); // take just YYYY-MM-DD
    return new Date(clean + "T00:00:00");
  }

  // Custom filter: group calendar events by month
  eleventyConfig.addFilter("groupByMonth", function(events) {
    const grouped = {};
    for (const event of events) {
      const d = parseDate(event.start);
      const key = d.toLocaleString("en-US", { month: "long", year: "numeric" });
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(event);
    }
    return Object.entries(grouped).map(([month, items]) => ({ month, items }));
  });

  // Format date range
  eleventyConfig.addFilter("dateRange", function(start, end) {
    const s = parseDate(start);
    const e = parseDate(end);
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
