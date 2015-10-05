"use strict"
import React from "react";
import ValueList from "../components/ValueList";
import { inlineSection, italicSection, sizeSection } from "./sections";


describe("ValueList", function() {
  this.header(`## A list of values.`);
  before(() => {
    const items = [
      { label: "one", value: 1 },
      {
        label: "two",
        value: {
          foo: ["foo", 2, new Date()],
          bar: () => true
        }
      },
      { label: "three", value: "toru" },
      { label: "four" }
    ];

    this
      .align("top left")
      .load( <ValueList items={ items } /> );
  });

  inlineSection.call(this);
  italicSection.call(this);
  sizeSection.call(this);
});
