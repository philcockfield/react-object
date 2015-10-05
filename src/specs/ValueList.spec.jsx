"use strict"
import React from "react";
import ValueList from "../components/ValueList";
import { italicSection, sizeSection } from "./sections";


describe("ValueList", function() {
  this.header(`## A list of Value's.`);
  before(() => {

    const items = [
      { label: "one", value: 1 },
      { label: "two", value: { foo: "yo" } },

    ];

    this
      .align("top left")
      .load( <ValueList items={ items } /> );
  });

  italicSection.call(this);
  sizeSection.call(this);
});
