import path from "node:path";
import * as sass from "sass";

//CONFIG VIA METHOD

export default function (eleventyConfig) {

	//COPIAR Y PEGAR CARPETAS A DOCS
	eleventyConfig.addPassthroughCopy("code/css");
	eleventyConfig.addPassthroughCopy("code/fonts");
	eleventyConfig.addPassthroughCopy("code/img");
	eleventyConfig.addPassthroughCopy("code/js");
	eleventyConfig.addPassthroughCopy("code/pdf");
	
	//SASS
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",

		// opt-out of Eleventy Layouts
		useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			// Don’t compile file names that start with an underscore
			if(parsed.name.startsWith("_")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
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
};