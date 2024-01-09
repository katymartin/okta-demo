const fs = require('fs');

const jsonPath = '/Users/katy.martin01/Documents/GitHub/okta-demo/tokens/tokens.json';
const cssFolderPath = '/Users/katy.martin01/Documents/GitHub/okta-demo/public/css/';

const json = require(jsonPath);

function processCategory(category, path, isGlobal) {
  let cssContent = '';

  Object.entries(category).forEach(([key, value]) => {
    const currentPath = path ? `${path}-${key}` : key;

    // Skip processing if key starts with "$"
    if (key.startsWith('$')) {
      return;
    }

    if (typeof value === 'object' && value !== null && !currentPath.startsWith('$')) {
      cssContent += processCategory(value, currentPath, isGlobal);
    } else if (key === 'value') {
      const sanitizedVariable = currentPath
        .replace(/^semantic\//, '')
        .replace(/^System\//, '')
        .replace(/-value$/, '');

      if (isGlobal) {
        // Write value directly for global variables
        cssContent += `--${sanitizedVariable.toLowerCase()}: ${value};\n`;
      } else {
        // Reformat value for non-global variables
        const globalVariable = value.replace(/{|}/g, '').replace(/\./g, '-').toLowerCase();
        cssContent += `--${sanitizedVariable.toLowerCase()}: var(--global-${globalVariable});\n`;
      }
    }
  });

  return cssContent;
}

function getCSSFilePath(category) {
  if (category.startsWith('System/global')) {
    return `${cssFolderPath}global-styles.css`;
  } else if (category.startsWith('semantic/oktane')) {
    return `${cssFolderPath}oktane-theme.css`;
  }
  else if (category.startsWith('semantic/okta')) {
    return `${cssFolderPath}okta-theme.css`;
  } else if (category.startsWith('semantic/devx')) {
    return `${cssFolderPath}devx-theme.css`;
  }  else {
    console.log(`Unsupported category: ${category}`);
    return null;
  }
}

// Start processing from the top-level categories
const topLevelCategory = Array.isArray(json) ? json[0] : json;

// Iterate over each top-level category and write to the corresponding file
Object.keys(topLevelCategory).forEach((category) => {
  const isGlobal = category.startsWith('System/global');
  const cssContent = processCategory(topLevelCategory[category], category, isGlobal);
  const cssFilePath = getCSSFilePath(category);

  if (cssFilePath && cssContent.trim() !== '') {
    // Import global-styles.css only if not a global file
    const importStatement = isGlobal ? '' : `@import 'global-styles.css';\n`;
    fs.writeFileSync(cssFilePath, `${importStatement}\n:root {\n${cssContent}\n}\n`, { flag: 'w' });
    console.log(`CSS file written to: ${cssFilePath}`);
  }
});

console.log('Processing complete.');
