import React, {Component} from 'react';
import Text from 'wix-style-react/Text';
import PropTypes from 'prop-types';
//import classnames from 'classnames';


const SPACING = {
  large: {padding: '12px'},
  medium: {padding: '12px'},
  small: {padding: '6px'},
  tiny: {}
};


class ActionText extends Component {
  static propTypes = {
    children: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.string
  }
  render() {
    const {children, disabled, size} = this.props;
    return (
      <div data-hook="text-with-ellipses" style={SPACING[size]}>
        <Text weight="thin" size="small" style={{color: disabled ? '#CBD3DC' : '#3899ec'}} dataHook="additem-text" elipsis>{children}</Text>
      </div>
    );
  }
}
export default ActionText;
