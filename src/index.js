// Convert a string from kebab-case to camelCase
const camelCase = (string) =>
  string.replace(/-(\w|$)/g, (m, p1) => p1.toUpperCase());

const convertPropertyName = (prop) => {
  prop = prop.toLowerCase();

  // Always return 'float' as 'cssFloat'
  if (prop === 'float') {
    return 'cssFloat';
  }

  // Skip CSS variables
  if (prop.startsWith('--')) {
    return prop;
  }

  // Handle `-ms-` prefix to camelCase as msPropertyName, not MsPropertyName
  if (prop.startsWith('-ms-')) {
    prop = prop.substr(1);
  }

  return camelCase(prop);
};

const splitDeclarations = (cssText) => {
  const declarations = [];
  let capturing;
  let i = cssText.length;
  let last = i;

  // Split into declarations by semi-colon (outside quotes or parentheses)
  while (i-- > -1) {
    // Capture unescaped quotes
    if ((cssText[i] === '"' || cssText[i] === "'") && cssText[i - 1] !== '\\') {
      if (!capturing) {
        capturing = cssText[i];
      } else if (cssText[i] === capturing) {
        capturing = false;
      }
    }
    // Start capturing parentheses
    if (!capturing && cssText[i] === ')') {
      capturing = cssText[i];
    }
    // Stop capturing parentheses
    if (cssText[i] === '(' && capturing === ')') {
      capturing = false;
    }
    // Split at semi-colon
    if (i < 0 || (!capturing && cssText[i] === ';')) {
      declarations.unshift(cssText.slice(i + 1, last));
      last = i;
    }
  }

  return declarations;
};

const splitDeclaration = (declaration) => {
  const i = declaration.indexOf(':');
  return [declaration.substr(0, i).trim(), declaration.substr(i + 1).trim()];
};

const cssToStyle = (cssText) =>
  splitDeclarations(cssText)
    .map(splitDeclaration)
    .reduce((styles, [name, value]) => {
      if (name && value) {
        styles[convertPropertyName(name)] = value;
      }
      return styles;
    }, {});

export default cssToStyle;
