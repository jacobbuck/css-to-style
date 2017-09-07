var expect = require("expect");
var cssToStyle = require("../lib").default;

describe("css-to-style", function() {
  it("transforms a rule", function() {
    expect(cssToStyle("color: red")).toEqual({ color: "red" });
  });

  it("transforms multiple rules", function() {
    expect(cssToStyle("color: red; font-size: 2em; opacity: 1;")).toEqual({
      color: "red",
      fontSize: "2em",
      opacity: "1",
    });
  });

  it("transforms rules with browser prefixes", function() {
    expect(
      cssToStyle("-webkit-transform: scale(2); -ms-transform: scale(2);")
    ).toEqual({ WebkitTransform: "scale(2)", msTransform: "scale(2)" });
  });

  it("transforms float rule property to cssFloat", function() {
    expect(cssToStyle("float: left")).toEqual({ cssFloat: "left" });
  });

  it("transforms rules with dataurls", function() {
    expect(
      cssToStyle("cursor: url(data:image/gif;base64,data); color: red")
    ).toEqual({ cursor: "url(data:image/gif;base64,data)", color: "red" });
  });

  it("transforms rule properties of any case to camelCase", function() {
    expect(
      cssToStyle("FONT-SIZE: 2em; font-WEIGHT: bold; oPaCiTy: 1;")
    ).toEqual({ fontSize: "2em", fontWeight: "bold", opacity: "1" });
  });

  it("ignores empty rules", function() {
    expect(cssToStyle("color: ; font-size: 2em; : 1; ;; ")).toEqual({
      fontSize: "2em",
    });
  });

  it("handles excessive whitespace", function() {
    expect(
      cssToStyle("color:\nred; \n\r\t\tfont-size:\r2em;\topacity:  1 ;")
    ).toEqual({ color: "red", fontSize: "2em", opacity: "1" });
  });

  it("handles no whitespace", function() {
    expect(cssToStyle("color:red;font-size:2em;opacity:1")).toEqual({
      color: "red",
      fontSize: "2em",
      opacity: "1",
    });
  });
});
