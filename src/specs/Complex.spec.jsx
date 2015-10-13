"use strict"
import React from "react";
import Complex from "../components/Complex";
import {
  inlineSection,
  italicSection,
  sizeSection,
  objectValueSection,
  arrayValueSection,
  collapsedTotalSection
} from "./sections";


describe("Complex", function() {
  this.header(`## A complex value (object, array).`);
  before(() => {
    let value = {
      foo: 123,
      bar: "hello",
      baz: { number: -1 },
      // fn: () => true
    };

    // value = []
    // value = [1,2,3];
    // value.foo = "hello";

    this
      .align("top left")
      .scroll(true)
      .load(
        <Complex
            value={ value }
            isExpanded={ false } />
    );
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
  collapsedTotalSection.call(this);
});
