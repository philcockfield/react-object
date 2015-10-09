"use strict"
import React from "react";
import DateComponent from "../components/Date";
import { italicSection, sizeSection } from "./sections";


const getDate = (minsOffset = 0) => {
  return new Date(new Date().getTime() + minsOffset * 60000);
};


describe("Date", function() {
  this.header(`## A Date object.`);
  before(() => {
    this
      .align("top left")
      .load( <DateComponent value={ new Date() }/> );
  });

  section("Value", () => {
    it("`now`", () => this.load( <DateComponent value={ new Date() }/> ));
    it("`5 minutes ago`", () => this.load( <DateComponent value={ getDate(-5) }/> ));
    it("`5 minutes from now`", () => this.load( <DateComponent value={ getDate(5) }/> ));
  });
});
