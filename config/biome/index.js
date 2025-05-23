/** @type {import('@biomejs/biome').Config} */
const config = {
	$schema: "https://biomejs.dev/schemas/1.9.4/schema.json",
	organizeImports: {
		enabled: true,
	},
	linter: {
		enabled: true,
		rules: {
			recommended: true,
		},
	},
	formatter: {
		enabled: true,
		indentStyle: "space",
		indentWidth: 2,
		lineWidth: 80,
	},
	javascript: {
		formatter: {
			quoteStyle: "single",
			trailingComma: "all",
			semicolons: "always",
		},
	},
};

export default config;
