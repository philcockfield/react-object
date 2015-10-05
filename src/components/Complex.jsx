import R from "ramda";
import React from "react";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";
import ValueList from "./ValueList";


const toItems = (value) => {
    const toItem = (key) => {
      return {
        label: key,
        value: value[key]
      };
    };
    return R.pipe(R.keys, R.map(toItem))(value);
  };


/**
 * A complex value (Object, Array).
 */
export default class Complex extends React.Component {
  render() {
    let { label, value, isExpanded, italic, size, level } = this.props;
    const textStyles = { italic, size };

    // Prepare the label.
    if (label === true) {
      // Only use custom object names.
      label = value.constructor.name;
      if (R.any(R.equals(label), ["Object", "Array"])) { label = null; }
    }
    const elLabel = label && <Text { ...textStyles } marginRight={4}>{ label }</Text>;
    const openChar = R.is(Array, value) ? "[" : "{";
    const closeChar = R.is(Array, value) ? "]" : "}";

    // Prepare the value content.
    let elValue;
    if (isExpanded) {
      elValue = <ValueList
                    items={ toItems(value) }
                    level={ level }
                    { ...textStyles } />
    } else {
      console.log("TODO closed values"); // TODO:
    }

    return (
      <span>
        { elLabel }
        <Text { ...textStyles }>{ openChar }</Text>
        { elValue }
        <Text { ...textStyles }>{ closeChar }</Text>
      </span>
    );
  }
}



// API -------------------------------------------------------------------------
Complex.propTypes = {
  label: PropTypes.boolOrString,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  level: PropTypes.number,
  isExpanded: PropTypes.bool,
  collapsedStyle: PropTypes.shape({ italic: Text.propTypes.italic }),
  italic: Text.propTypes.italic,
  size: Text.propTypes.size,
};
Complex.defaultProps = {
  label: true,
  isExpanded: false,
  level: 0,
  italic: Text.defaultProps.italic,
  size: Text.defaultProps.size
};
