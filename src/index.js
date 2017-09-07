const camelCase = str => str.replace(/\-(\w|$)/g, (m, p1) => p1.toUpperCase());

const cssToStyle = cssText => {
  const declarations = [];
  let capturing;
  let i = cssText.length;
  let last = i;

  // Split into declarations by semi-colon (outside quotes or parentheses)
  while (i-- > -1) {
    // Capture unescaped quotes
    if ((cssText[i] === '"' || cssText[i] === "'") && cssText[i - 1] !== "\\") {
      if (!capturing) {
        capturing = cssText[i];
      } else if (cssText[i] === capturing) {
        capturing = false;
      }
    }
    // Start capturing parentheses
    if (!capturing && cssText[i] === ")") {
      capturing = cssText[i];
    }
    // Stop capturing parentheses
    if (cssText[i] === "(" && capturing === ")") {
      capturing = false;
    }
    // Split at semi-colon
    if (i < 0 || (!capturing && cssText[i] === ";")) {
      declarations.unshift(cssText.slice(i + 1, last));
      last = i;
    }
  }

  return declarations.reduce((styles, rule) => {
    const i = rule.indexOf(":");
    const value = rule.substr(i + 1).trim();
    let prop = rule
      .substr(0, i)
      .toLowerCase()
      .trim();
    if (prop && value) {
      if (prop === "float") {
        prop = "cssFloat";
      } else if (prop.substr(0, 4) === "-ms-") {
        prop = prop.substr(1);
      }
      styles[camelCase(prop)] = value;
    }
    return styles;
  }, {});
};

export default cssToStyle;
