const pkg = require('./package.json');
const year = new Date().getFullYear();

module.exports = (e) => {
	const file = e.file && e.file.basename ? e.file.basename : '';
	const dir = e.file && e.file.dirname ? e.file.dirname : '';

	const plugins = [
		require('postcss-import'),
	];

	if (dir.includes('addons')) {
		plugins.push(
			require('postcss-header')({
				header: [
					'/*!',
					' * Quintsea CSS Addon (' + file + ')',
					' */',
				].join('\n'),
			})
		);
	} else if (dir.includes('themes')) {
		plugins.push(
			require('postcss-header')({
				header: [
					'/*!',
					' * Quintsea CSS Theme (' + file + ')',
					' */',
				].join('\n'),
			})
		);
	} else {
		plugins.push(
			require('postcss-header')({
				header: [
					'/*!',
					' * Quintsea CSS v' + pkg.version + ' (' + pkg.homepage + ')',
					' * (c) ' + year + ' | ' + pkg.license + ' License',
					' */\n',
				].join('\n'),
			})
		);
	}

	return {
		plugins
	};
};