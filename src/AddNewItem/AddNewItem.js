import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Text from 'wix-style-react/Text';
//import classnames from 'classnames';

class AddNewItem extends Component {
  static displayName = 'AddNewItem';
  static propTypes = {
    text: PropTypes.string,
    /** used for testing */
    dataHook: PropTypes.string
  }

  static defaultProps = {}

  state = {}

  render() {
    const {dataHook, text} = this.props;
    return (
      <div data-hook={dataHook}>
        {text && <Text
          size="medium"
          skin="standard"
          tagName="span"
          weight="thin"
          dataHook="addnewitem-text"
          >
          {text}
        </Text>
        }
      </div>
    );
  }
}
export default AddNewItem;
