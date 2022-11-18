module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'@typescript-eslint/no-non-null-assertion': ['off'],
		'max-len': [
			'error',
			{
				code: 120,
				tabWidth: 2,
				ignoreComments: true,
				ignoreUrls: true,
			},
		],
		'eol-last': [
			'error',
			'always'
		],
		'object-curly-spacing': [
			'error',
			'always'
		]
	}
};
