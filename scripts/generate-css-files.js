const fs = require('fs');

const jsonPath = '/Users/katy.martin01/Documents/GitHub/okta-demo/tokens/tokens.json';
const cssFolderPath = '/Users/katy.martin01/Documents/GitHub/okta-demo/public/css/';

const json = require(jsonPath);

function processCategory(category, path) {
  let cssContent = '';

  Object.entries(category).forEach(([key, value]) => {
    const currentPath = path ? `${path}-${key}` : key;

    if (typeof value === 'object' && value !== null && !currentPath.startsWith('$')) {
      cssContent += processCategory(value, currentPath);
    } else if (key === 'value') {
      const sanitizedVariable = currentPath
        .replace(/^semantic\//, '')
        .replace(/^System\//, '')
        .replace(/-value$/, '');

      if (category.type !== 'System/global') {
        // Reformat value for non-global variables
        const globalVariable = category.value.replace(/{|}/g, '').replace(/\./g, '-').toLowerCase();
        cssContent += `--${sanitizedVariable}: var(--global-${globalVariable});\n`;
      }
    }
  });

  return cssContent;
}

function getCSSFilePath(category) {
  if (category.startsWith('System/global')) {
    return `${cssFolderPath}global-styles.css`;
  } else if (category.startsWith('semantic/light')) {
    return `${cssFolderPath}okta-light-theme.css`;
  } else if (category.startsWith('semantic/dark')) {
    return `${cssFolderPath}okta-dark-theme.css`;
  } else if (category.startsWith('semantic/other01')) {
    return `${cssFolderPath}okta-other01-theme.css`;
  } else {
    console.log(`Unsupported category: ${category}`);
    return null;
  }
}

// Start processing from the top-level categories
const topLevelCategory = Array.isArray(json) ? json[0] : json;

// Iterate over each top-level category and write to the corresponding file
Object.keys(topLevelCategory).forEach((category) => {
  const cssContent = processCategory(topLevelCategory[category], category);
  const cssFilePath = getCSSFilePath(category);

  if (cssFilePath && cssContent.trim() !== '') {
    fs.writeFileSync(cssFilePath, `:root {\n${cssContent}}\n`, { flag: 'w' });
    console.log(`CSS file written to: ${cssFilePath}`);
  }
});

console.log('Processing complete.');
