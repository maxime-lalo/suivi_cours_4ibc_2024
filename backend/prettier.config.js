module.exports = {
	overrides: [
		{
			files: [
				"./*.ts",
				"./*.tsx",
				"./*.json",
				"src/**/*.ts",
				"src/**/*.tsx",
				"src/**/*.scss",
				"./*.js",
			],
			options: {
				tabWidth: 4,
				useTabs: true,
				singleQuote: false,
				trailingComma: "all",
				printWidth: 160,
				semi: true,
				bracketSameLine: true,
			},
		},
	],
};
