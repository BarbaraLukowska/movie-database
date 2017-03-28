//Konfiguracja Webpack

module.exports = {
    entry: ['whatwg-fetch', './js/app.jsx'],
    output: {
        filename: "./js/out.js"
     },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'stage-2', 'react'] }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", 'resolve-url-loader', "sass-loader?sourceMap"]
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }


        ]
    }
}
