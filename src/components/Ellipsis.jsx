/* eslint no-unused-vars: 0 */

import React from "react";
import Text from "./Text";


/**
 * An ellipsis <Text> element.
 */
export default class Ellipsis extends React.Component {
  render() {
    return (
      <Text
          { ...this.props }
          color="lightGrey"
          letterSpacing="-0.1em">...</Text>
    );
  }
}
