"use strict"
import React from "react";
import Text from "../src/Text";
import { COLORS } from "../src/Text";
import { inlineSection, italicSection, sizeSection } from "./sections";




describe("Text", function() {
  this.header(`## Text display with commonly used style properties.`)
  before(() => {
    this
      .align("top left")
      .load(<Text color="red">My Text</Text>);
  });

  inlineSection.call(this);
  italicSection.call(this);
  sizeSection.call(this);

  section("color", () => {
    Object.keys(COLORS).forEach(color => {
      it(`\`${ color }\``, () => this.props({ color }));
    });
  });
});
