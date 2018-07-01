import s from './Page.scss';
import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import PageHeader from '../PageHeader';
import Content from './Content';
import Tail from './Tail';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ResizeSensor} from 'css-element-queries';

const SCROLL_TOP_THRESHOLD = 20;
const SHORT_SCROLL_TOP_THRESHOLD = 3;
const TAIL_TOP_PADDING_PX = 20;
/**
 * A page container which contains a header and scrollable content
 */
class Page extends WixComponent {

  static defaultProps = {
    gradientCoverTail: true
  }

  constructor() {
    super();

    this._setContainerScrollTopThreshold(false);
    this._handleScroll = this._handleScroll.bind(this);
    this._handleResize = this._handleResize.bind(this);

    this.state = {
      headerHeight: 0,
      tailHeight: 0,
      fixedContentHeight: 0,
      scrollBarWidth: 0,
      minimized: false
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.contentResizeListener = new ResizeSensor(this._getScrollContainer().childNodes[0], this._handleResize);
    this._calculateComponentsHeights();
    this._handleResize();
  }

  componentDidUpdate() {
    // Do not trigger height calculation if the component is minimized
    if (!this.state.minimized) {
      this._calculateComponentsHeights();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.contentResizeListener.detach(this._handleResize);
  }

  _calculateComponentsHeights() {
    const {headerHeight, tailHeight, fixedContentHeight} = this.state;
    const newHeaderHeight = this.pageHeaderRef ? this.pageHeaderRef.offsetHeight : headerHeight;
    const newTailHeight = this.pageHeaderTailRef ? this.pageHeaderTailRef.offsetHeight : tailHeight;
    const newFixedContentHeight = this.pageHeaderFixedContentRef ? this.pageHeaderFixedContentRef.offsetHeight : fixedContentHeight;

    if (headerHeight !== newHeaderHeight ||
        tailHeight !== newTailHeight ||
        fixedContentHeight !== newFixedContentHeight) {
      this.setState({
        headerHeight: newHeaderHeight,
        tailHeight: newTailHeight,
        fixedContentHeight: newFixedContentHeight
      });
    }
  }

  _setContainerScrollTopThreshold({shortThreshold}) {
    this.containerScrollTopThreshold = shortThreshold ? SHORT_SCROLL_TOP_THRESHOLD : SCROLL_TOP_THRESHOLD;
  }

  _getScrollContainer() {
    return this.scrollableContentRef;
  }

  _shouldBeMinimized(containerScrollTop) {
    return containerScrollTop > this.containerScrollTopThreshold;
  }

  _handleScroll() {
    const scrollContainer = this._getScrollContainer();
    const containerScrollTop = scrollContainer.scrollTop;
    const nextMinimized = this._shouldBeMinimized(containerScrollTop);
    const {minimized} = this.state;

    if (minimized !== nextMinimized) {
      this.setState({
        minimized: nextMinimized
      });
    }
  }

  _handleResize() {
    // Fixes width issues when scroll bar is present in windows
    const scrollContainer = this._getScrollContainer();
    const scrollBarWidth = scrollContainer && scrollContainer.offsetWidth - scrollContainer.clientWidth;

    if (this.state.scrollBarWidth !== scrollBarWidth) {
      this.setState({scrollBarWidth});
    }
  }

  _safeGetChildren(element) {
    if (!element || !element.props || !element.props.children) {
      return [];
    }

    return element.props.children;
  }

  _calculatePageDimensionsStyle() {
    const {maxWidth, sidePadding} = this.props;
    if (!maxWidth && !sidePadding && sidePadding !== 0) {
      return null;
    }

    const styles = {};
    if (maxWidth) {
      styles.maxWidth = `${maxWidth}px`;
    }

    if (sidePadding || sidePadding === 0) {
      styles.paddingLeft = `${sidePadding}px`;
      styles.paddingRight = `${sidePadding}px`;
    }

    return styles;
  }

  _pageHeaderContainerStyle() {
    const {scrollBarWidth} = this.state;
    if (scrollBarWidth) {
      return {width: `calc(100% - ${scrollBarWidth}px`};
    }
    return null;
  }

  _calculateHeaderMeasurements({PageTail}) {
    const {gradientCoverTail} = this.props;
    const {headerHeight, tailHeight, fixedContentHeight, minimized} = this.state;
    const headerContentHeight = headerHeight - fixedContentHeight;

    const minimizedHeaderHeight = PageTail ? headerContentHeight - 78 : headerContentHeight - (78 - TAIL_TOP_PADDING_PX);

    const calculatedHeaderHeight = !minimized ? headerContentHeight : minimizedHeaderHeight;
    const headerHeightDelta = headerContentHeight - calculatedHeaderHeight;
    const headerContainerHeight = calculatedHeaderHeight + fixedContentHeight;

    const imageHeight = `${headerContentHeight + (PageTail ? -tailHeight : 39)}px`;
    const gradientHeight = gradientCoverTail ? `${headerContentHeight + (PageTail ? -SCROLL_TOP_THRESHOLD : 39)}px` : imageHeight;

    return {
      imageHeight,
      gradientHeight,
      headerHeightDelta,
      headerContainerHeight
    };
  }

  render() {
    const {backgroundImageUrl, gradientClassName, children} = this.props;
    const {minimized} = this.state;
    const hasBackgroundImage = !!backgroundImageUrl;
    const hasGradientClassName = !!gradientClassName && !backgroundImageUrl;
    const {
      PageHeader,
      PageContent,
      PageFixedContent,
      PageTail
    } = getChildrenObject(children);
    this._setContainerScrollTopThreshold({shortThreshold: PageTail && hasGradientClassName});
    const contentFullScreen = PageContent && PageContent.props.fullScreen;
    const pageDimensionsStyle = this._calculatePageDimensionsStyle();
    const {
      imageHeight,
      gradientHeight,
      headerContainerHeight: scrollableContentOffset,
      headerHeightDelta
    } = this._calculateHeaderMeasurements({PageTail});

    return (
      <div className={s.page}>
        <div
          style={this._pageHeaderContainerStyle()}
          className={classNames(s.pageHeaderContainer, {
            [s.minimized]: minimized
          })}
          ref={r => this.pageHeaderRef = r}
          >
          <div
            className={classNames(s.pageHeaderContent, {
              [s.minimized]: minimized,
              [s.withoutBottomPadding]: minimized
            })}
            >
            {
            PageHeader &&
              <div className={s.pageHeader} style={pageDimensionsStyle}>
                {React.cloneElement(
                  PageHeader, {
                    minimized,
                    hasBackgroundImage
                  })}
              </div>
            }
            {
            PageTail &&
              <div
                data-hook="page-tail"
                className={classNames(s.tail, {[s.minimized]: minimized})}
                style={pageDimensionsStyle}
                ref={r => this.pageHeaderTailRef = r}
                >
                {React.cloneElement(PageTail, {minimized})}
              </div>
            }
          </div>
          {
              PageFixedContent &&
                <div
                  data-hook="page-fixed-content"
                  className={s.content}
                  style={pageDimensionsStyle}
                  ref={r => this.pageHeaderFixedContentRef = r}
                  >
                  {React.cloneElement(PageFixedContent)}
                </div>
          }
        </div>
        <div
          className={s.scrollableContent}
          onScroll={this._handleScroll}
          data-hook="page-scrollable-content"
          data-class="page-scrollable-content"
          style={{paddingTop: `${scrollableContentOffset}px`}}
          ref={r => this.scrollableContentRef = r}
          >
          {
            hasBackgroundImage &&
              <div
                className={s.imageBackgroundContainer}
                style={{height: imageHeight}}
                data-hook="page-background-image"
                >
                <div
                  className={s.imageBackground}
                  style={{backgroundImage: `url(${backgroundImageUrl})`}}
                  />
              </div>
          }
          {
            hasGradientClassName && !hasBackgroundImage &&
              <div
                data-hook="page-gradient-class-name"
                className={`${s.gradientBackground} ${gradientClassName}`}
                style={{height: gradientHeight}}
                />
          }
          <div className={s.contentContainer}>
            <div className={classNames(s.content, {[s.contentFullScreen]: contentFullScreen})} style={contentFullScreen ? null : pageDimensionsStyle}>
              {this._safeGetChildren(PageContent)}
            </div>
            {headerHeightDelta ? <div style={{height: `${headerHeightDelta}px`}}/> : null}
          </div>
        </div>
      </div>
    );
  }
}

const FixedContent = props => props.children;
Content.displayName = 'Page.FixedContent';
Content.propTypes = {
  children: PropTypes.element.isRequired
};


Page.displayName = 'Page';
Page.Header = PageHeader;
Page.Content = Content;
Page.FixedContent = FixedContent;
Page.Tail = Tail;

Page.propTypes = {
  /** Background image url of the header beackground */
  backgroundImageUrl: PropTypes.string,
  /** Sets the max width of the header and the content */
  maxWidth: PropTypes.number,
  /** Sets padding of the sides of the page */
  sidePadding: PropTypes.number,
  /** Header background color class name, allows to add a gradient to the header */
  gradientClassName: PropTypes.string,
  /** If false Gradient will not cover Page.Tail */
  gradientCoverTail: PropTypes.bool,
  children: PropTypes.arrayOf((children, key) => {
    console.log('validate: ');
    const childrenObj = getChildrenObject(children);

    if (!childrenObj.PageHeader) {
      return new Error(`Page: Invalid Prop children, must contain Page.Header`);
    }

    if (!childrenObj.PageContent) {
      return new Error(`Page: Invalid Prop children, must contain Page.Content`);
    }

    if (
      children[key].type !== Page.Header &&
      children[key].type !== Page.Content &&
      children[key].type !== Page.FixedContent &&
      children[key].type !== Page.Tail
    ) {
      return new Error(`Page: Invalid Prop children, unknown child ${children[key].type}`);
    }
  }).isRequired
};

function getChildrenObject(children) {
  console.log('getChildren: ', React.Children.toArray(children));
  return React.Children.toArray(children).reduce((acc, child) => {
    switch (child.type) {
      case Page.Header : {
        acc.PageHeader = child;
        break;
      }
      case Page.Content : {
        acc.PageContent = child;
        break;
      }
      case Page.FixedContent : {
        acc.PageFixedContent = child;
        break;
      }
      case Page.Tail : {
        acc.PageTail = child;
        break;
      }
      default : {
        break;
      }
    }
    return acc;
  }, {});
}

export default Page;
