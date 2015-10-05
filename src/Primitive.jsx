import R from "ramda";
import React from "react";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";

const COLORS = {
  "Null": "lightGrey",
  "Undefined": "lightGrey",
  "String": "red",
  "Number": "blue",
  "Boolean": "blue"
};

/**
 * Determines whether the given value is primitive.
 */
export const isPrimitive = (value) => {
  if (R.isNil(value)) {
    return true;
  } else {
    const isType = (type) => R.is(type, value);
    return R.any(isType, [String, Number, Boolean]);
  }
};



/**
 * A primitive/simple value.
 */
export default class Primitive extends React.Component {
  render() {
    let { value } = this.props;
    const type = R.type(value);
    switch (type) {
      case "Undefined": value = "<undefined>"; break;
      case "Null": value = "<null>"; break;
      case "Boolean": value = value.toString(); break;
      case "String": value = `“${ value }”`; break;
    }
    return (
      <Text color={ COLORS[type] } { ...this.props }>{ value }</Text>
    );
  }
}

// API -------------------------------------------------------------------------
Primitive.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  italic: Text.propTypes.italic,
  size: Text.propTypes.size
};
Primitive.defaultProps = {
  italic: Text.defaultProps.italic,
  size: Text.defaultProps.size
};
