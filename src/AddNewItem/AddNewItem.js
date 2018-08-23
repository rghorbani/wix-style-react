import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import Text from 'wix-style-react/Text';


import AddItemLarge from 'wix-ui-icons-common/system/AddItemLarge';
import AddItemMedium from 'wix-ui-icons-common/system/AddItemMedium';
import AddItemSmall from 'wix-ui-icons-common/system/AddItemSmall';
import Add from '../new-icons/Add';

import styles from './AddNewItem.scss';


const textWitElipsis = (children, disabled) => (
  <div data-hook="text-with-ellipses">
    <Text weight="thin" size="small" style={{color: disabled ? '#CBD3DC' : '#3899ec'}} dataHook="additem-text" elipsis>{children}</Text>
  </div>
);

const ICON_SIZES = {
  large: <AddItemLarge data-hook="additem-icon"/>,
  medium: <AddItemMedium data-hook="additem-icon"/>,
  small: <AddItemSmall data-hook="additem-icon"/>,
  tiny: <Add data-hook="additem-icon" width="26" height="26"/>
};

class AddNewItem extends Component {
  static displayName = 'AddNewItem';
  static propTypes = {

    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),

    /** Apply disabled styles */
    disabled: PropTypes.bool,

    /** The theme of component */
    theme: PropTypes.oneOf(['dashes', 'plain', 'filled', 'image']),

    alignItems: PropTypes.oneOf(['center', 'right', 'left']),

    /** Size to control icon and spacing  */
    size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),

    onClick: PropTypes.func,
    /** used for testing */
    dataHook: PropTypes.string
  }

  static defaultProps = {
    theme: 'dashes',
    size: 'small',
    alignItems: 'center'
  }

  renderIcon = () => {
    const {size} = this.props;
    return ICON_SIZES[size];
  }

  renderText = () => {
    const {children, disabled, theme} = this.props;
    const image = theme === 'image';
    switch (typeof children) {
      case undefined:
        return null;
      case 'string':
        return image ? null : textWitElipsis(children, disabled);
      default:
        return image ? null : children;
    }
  }

  render() {
    const {dataHook, onClick, disabled, theme, alignItems, size} = this.props;
    const tiny = size === 'tiny';
    const root = classnames(styles.root, {[styles.wrapped]: theme === 'image'});
    const box = classnames(styles.box, styles[theme], styles[alignItems], {[styles.disabled]: disabled});
    const content = classnames({[styles.content]: !tiny}, {[styles.list]: tiny});
    return (
      <div className={root} data-hook={dataHook} onClick={disabled ? null : onClick} >
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
export default AddNewItem;
