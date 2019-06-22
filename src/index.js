const camelCase = str => str.replace(/\-(\w|$)/g, (m, p1) => p1.toUpperCase());

const convertPropertyName = prop => {
  // Skip CSS variables
  if (prop.substr(0, 2) === '--') {
    return prop;
  }

  prop = prop.toLowerCase();

  // Always return 'float' as 'cssFloat'
  if (prop === 'float') {
    return 'cssFloat';
  }

  // Handle `-ms-` prefx to camelCase as msPropertyName, not MsPropertyName
  if (prop.substr(0, 4) === '-ms-') {
    prop = prop.substr(1);
  }

  return camelCase(prop);
};

const cssToStyle = cssText => {
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

  return declarations.reduce((styles, rule) => {
    const i = rule.indexOf(':');
    const value = rule.substr(i + 1).trim();
    const prop = rule.substr(0, i).trim();
    if (prop && value) {
      styles[convertPropertyName(prop)] = value;
    }
    return styles;
  }, {});
};

export default cssToStyle;
