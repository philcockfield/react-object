import R from "ramda";
import React from "react";
import Radium from "radium";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";
import Twisty from "react-atoms/components/Twisty";
import Primitive, { isPrimitive } from "./Primitive";
import Complex from "./Complex";
import { isEmptyObjectOrArray } from "./util";



/**
 * A single value of any type (with optional key and expansion toggle).
 */
@Radium
export default class Value extends React.Component {
  componentWillMount() {
    this.setState({ isExpanded: this.props.isExpanded });
  }

  styles() {
    const { inline, value } = this.props;
    const showTwisty = this.showTwisty();
    const { isExpanded } = this.state;
    const twistySize = 10;
    const indent = showTwisty === true ? twistySize + 2 : 0
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
      twisty: {
        Absolute: [3, null, null, 0],
        width: twistySize,
        height: twistySize
      }
    });
  }

  isPrimitive() { return isPrimitive(this.props.value) }


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
    this.setState({ isExpanded: !this.state.isExpanded })
  }


  render() {
    const styles = this.styles();
    const { label, italic, size, value, level } = this.props;
    const { isExpanded } = this.state;
    const textProps = { italic, size };
    const isPrimitive = this.isPrimitive();
    let showTwisty = this.showTwisty();

    if (isEmptyObjectOrArray(value)) {
      showTwisty = false;
    }

    let elTwisty, handleToggleClick;
    if (showTwisty === true && !isPrimitive) {
      handleToggleClick = this.handleToggleClick.bind(this);
      elTwisty =  <div style={ styles.twisty }>
                    <Twisty
                        isOpen={ isExpanded }
                        onClick={ handleToggleClick }/>
                  </div>
    }

    const elLabel = label && <Text
                                color="purple"
                                onClick={ handleToggleClick }
                                { ...textProps }>{ label }</Text>;


    let elValue;
    if (isPrimitive) {
      // Simple value (string, number, bool).
      elValue = <Primitive value={ value } { ...textProps }/>;
    } else {
      // Complex value (object, array).
      elValue = <Complex
                    value={ value }
                    level={ level }
                    label={ level === 0 }
                    isExpanded={ isExpanded }
                    { ...textProps }/>;
    }

    return (
      <div style={ styles.base } onClick={ !isExpanded && handleToggleClick }>
        { elTwisty }
        { elLabel }
        { elLabel && <Text { ...textProps } marginRight={4}>:</Text> }
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
  marginRight: PropTypes.numberOrString
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
