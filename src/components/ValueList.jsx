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
export default class ValueList extends React.Component {
  constructor(props) {
    super(props);
    if (!Value) { Value = require("./Value"); }
  }

  styles() {
    const { inline } = this.props;
    return css({
      base: {
        display: inline ? "inline-block" : null,
        listStyleType: "none",
        margin: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: inline ? 0 : "0.2em",
        fontSize: this.props.size,
        fontStyle: this.props.italic ? "italic" : "normal"
      },
      li: {
        display: this.props.inline ? "inline" : null
      }
    });
  }

  render() {
    const styles = this.styles();
    const { inline } = this.props;
    const total = this.props.items.length;
    const items = [];
    this.props.items.forEach((item, i) => {
        // Insert the <Value>.
        const isLast = i === total - 1;
        items.push(
          <li key={i} style={ styles.li }>
            <Value
                label={ item.label }
                value={ item.value }
                level={ this.props.level + 1 }
                isExpanded={ false }
                size={ this.props.size }
                italic={ this.props.italic }
                inline={ this.props.inline }
                showTwisty={ !inline }/>
          </li>);

        // Inert comma divider.
        if (inline && !isLast) {
          items.push(
            <Text
                key={ `${ i }-comma` }
                color="darkGrey"
                italic={ this.props.italic }
                marginRight={8}>,</Text>
            );
        }
    });

    return <ul style={ styles.base }>{ items }</ul>
  }
}

// API -------------------------------------------------------------------------
ValueList.propTypes = {
  inline: PropTypes.bool,
  italic: Text.propTypes.italic,
  size: Text.propTypes.size,
  items: PropTypes.array,
  level: PropTypes.number
};
ValueList.defaultProps = {
  inline: false,
  italic: Text.defaultProps.italic,
  size: Text.defaultProps.size,
  items: [],
  level: 0
};
