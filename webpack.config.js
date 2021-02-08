let path = require("path");
let ENV = require("./env");

module.exports = {
	mode: "development",
	devtool: ENV.hasOwnProperty("devtool") ? ENV.devtool : false,
	entry: {
		main: "./view/src/index.js",
	},
	output: {
		filename: "[name].js",
		chunkFilename: "[name].bundle.js",
		publicPath: ENV.publicPath,
		path: path.resolve(__dirname, "view/static/"),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: "url-loader",
						options: {
							mimetype: "image/png",
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"], // If no extension is added to the import file, try using these
		alias: {
			["~"]: path.resolve(__dirname, "view/src"),
		},
	},
	externals: {
		axios: "axios",
		// "@fortawesome/fontawesome-svg-core":
		// 	"@fortawesome/fontawesome-svg-core",
		// "@fortawesome/free-solid-svg-icons":
		// 	"@fortawesome/free-solid-svg-icons",
		// "@fortawesome/react-fontawesome": "@fortawesome/react-fontawesome",
	},
};
