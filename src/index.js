const camelCase = str => str.replace(/\-(\w|$)/g, (m, p1) => p1.toUpperCase());

const cssToStyle = cssText =>
  cssText.split(/;(?=[^\)]*(?:\(|$))/).reduce((styles, rule) => {
    const i = rule.indexOf(":");
    let prop = rule
      .substr(0, i)
      .trim()
      .toLowerCase();
    const value = rule.substr(i + 1).trim();
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

export default cssToStyle;
