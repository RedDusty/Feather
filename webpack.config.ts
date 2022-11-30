import path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import compressionPlugin from 'compression-webpack-plugin';
import miniSvgDataURI from 'mini-svg-data-uri';

const isProd = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
	mode: isProd ? 'production' : 'development',
	entry: [
		path.resolve(__dirname, 'src', 'index.tsx'),
		path.resolve(__dirname, 'src', 'canvas.ts'),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle-[hash].js',
		clean: true
	},
	devtool: isProd ? false : 'eval-source-map',
	devServer: {
		hot: true,
		liveReload: false,
	},
	resolve: {
		extensions: ['.ts', '.js', '.tsx', '.jsx'], 
		plugins: [new TsconfigPathsPlugin({
			baseUrl: __dirname,
			extensions: ['js', 'ts', 'jsx', 'tsx'],
		})],
		alias: {
			'@assets': path.resolve(__dirname, 'src', 'assets'),
			'@scripts': path.resolve(__dirname, 'src', 'scripts'),
			'@typings': path.resolve(__dirname, 'src', 'types'),
			'@components': path.resolve(__dirname, 'src', 'components'),
			'@feather': path.resolve(__dirname, 'src', 'feather'),
			'@redux': path.resolve(__dirname, 'src', 'redux'),
			'@canvas': path.resolve(__dirname, 'src', 'canvas.ts')
		}
	},
	module: {
		rules: [
			{
				test: /.(j|t)s(x)?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						babelrc: true,
					}
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.(woff|woff2|ttf|eot|otf)([?]?.*)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name].[ext]'
				}
			},
			{
				test: /\.(png|jpe?g|gif|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/[name].[ext]',
				},
			},
			{
				test: /\.svg$/,
				type: 'asset/inline',
				generator: {
					dataUrl: (content: string) => {
						content = content.toString();
						return miniSvgDataURI(content);
					}
				}
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
			filename: 'index.html',
			favicon: path.resolve(__dirname, 'src', 'assets', 'logo.png'),
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: isProd ? 'css/[name].css': 'css/[name].css' ,
			chunkFilename: isProd ? 'css/[id].css' : 'css/[id].css'

		}),
		isProd! ? new webpack.HotModuleReplacementPlugin() : () => {return false;},
		isProd ? new compressionPlugin({ test: /\.js$/, algorithm: 'gzip' }) : () => {return false;}
	],
};

export default config;
