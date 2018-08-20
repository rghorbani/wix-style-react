import React from 'react';
import styles from './SortableList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Sortable from './Sortable';
import backend from 'react-dnd-html5-backend';
import {DragDropContextProvider} from 'react-dnd';
import WixComponent from '../BaseComponents/WixComponent';
import DragAndDropLarge from 'wix-style-react/new-icons/system/DragAndDropLarge';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.onMove = this.onMove.bind(this);
    this.state = {items: props.items};
  }

  render() {
    const {items} = this.state;

    const renderItem = ({isPlaceholder, isPreview, connectHandle, text}) => {
      const classes = classNames({
        [styles.placeholder]: isPlaceholder,
        [styles.card]: true,
        [styles.preview]: isPreview
      });

      return (
        <div className={classes}>
          {connectHandle(
            <div className={styles.handle}>
              <DragAndDropLarge/>
            </div>
          )}
          {text}
        </div>
      );
    };

    return <Sortable withHandle items={items} render={renderItem} onMove={this.onMove}/>;
  }

  onMove({id, from, to}) {
    this.setState(
      ({items: [..._items]}) =>
        _items.splice(to, 0, ..._items.splice(from, 1)) && {
          items: _items
        }
    );

    this.props.onMove({id, from, to});
  }
}

List.propTypes = {
  items: PropTypes.array,
  onMove: PropTypes.func
};

List.defaultProps = {
  onMove: () => {
    /**/
  }
};

export default class SortableList extends WixComponent {
  render() {
    return (
      <DragDropContextProvider backend={backend}>
        <List {...this.props}/>
      </DragDropContextProvider>
    );
  }
}
