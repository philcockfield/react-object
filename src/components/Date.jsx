import R from "ramda";
import React from "react";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";


const doubleDigits = (number) => {
  return R.takeLast(2, `0${ number }`);
};


/**
 * A Date object.
 */
export default class DateComponent extends React.Component {
  render() {
    const { value, italic, size } = this.props;
    const textProps = { italic, size };

    // Date.
    const year = value.getUTCFullYear();
    const month = doubleDigits(value.getUTCMonth() + 1);
    const day = doubleDigits(value.getUTCDate());

    // Time.
    let hours = value.getHours();
    const minutes = doubleDigits(value.getMinutes());
    const seconds = doubleDigits(value.getSeconds());
    const period = hours > 11 ? "pm" : "am";
    if (hours > 12) {
      hours = hours - 12;
    }

    return (
      <span>
        <Text {...textProps} color="blue">
          { `${ year }-${ month }-${ day },` }
          { `${ hours }:${ minutes }:${ seconds }${ period }` }
        </Text>
      </span>
    );
  }
}

// API -------------------------------------------------------------------------
DateComponent.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  italic: Text.propTypes.italic,
  size: Text.propTypes.size,
};
DateComponent.defaultProps = {
  italic: true,
  size: Text.defaultProps.size
};
