const purgecss = require('@fullhuman/postcss-purgecss').default;
const glob = require('glob');
const path = require('path');

function expand(globPattern) {
  // Run glob from the config file's directory
  return glob.sync(globPattern, {
    cwd: path.resolve(__dirname),
    absolute: true,
  });
}

module.exports = {
  plugins: [
    purgecss({
      content: [
        ...expand('src/**/*.{js,jsx,html}'),
        ...expand('public/**/*.{js,html}')
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  ]
};
