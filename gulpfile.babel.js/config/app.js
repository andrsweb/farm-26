const isProd    = process.argv.includes( '--production' )
const isDev     = ! isProd

export default {
	isProd	: isProd,
	isDev	: isDev,

	htmlmin	: {
		collapseWhitespace: isProd
	},

	webpack	: {
		mode: isProd ? 'production' : 'development'
	},
}