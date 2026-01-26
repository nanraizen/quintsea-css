const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const {
	minify
} = require('terser');
const pkg = require('./package.json');
const year = new Date().getFullYear();

const srcDir = path.join(__dirname, 'src/js');
const outDir = path.join(__dirname, 'js');

const jsHeader = [
	'/*!',
	' * Quintsea CSS v' + pkg.version + ' (' + pkg.homepage + ')',
	' * (c) 2025-' + year + ' | ' + pkg.license + ' License',
	' */'
];

const newLine = jsHeader.join('\n') + '\n';
const noLine = jsHeader.join('\n');

(async function run() {
	try {
		if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {
			recursive: true
		});

		const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.js'));

		for (const file of files) {
			const srcPath = path.join(srcDir, file);
			const minPath = path.join(outDir, file.replace(/\.js$/, '.min.js'));
			const outPath = path.join(outDir, file);

			const content = await fsp.readFile(srcPath, 'utf8');

			const minified = await minify(content, {
				compress: true,
				mangle: true,
				output: {
					comments: false
				}
			});
			await fsp.writeFile(minPath, noLine + minified.code, 'utf8');

			const beautified = await minify(minified.code, {
				compress: false,
				mangle: false,
				output: {
					beautify: true,
					comments: false,
					indent_level: 2
				}
			});

			await fsp.writeFile(outPath, newLine + beautified.code, 'utf8');
		}

		console.log('Done.');
	} catch (err) {
		console.error(err);
	}
})();