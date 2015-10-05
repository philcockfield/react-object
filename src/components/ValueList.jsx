import R from "ramda";
import React from "react";
import Radium from "radium";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";
let Value // NB: Lazily required to prevent circular reference.


/**
 * A list of <Value>'s.
 */
@Radium
export default class ValuesList extends React.Component {
  constructor(props) {
    super(props);
    if (!Value) { Value = require("./Value"); }
  }

  styles() {
    return css({
      base: {
        listStyleType: "none",
        margin: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: "0.2em",
        fontSize: this.props.size,
        fontStyle: this.props.italic ? "italic" : "normal",
      }
    });
  }

  render() {
    const styles = this.styles();
    let index = 0;
    const toItemElement = (item) => {
      index += 1;
      return <li key={index}>
               <Value
                  label={ item.label }
                  value={ item.value }
                  level={ this.props.level + 1 }
                  isExpanded={ false }
                  size={ this.props.size }
                  italic={ this.props.italic }/>
             </li>
    };
    const items = R.map(toItemElement, this.props.items);

    return (
      <ul style={ styles.base }>
        { items }
      </ul>
    );
  }
}

// API -------------------------------------------------------------------------
ValuesList.propTypes = {
  italic: Text.propTypes.italic,
  size: Text.propTypes.size,
  items: PropTypes.array,
  level: PropTypes.number
};
ValuesList.defaultProps = {
  italic: Text.defaultProps.italic,
  size: Text.defaultProps.size,
  items: [],
  level: 0
};
