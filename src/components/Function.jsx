import React from "react";
import { PropTypes } from "./util";
import Text from "./Text";
import { functionParameters } from "js-util";


/**
 * A Function with parameters details.
 */
export default class Function extends React.Component {
  static propTypes = {
    value: PropTypes.func.isRequired,
    size: Text.propTypes.size
  };
  static defaultProps = {
    size: Text.defaultProps.size
  };

  render() {
    const { value, size } = this.props;
    const textProps = { italic: true, size };
    let { name } = value;
    name = name === "value" ? "function" : name;
    const elName = name && <Text {...textProps} color="blue">{ name }</Text>;
    const params = [];
    const paramNames = functionParameters(value);
    paramNames.forEach((paramName, i) => {
        const isLast = i === paramNames.length - 1;
        params.push( <Text key={i} {...textProps} color="red">{ paramName }</Text> );
        if (!isLast) {
          params.push( <Text key={i + "comma"} {...textProps} marginRight={6}>,</Text> );
        }
    });

    return (
      <span>
        { elName }
        <Text {...textProps}>(</Text>
        { params }
        <Text {...textProps}>)</Text>
      </span>
    );
  }
}
