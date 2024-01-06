const fs = require('fs');

const jsonPath = '/Users/katy.martin01/Documents/GitHub/okta-demo/tokens/tokens.json';
const cssFolderPath = '/Users/katy.martin01/Documents/GitHub/okta-demo/public/css/';

const json = require(jsonPath);

function processCategory(category, path) {
  let cssContent = '';

  Object.entries(category).forEach(([key, value]) => {
    const currentPath = path ? `${path}-${key}` : key;

    if (typeof value === 'object' && value !== null) {
      cssContent += processCategory(value, currentPath);
    } else if (key === 'value') {
      cssContent += writeCSSVariable(currentPath.replace('System/', ''), value);
    }
  });

  return cssContent;
}

function writeCSSVariable(variable, value) {
  return `--${variable}: ${value};\n`;
}

function getCSSFilePath(category) {
  if (category.startsWith('System/global')) {
    return `${cssFolderPath}global-styles.css`;
  } else if (category.startsWith('semantic/light')) {
    return `${cssFolderPath}okta-light-theme.css`;
  } else if (category.startsWith('semantic/dark')) {
    return `${cssFolderPath}okta-dark-theme.css`;
  } else if (category.startsWith('semantic/other01')) {
    return `${cssFolderPath}okta-alternate-theme.css`;
  } else {
    throw new Error(`Unsupported category: ${category}`);
  }
}

// Start processing from the top-level categories
const cssContent = processCategory(json, '');

// Write the generated CSS content to the appropriate file
const cssFilePath = getCSSFilePath(Object.keys(json)[0]);
fs.writeFileSync(cssFilePath, `:root {\n${cssContent}}\n`, { flag: 'w' });
console.log(`CSS file written to: ${cssFilePath}`);
console.log('Processing complete.');
