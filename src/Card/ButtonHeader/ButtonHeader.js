import React from 'react';
import {bool, func, node, oneOf, string} from 'prop-types';
import classNames from 'classnames';

import Button from '../../../src/Backoffice/Button';
import WixComponent from '../../BaseComponents/WixComponent';
import Header from '../Header';

const buttonThemes = {
  standard: 'whiteblueprimary',
  emptyblue: 'emptyblue',
  fullblue: 'fullblue'
};

class ButtonHeader extends WixComponent {
  static displayName = 'ButtonHeader';

  static propTypes = {
    ...Header.propTypes,
    withNewIcons: bool,
    buttonTitle: string.isRequired,
    buttonOnClick: func.isRequired,
    buttonPrefix: node,
    buttonSuffix: node,
    tooltip: node,
    theme: oneOf([
      'standard',
      'fullblue',
      'emptyblue'
    ])
  };

  static defaultProps = {
    withNewIcons: false,
    buttonPrefix: null,
    tooltip: null,
    theme: 'standard',
    buttonSuffix: null
  };

  render() {
    const {
      title,
      subtitle,
      buttonOnClick,
      buttonTitle,
      buttonPrefix,
      buttonSuffix,
      withoutDivider,
      tooltip,
      theme,
      withNewIcons
    } = this.props;

    const buttonElement = (
      <div>
        <Button
          withNewIcons={withNewIcons}
          dataHook="button"
          height={theme === 'standard' ? 'medium' : 'small'}
          suffixIcon={buttonSuffix}
          prefixIcon={buttonPrefix}
          onClick={buttonOnClick}
          theme={buttonThemes[theme] || buttonThemes.standard}
          children={buttonTitle}
          />
      </div>
    );

    const tooltipElement = tooltip ?
      React.cloneElement(tooltip, {children: buttonElement}) :
      null;

    return (
      <Header
        title={title}
        subtitle={subtitle}
        suffix={tooltipElement || buttonElement}
        withoutDivider={withoutDivider}
        />
    );
  }
}

export default ButtonHeader;
