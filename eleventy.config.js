import path from "node:path";
import * as sass from "sass";

// i18n

import i18n from "eleventy-plugin-i18n";
import translations from "./code/_data/i18n/index.js";

//CONFIG VIA METHOD

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      "*": "en",
    },
  });

  //COPIAR Y PEGAR CARPETAS A DOCS
  eleventyConfig.addPassthroughCopy("code/css");
  eleventyConfig.addPassthroughCopy("code/fonts");
  eleventyConfig.addPassthroughCopy("code/js");
  eleventyConfig.addPassthroughCopy("code/en");
  eleventyConfig.addPassthroughCopy("code/es");
  eleventyConfig.addPassthroughCopy("code/sl");
  eleventyConfig.addPassthroughCopy("code/styles");

  //SASS
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    // opt-out of Eleventy Layouts
    useLayouts: false,

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      // Don’t compile file names that start with an underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      // Map dependencies for incremental builds
      this.addDependencies(inputPath, result.loadedUrls);

      return async (data) => {
        return result.css;
      };
    },
  });

  return {
    dir: {
      input: "code",
      output: "docs",
    },
  };
}
