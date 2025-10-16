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
					' * Quintsea CSS Addon (' + file + ') v' + pkg.version,
					' */',
				].join('\n'),
			})
		);
	} else if (dir.includes('themes')) {
		plugins.push(
			require('postcss-header')({
				header: [
					'/*!',
					' * Quintsea CSS Theme (' + file + ') v' + pkg.version,
					' */',
				].join('\n'),
			})
		);
	} else {
		plugins.push(
			require('postcss-header')({
				header: [
					'/*!',
					' * Quintsea CSS v' + pkg.version + ' (https://quintsea.nanraizen.me)',
					' * (c) ' + year + ' | MIT License',
					' */',
				].join('\n'),
			})
		);
	}

	return {
		plugins
	};
};