import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Add from '../new-icons/Add';
import Text from 'wix-style-react/Text';
//import classnames from 'classnames';

class AddNewItem extends Component {
  static displayName = 'AddNewItem';
  static propTypes = {

    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),

    elipsis: PropTypes.bool,

    disabled: PropTypes.bool,

    onClick: PropTypes.func,
    /** used for testing */
    dataHook: PropTypes.string
  }

  static defaultProps = {
    elipsis: false
  }

  state = {}

  checkElipsis = (children, elipsis) => {
    if (elipsis) {
      return (
        <div data-hook="text-with-ellipses">
          <Text dataHook="addnewitem-text" appearance="best" elipsis>{children}</Text>
        </div>
      );
    } else {
      return <Text dataHook="addnewitem-text" appearance="best">{children}</Text>;
    }
  }

  renderText = () => {
    const {children, elipsis} = this.props;
    if (!children) {
      return null;
    }
    if (typeof children === 'string') {
      return this.checkElipsis(children, elipsis);
    }
    return <div data-hook="addnewitem-children">children</div>;
  }

  render() {
    const {dataHook, onClick, disabled} = this.props;
    return (
      <div onClick={disabled ? null : onClick} data-hook={dataHook}>
        <Add data-hook="addnewitem-icon"/>
        {this.renderText()}
      </div>
    );
  }
}
export default AddNewItem;
