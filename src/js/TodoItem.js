import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 100,
  },
}

class TodoItem extends Component {
  constructor() {
    super();
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }
  handleDeleteItem() {
    this.props.deleteItem(this.props.item.id);
  }
  handleClickItem() {
    this.props.clickItem(this.props.item.id);
  }
  render() {
    return (
      <div>
        <Checkbox
          label={this.props.item.name}
          style={styles.block}
          onClick={this.handleClickItem}
        />
        <i
          className="material-icons trashCan"
          onClick={this.handleDeleteItem}
        >
          delete
        </i>
      </div>
    );
  }
}

TodoItem.propTypes = {
  item: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    completed: React.PropTypes.number,
  }).isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  clickItem: React.PropTypes.func.isRequired,
};

export default TodoItem;
