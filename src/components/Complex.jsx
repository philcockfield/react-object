import R from "ramda";
import React from "react";
import Radium from "radium";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";
import ValueList, { ELLIPSIS } from "./ValueList";
import Ellipsis from "./Ellipsis";
import { isPrimitive } from "./Primitive";


const toProp = (label, value) => ({ label, value });


const toObjectProps = (obj) => {
    const toObjectProp = (key) => toProp(key, obj[key]);
    return R.pipe(R.keys, R.map(toObjectProp))(obj);
  };


const toPrimitiveProps = (obj) => {
    const isPrimitiveProp = (prop) => isPrimitive(prop.value);
    return R.filter(isPrimitiveProp, toObjectProps(obj));
  };


const toArrayProps = (array, max = 5) => {
    // Add array items.
    const subset = array.length === max ? array : R.take(max - 1, array);
    const items = subset.map((value, i) => toProp(i.toString(), value));
    if (array.length > max) {
      items.push(ELLIPSIS);
      items.push(toProp((array.length - 1).toString(), R.last(array)));
    }

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
    const isArray = R.is(Array, value);
    let braceMargin = 0;

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
      // Expanded.
      const items = isArray ? toArrayProps(value) : toObjectProps(value);
      elContent = <ValueList
                      items={ items }
                      level={ level }
                      { ...textStyles } />

    } else {

      // Collapsed.
      if (isArray && value.length > 0) {
        // Array: Show length, eg: "[2]".
        elContent = <Text color="grey" italic={italic}>{ value.length }</Text>
      } else {
        // Object: Show flat list of primitive props, eg: { foo:123 }.
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
            : <Ellipsis/>;
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
