import React from "react";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";
import { functionParameters } from "js-util";


/**
 * A Function with parameters details.
 */
export default class Function extends React.Component {
  render() {
    const { value, italic, size } = this.props;
    const textProps = { italic, size };
    const { name } = value;
    const elName = name && <Text {...textProps} color="blue">{ name }</Text>;
    const elComma = <Text {...textProps}>,</Text>
    const params = [];
    const paramNames = functionParameters(value);
    paramNames.forEach((name, i) => {
        const isLast = i === paramNames.length - 1;
        params.push( <Text key={i} {...textProps} color="red">{ name }</Text> );
        if (!isLast) {
          params.push( <Text key={i + "comma"} {...textProps} marginRight={6}>,</Text> );
        }
    });

    return (
      <span>
        <Text {...textProps} marginRight={ name ? 6 : 3 }>function</Text>
        { elName }
        <Text {...textProps}>(</Text>
        { params }
        <Text {...textProps}>)</Text>
      </span>
    );
  }
}

// API -------------------------------------------------------------------------
Function.propTypes = {
  value: PropTypes.func.isRequired,
  italic: Text.propTypes.italic,
  size: Text.propTypes.size,
};
Function.defaultProps = {
  italic: true,
  size: Text.defaultProps.size
};
