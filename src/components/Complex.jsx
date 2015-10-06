import R from "ramda";
import React from "react";
import Radium from "radium";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";
import ValueList from "./ValueList";
import { isPrimitive } from "./Primitive";

const ellipsis = <Text color="lightGrey" italic>...</Text>


const toProps = (value) => {
    const toProp = (key) => {
        return {
          label: key,
          value: value[key]
        };
    };
    return R.pipe(R.keys, R.map(toProp))(value);
  };


const toPrimitiveProps = (value) => {
    const isPrimitiveProp = (prop) => isPrimitive(prop.value);
    return R.filter(isPrimitiveProp, toProps(value));
  };




/**
 * A complex value (Object, Array).
 */
@Radium
export default class Complex extends React.Component {
  styles() {
    return css({
      base: {
        cursor: this.props.onClick ? "pointer" : null
      }
    });
  }


  render() {
    const styles = this.styles();
    let { label, value, isExpanded, italic, size, level } = this.props;
    const textStyles = { italic, size };
    let braceMargin = 0;

    // Prepare the label.
    if (label === true) {
      // Only show labels for custom object names (eg. Classes).
      label = value.constructor.name;
      if (R.any(R.equals(label), ["Object", "Array"])) { label = null; }
    }
    const elLabel = label && <Text { ...textStyles } marginRight={4}>{ label }</Text>;
    const openChar = R.is(Array, value) ? "[" : "{";
    const closeChar = R.is(Array, value) ? "]" : "}";

    // Prepare the value content.
    let elContent;
    if (isExpanded) {
      elContent = <ValueList
                    items={ toProps(value) }
                    level={ level }
                    { ...textStyles } />
    } else {
      if (R.is(Array, value) && value.length > 0) {
        // Show array length, eg: "[2]".
        elContent = <Text color="grey" italic={italic}>{ value.length }</Text>
      } else {
        // Show flat list of primitive props, eg: { foo:123 }.
        const totalProps = R.keys(value).length;
        if (totalProps > 0) {
          const primitiveProps = toPrimitiveProps(value);
          const hasProps = primitiveProps.length > 0;
          braceMargin = hasProps ? 3 : 0;
          elContent = hasProps
            ? <ValueList
                items={ primitiveProps }
                level={ level }
                inline={ true }
                { ...textStyles } />
            : ellipsis;
        }
      }
    }

    return (
      <span style={ styles.base }>
        { elLabel }
        <Text { ...textStyles } marginRight={ braceMargin }>{ openChar }</Text>
        { elContent }
        <Text { ...textStyles } marginLeft={ braceMargin }>{ closeChar }</Text>
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
  onClick: PropTypes.func,
};
Complex.defaultProps = {
  label: true,
  isExpanded: false,
  level: 0,
  italic: Text.defaultProps.italic,
  size: Text.defaultProps.size
};
