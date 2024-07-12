const webpack = require("webpack");

module.exports = {
    resolve: {
        fallback: {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            assert: require.resolve("assert"),
            zlib: require.resolve("browserify-zlib"),
            buffer: require.resolve("buffer"),
            util: require.resolve("util"),
            process: require.resolve("process/browser"),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
};
