import React from "react";
import Radium from "radium";
import { css, PropTypes } from "js-util/react";
import Text from "./Text";
import Twisty from "react-atoms/components/Twisty";
import Primitive, { isPrimitive } from "./Primitive";
import Complex from "./Complex";


/**
 * A single value of any type (with optional key and expansion toggle).
 */
@Radium
export default class Value extends React.Component {
  componentWillMount() {
    this.setState({ isExpanded: this.props.isExpanded });
  }

  styles() {
    const { showTwisty } = this.props;
    const twistySize = 10;
    const indent = showTwisty === true ? twistySize + 2 : 0

    return css({
      base: {
        position: "relative",
        paddingLeft: indent
      },
      twisty: {
        Absolute: [3, null, null, 0],
        width: twistySize,
        height: twistySize
      }
    });
  }

  isPrimitive() { return isPrimitive(this.props.value) }


  handleTwistyClick(e) {
    this.setState({ isExpanded: !this.state.isExpanded })
  }


  render() {
    const styles = this.styles();
    const { label, italic, size, value, level, showTwisty } = this.props;
    const { isExpanded } = this.state;
    const textProps = { italic, size };
    const isPrimitive = this.isPrimitive();

    let elTwisty, handleTwistyClick;
    if (showTwisty === true && !isPrimitive) {
      handleTwistyClick = this.handleTwistyClick.bind(this);
      elTwisty =  <div style={ styles.twisty }>
                    <Twisty
                        isOpen={ isExpanded }
                        onClick={ handleTwistyClick }/>
                  </div>
    }

    const elLabel = label && <Text
                                color="purple"
                                onClick={ handleTwistyClick }
                                { ...textProps }>{ label }</Text>;


    let elValue;
    if (isPrimitive) {
      elValue = <Primitive value={ value } { ...textProps }/>;
    } else {
      elValue = <Complex
                  value={ value }
                  level={ level }
                  label={ level === 0 }
                  isExpanded={ isExpanded }
                  { ...textProps }/>;
    }

    return (
      <div style={ styles.base }>
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
  value: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  label: PropTypes.string,
  italic: Text.propTypes.italic,
  size: Text.propTypes.size,
  level: PropTypes.number,
  isExpanded: PropTypes.bool,
  showTwisty: PropTypes.bool
};
Value.defaultProps = {
  italic: Text.defaultProps.italic,
  size: Text.defaultProps.size,
  level: 0,
  isExpanded: false,
  showTwisty: true
};
