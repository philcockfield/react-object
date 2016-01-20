import R from "ramda";


export const css = require("js-util/lib/react-css").default;
export const PropTypes = require("react-schema").PropTypes;


export const isEmptyObjectOrArray = (value) => {
    if (R.is(Object, value)) { return R.keys(value).length === 0; }
    if (R.is(Array, value)) { return value.length === 0; }
    return false;
  };
