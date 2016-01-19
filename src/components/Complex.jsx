/* eslint no-unused-vars: 0 */

import R from "ramda";
import React from "react";
import Radium from "radium";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";
import ValueList, { ELLIPSIS } from "./ValueList";
import Ellipsis from "./Ellipsis";
import { isPrimitive } from "./Primitive";
import { isEmptyObjectOrArray } from "./util";


const toProp = (label, value) => ({ label, value });


const toObjectProps = (obj, max) => {
    const toObjectProp = (key) => toProp(key, obj[key]);
    let props = R.pipe(R.keys, R.map(toObjectProp))(obj);
    if (max !== undefined) {
      props = withinBounds(props, max);
    }
    return props;

  };



const withinBounds = (array, max) => {
    if (max === 0) { return []; }
    max = max === undefined ? array.length : max;
    const takeTotal = array.length === max ? array.length : max - 1;
    const items = R.take(takeTotal, array);
    if (array.length > max) {
      if (max === 1) {
        items.push(R.last(array));
        items.push(ELLIPSIS);
      } else {
        items.push(ELLIPSIS);
        items.push(R.last(array));
      }
    }
    return items;
  };



const toPrimitiveProps = (obj, max) => {
    const isPrimitiveProp = (prop) => isPrimitive(prop.value);
    let props = R.filter(isPrimitiveProp, toObjectProps(obj));
    props = withinBounds(props, max);
    if (R.keys(obj).length > props.length && !R.any(R.equals(ELLIPSIS), props)) {
      props.push(ELLIPSIS);
    }
    return props;
  };



const toArrayProps = (array, max) => {
    // Add array items.
    let items = array.map((item, i) => {
        return item === ELLIPSIS
          ? item
          : toProp(i.toString(), item);
      });
    items = withinBounds(items, max);

    // Add any properties on the array.
    const keys = R.keys(array);
    const propKeys = R.takeLast(keys.length - array.length, keys);
    propKeys.forEach(key => items.push(toProp(key, array[key])));

    // Finish up.
    return items;
  };



/**
 * A complex value (Object, Array).
 */
class Complex extends React.Component {
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
    const isArray = R.is(Array, value);
    let braceMargin = 0;
    if (isExpanded && isEmptyObjectOrArray(value)) { isExpanded = false; }

    // Prepare the label.
    if (label === true) {
      // Only show labels for custom object names (eg. Classes).
      label = value.constructor.name;
      if (R.any(R.equals(label), ["Object", "Array"])) { label = null; }
    }
    const elLabel = label && <Text { ...textStyles } marginRight={4}>{ label }</Text>;
    const openChar = isArray ? "[" : "{";
    const closeChar = isArray ? "]" : "}";

    // Prepare the value content.
    let elContent;
    if (isExpanded) {
      // -- Expanded --.
      const items = isArray ? toArrayProps(value, 5) : toObjectProps(value, 50);
      elContent = <ValueList
                      items={ items }
                      level={ level }
                      collapsedTotal={ this.props.collapsedTotal }
                      { ...textStyles } />;

    } else {

      // -- Collapsed --.
      if (isArray && value.length > 0) {
        // Array: Show length, eg: "[2]".
        elContent = <Text color="grey" { ...textStyles }>{ value.length }</Text>;
      } else {
        // Object: Show flat list of primitive props, eg: { foo:123 }.
        const totalProps = R.keys(value).length;
        if (totalProps > 0) {
          const primitiveProps = toPrimitiveProps(value, this.props.collapsedTotal);
          const hasProps = primitiveProps.length > 0;
          braceMargin = hasProps ? 3 : 0;
          elContent = hasProps
            ? <ValueList
                items={ primitiveProps }
                level={ level }
                inline={ true }
                collapsedTotal={ this.props.collapsedTotal }
                { ...textStyles } />
            : <Ellipsis { ...textStyles }/>;
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
  collapsedTotal: PropTypes.number, // The number of {object} properties to show when not expanded.
  onClick: PropTypes.func
};
Complex.defaultProps = {
  label: true,
  isExpanded: false,
  level: 0,
  italic: Text.defaultProps.italic,
  size: Text.defaultProps.size,
  collapsedTotal: 3
};

export default Radium(Complex);
