"use strict"
import React from "react";
import Complex from "../src/Complex";
import { inlineSection, italicSection, sizeSection, objectValueSection, arrayValueSection } from "./sections";


describe("Complex", function() {
  this.header(`## A complex value (object, array).`);
  before(() => {
    this
      .align("top left")
      .load(
        <Complex
            value={{ foo: 123, bar: "hello", baz: { number: -1 }}}
            isExpanded={true} />
    );

    console.log("this", this);
  });

  section("label", () => {
    it("`true`", () => this.props({ label: true }));
    it("`false`", () => this.props({ label: false }));
    it("`'My Label'`", () => this.props({ label: "My Label" }));
  });

  section("isExpanded", () => {
    it("`true`", () => this.props({ isExpanded: true }));
    it("`false`", () => this.props({ isExpanded: false }));
  });

  objectValueSection.call(this);
  arrayValueSection.call(this);

  italicSection.call(this);
  sizeSection.call(this);

});
