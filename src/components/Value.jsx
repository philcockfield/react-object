/* eslint no-unused-vars: 0 */

import R from "ramda";
import React from "react";
import Radium from "radium";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";
import Twisty from "react-atoms/components/Twisty";
import Primitive, { isPrimitive } from "./Primitive";
import Complex from "./Complex";
import FunctionComponent from "./Function";
import DateComponent from "./Date";
import { isEmptyObjectOrArray } from "./util";



/**
 * A single value of any type (with optional key and expansion toggle).
 */
class Value extends React.Component {
  componentWillMount() {
    this.setState({ isExpanded: this.props.isExpanded });
  }

  styles() {
    const { inline, value } = this.props;
    const { isExpanded } = this.state;
    const showTwisty = this.showTwisty();
    const twistyWidth = 10;
    const indent = showTwisty === true ? twistyWidth + 2 : 0;
    const canExpand = showTwisty && !isExpanded && !this.isPrimitive() && !isEmptyObjectOrArray(value);

    return css({
      base: {
        position: "relative",
        paddingLeft: indent,
        display: inline ? "inline-block" : null,
        marginLeft: this.props.marginLeft,
        marginRight: this.props.marginRight,
        cursor: canExpand ? "pointer" : null
      },
      twistyOuter: {
        Absolute: [0, null, null, 0],
        width: twistyWidth,
        fontSize: this.props.size,
        lineHeight: Text.defaultProps.lineHeight
      },
      twistyAlign: {
        AbsoluteCenter: "y",
        width: twistyWidth
      }
    });
  }


  isPrimitive() { return isPrimitive(this.props.value); }


  showTwisty() {
    let result = this.props.showTwisty;
    if (result === undefined) {
      const { value } = this.props;
      if (!isPrimitive(value) && !isEmptyObjectOrArray(value)) {
        result = true;
      }
    }
    return result;
  }


  handleToggleClick(e) {
    this.setState({ isExpanded: !this.state.isExpanded });
  }


  render() {
    const styles = this.styles();
    const { label, italic, size, value, level } = this.props;
    const { isExpanded } = this.state;
    const textStyles = { italic, size };
    const IS_PRIMITIVE = this.isPrimitive();
    let showTwisty = this.showTwisty();

    if (isEmptyObjectOrArray(value)) {
      showTwisty = false;
    }

    let elTwisty, handleToggleClick;
    if (showTwisty === true && !IS_PRIMITIVE) {
      handleToggleClick = this.handleToggleClick.bind(this);
      // NB: Add the "zero width non-joiner" (\u200C) character to force the
      //     height of the twisty container to the height of the label.
      elTwisty = <div style={ styles.twistyOuter }>
                    <div style={ styles.twistyAlign }>
                      <Twisty
                          isOpen={ isExpanded }
                          onClick={ handleToggleClick }
                          />
                    </div>
                    { "\u200C" }
                 </div>;
    }

    const elLabel = label && <Text
                                color="purple"
                                onClick={ handleToggleClick }
                                { ...textStyles }>{ label }</Text>;

    let elValue;
    if (IS_PRIMITIVE) {
      // Simple value (string, number, bool).
      elValue = <Primitive value={ value } { ...textStyles }/>;
    } else {
      // Complex value (object, array).
      if (R.is(Function, value)) {
        elValue = <FunctionComponent { ...textStyles } value={ value }/>;
      } else if (R.is(Date, value)) {
        elValue = <DateComponent { ...textStyles } value={ value }/>;
      } else {
        elValue = <Complex
                      { ...textStyles }
                      value={ value }
                      level={ level }
                      label={ level === 0 }
                      isExpanded={ isExpanded }
                      collapsedTotal={ this.props.collapsedTotal }
                      />;
      }
    }

    return (
      <div style={ styles.base } onClick={ !isExpanded && handleToggleClick }>
        { elTwisty }
        { elLabel }
        { elLabel && <Text { ...textStyles } marginRight={4}>:</Text> }
        { elValue }
      </div>
    );
  }
}

// API -------------------------------------------------------------------------
Value.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  italic: Text.propTypes.italic,
  size: Text.propTypes.size,
  inline: PropTypes.bool,
  level: PropTypes.number,
  isExpanded: PropTypes.bool,
  showTwisty: PropTypes.bool,
  marginLeft: PropTypes.numberOrString,
  marginRight: PropTypes.numberOrString,
  collapsedTotal: PropTypes.number // The number of {object} properties to show when not expanded.
};
Value.defaultProps = {
  italic: Text.defaultProps.italic,
  size: Text.defaultProps.size,
  inline: false,
  level: 0,
  isExpanded: false,
  marginLeft: 0,
  marginRight: 0
};

export default Radium(Value);
