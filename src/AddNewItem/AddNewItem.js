import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {withFocusable, focusableStates} from '../common/Focusable';
import AddItemLarge from 'wix-ui-icons-common/system/AddItemLarge';
import AddItemMedium from 'wix-ui-icons-common/system/AddItemMedium';
import AddItemSmall from 'wix-ui-icons-common/system/AddItemSmall';
import Add from '../new-icons/Add';
import ActionText from './components/ActionText';

import styles from './AddNewItem.scss';


const ICON_SIZES = {
  large: <AddItemLarge data-hook="additem-icon"/>,
  medium: <AddItemMedium data-hook="additem-icon"/>,
  small: <AddItemSmall data-hook="additem-icon"/>,
  tiny: <Add data-hook="additem-icon" width="26" height="26"/>
};

class AddNewItem extends Component {
  static displayName = 'AddNewItem';
  static propTypes = {

     /** Any component or string */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),

    /** Apply disabled styles */
    disabled: PropTypes.bool,

    /** The theme of component */
    theme: PropTypes.oneOf(['dashes', 'plain', 'filled', 'image']),

     /** Switching content alignment  */
    alignItems: PropTypes.oneOf(['center', 'right', 'left']),

    /** Size to control icon and spacing  */
    size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),

     /** Click event handler  */
    onClick: PropTypes.func,

    /** used for testing */
    dataHook: PropTypes.string
  }

  static defaultProps = {
    theme: 'dashes',
    size: 'tiny',
    alignItems: 'center'
  }

  renderIcon = () => {
    const {size} = this.props;
    return ICON_SIZES[size];
  }

  renderText = () => {
    const {children, disabled, theme, size} = this.props;
    const image = theme === 'image';
    switch (typeof children) {
      case undefined:
        return null;
      case 'string':
        return image ? null :
        <ActionText disabled={disabled} size={size}>{children}</ActionText>;
      default:
        return image ? null : children;
    }
  }

  render() {
    const {dataHook, onClick, disabled, theme, alignItems, size} = this.props;
    const tiny = size === 'tiny';
    const root = classnames(styles.root, {[styles.wrapped]: theme === 'image'}, {[styles.disabled]: disabled});
    const box = classnames(styles.box, styles[theme], styles[alignItems]);
    const content = classnames({[styles.column]: !tiny}, {[styles.list]: tiny});
    return (
      <div
        className={root}
        data-hook={dataHook}
        onClick={disabled ? null : onClick}
        {...focusableStates(this.props)}
        >
        <div className={box}>
          <div className={content}>
            {this.renderIcon()}
            {this.renderText()}
          </div>
        </div>
      </div>
    );
  }
}
export default withFocusable(AddNewItem);
