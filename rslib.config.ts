import { defineConfig } from "@rslib/core";

export default defineConfig({
	tools: {
		rspack(_config, { addRules }) {
			addRules([
				{
					test: /\.wgsl$/,
					type: "asset/source",
					generator: {
						importMode: "preserve",
					},
				},
			]);
		},
	},
	lib: [
		{
			format: "esm",
			dts: true,
		},
	],
});
