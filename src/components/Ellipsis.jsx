import React from "react";
import { PropTypes } from "js-util/react";
import Text from "./Text";


/**
 * An ellipsis <Text> element.
 */
export default class Ellipsis extends React.Component {
  render() {
    return (
      <Text
          { ...this.props }
          italic
          color="lightGrey"
          letterSpacing="-0.1em">...</Text>
    );
  }
}

// API -------------------------------------------------------------------------
Ellipsis.propTypes = {};
Ellipsis.defaultProps = {};
