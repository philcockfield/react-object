"use strict"
import React from "react";
import Function from "../components/Function";
import { sizeSection } from "./sections";

const fn1 = function myFunc(param1, param2) {};
const fn2 = function myFunc() {};
const fn3 = function value() {};



describe("Function", function() {
  this.header(`## A Function with parameters details.`);

  before(() => {
    this
      .align("top left")
      .load( <Function value={ fn1 }/> );
  });

  section("Values", () => {
    it("`named with 2 params`", () => this.load( <Function value={ fn1 }/> ));
    it("`named with no params`", () => this.load( <Function value={ fn2 }/> ));
    it("`named 'value'`", () => this.load( <Function value={ fn3 }/> ));
    it("`unnamed with 1 param`", () => this.load( <Function value={ (p1) => 0 }/> ));
    it("`unnamed with no params`", () => this.load( <Function value={ () => true }/> ));
  });


  sizeSection.call(this);
});
