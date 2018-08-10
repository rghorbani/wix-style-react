import React from 'react';
import {bool, node, oneOf, func, string} from 'prop-types';
import Collapse from 'react-collapse';

import classNames from 'classnames';
import ToggleSwitch from '../../../src/ToggleSwitch';
import WixComponent from '../../../src/BaseComponents/WixComponent';
import Header from '../Header';
import Button from '../../../src/Button';
import ChevronDown from '../../new-icons/ChevronDown';
import ChevronUp from '../../new-icons/ChevronUp';

class CollapsedHeader extends WixComponent {
  static displayName = 'Card.CollapsedHeader';
  static propTypes = {
    ...Header.propTypes,
    children: node,
    toggleStyle: oneOf(['switch', 'button']),
    collapsed: bool,
    onCollapsedChange: func,
    buttonCollapseText: string,
    buttonExpandText: string,
    controlled: bool
  };

  static defaultProps = {
    collapsed: false,
    toggleStyle: 'switch',
    buttonCollapseText: 'Less',
    buttonExpandText: 'More',
    controlled: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: props.collapsed
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.collapsed !== nextProps.collapsed &&
      nextProps.collapsed !== this.state.isCollapsed
    ) {
      this.setState({isCollapsed: nextProps.collapsed});
    }
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  onCollapsedChange() {
    const {onCollapsedChange} = this.props;
    onCollapsedChange && onCollapsedChange(this.state.isCollapsed);
  }

  onToggleChange = () => {
    const {controlled} = this.props;

    if (controlled) {
      this.onCollapsedChange();
    } else {
      this.setState(({isCollapsed}) => ({isCollapsed: !isCollapsed}), this.onCollapsedChange);
    }
  };

  render() {
    const {
      title,
      subtitle,
      children,
      withoutDivider,
      buttonCollapseText,
      buttonExpandText,
      toggleStyle
    } = this.props;
    const {isCollapsed} = this.state;

    const switchElement =
      (<div onClick={this.stopPropagation}>
        <ToggleSwitch
          dataHook="switch"
          onChange={this.onToggleChange}
          checked={!isCollapsed}
          />
      </div>);

    const buttonElement =
      (<div onClick={this.stopPropagation}>
        <Button
          withNewIcons
          dataHook="button"
          height="medium"
          prefixIcon={isCollapsed ? <ChevronDown/> : <ChevronUp/>}
          onClick={this.onToggleChange}
          theme="whiteblueprimary"
          type="button"
          >
          {isCollapsed ? buttonExpandText : buttonCollapseText}
        </Button>
      </div>);

    return (
      <div>
        <div onClick={this.onToggleChange}>
          <Header
            title={title}
            subtitle={subtitle}
            suffix={toggleStyle === 'switch' ? switchElement : buttonElement}
            withoutDivider={withoutDivider || isCollapsed}
            />
        </div>

        <Collapse
          isOpened={!isCollapsed}
          children={children}
          />
      </div>
    );
  }
}

export default CollapsedHeader;
