const removeDistFolder = (file) => {
	return file.replace(/(^\.\/dist\/)|^dist\//, '');
};

module.exports = ({
	isPackage,
	projectConfig: { devServer },
	packageConfig: { packageType, source, main, umd, libraryName },
	buildFiles,
}) => {
	if (isPackage) {
		const config = {};
		const hasBuildFiles = Object.keys(buildFiles).length > 0;

		if (hasBuildFiles) {
			return buildFiles;
		}

		if (['commonjs2', 'commonjs', 'all'].includes(packageType)) {
			config.main = {
				import: `./${source}`,
				filename: removeDistFolder(main),
				library: {
					type: 'commonjs2',
				},
			};
		}

		if (umd && !devServer) {
			config.umd = {
				filename: removeDistFolder(umd),
				import: `./${source}`,
				library: { name: libraryName, type: 'umd' },
			};
		}

		return config;
	}

	return buildFiles;
};
