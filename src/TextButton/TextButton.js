import React, {Component} from 'react';
import {ButtonNext} from 'wix-ui-core/button-next';
import cx from 'classnames';
import {textButton, backofficeTheme} from 'wix-ui-core/themes/backoffice';
import {string, node, oneOf, element, bool} from 'prop-types';

class TextButton extends Component {
  static displayName = 'TextButton';

  static propTypes = {
    /** Additional classes */
    className: string,
    /** Skins of TextButton content */
    skin: oneOf(['standard', 'light', 'premium', 'dark']),
    /** Underline of TextButton content */
    underline: oneOf(['none', 'onHover', 'always']),
    /** Weight of TextButton content */
    weight: oneOf(['thin', 'normal']),
    /** Size of TextButton content */
    size: oneOf(['small', 'medium']),
    /** Element based icon (svg, image etc.) */
    suffixIcon: element,
    /** Element based icon (svg, image etc.) */
    prefixIcon: element,
    /** Applies disabled styles */
    disabled: bool,
    /** String based node */
    children: node,
    /** String based data hook */
    dataHook: string
  };

  static defaultProps = {
    skin: 'standard',
    underline: 'none',
    weight: 'thin',
    size: 'medium'
  };

  render() {
    const {
      skin,
      underline,
      weight,
      size,
      children,
      className,
      dataHook,
      ...rest
    } = this.props;

    const classNames = cx(className, textButton(skin, underline, weight, size));

    return (
      <div className={backofficeTheme} data-hook={dataHook}>
        <ButtonNext
          {...rest}
          data-hook="textButton-core"
          className={classNames}
          >
          {children}
        </ButtonNext>
      </div>
    );
  }
}

export default TextButton;
