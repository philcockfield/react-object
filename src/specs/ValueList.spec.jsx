"use strict"
import React from "react";
import ValueList from "../components/ValueList";
import { ELLIPSIS } from "../components/ValueList";
import { inlineSection, italicSection, sizeSection } from "./sections";

const DEFAULT_ITEMS = [
  { label: "one", value: 1 },
  {
    label: "two",
    value: {
      foo: ["foo", 2, new Date()],
      bar: () => true
    }
  },
  { label: "three", value: "toru" },
  { label: "four" },
  { label: "five", value: { simple: 1 } },
  { label: "six", value: [] },
  { label: "seven", value: {} },
];


describe("ValueList", function() {
  this.header(`## A list of values.`);
  before(() => {
    this
      .align("top left")
      .load( <ValueList items={ DEFAULT_ITEMS } /> );
  });

  section("items", () => {
    it("`default`", () => this.load( <ValueList items={ DEFAULT_ITEMS }/> ));
    it("`ellipsis` penultimate", () => {
      const items = [
        { label: "one", value: 1 },
        { label: "two", value: 2 },
        ELLIPSIS,
        { label: "three", value: 3 }
      ]
      this.load( <ValueList items={ items }/> )
    });
    it("`ellipsis` last", () => {
      const items = [
        { label: "one", value: 1 },
        { label: "two", value: 2 },
        ELLIPSIS
      ]
      this.load( <ValueList items={ items }/> )
    });
  });

  inlineSection.call(this);
  italicSection.call(this);
  sizeSection.call(this);
});
