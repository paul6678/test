import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {grey900} from 'material-ui/styles/colors';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';

const style = {
  margin: 12,
};

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      newItemName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeListName = this.handleChangeListName.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }
  handleChange(event) {
    this.setState({
      newItemName: event.target.value,
    });
  }
  handleChangeListName(event) {
    this.props.changeListName(
      this.props.list.id,
      event.target.value,
    );
  }
  handleDeleteList() {
    this.props.deleteList(this.props.list.id);
  }
  handleAddItem(event) {
    if (event.keyCode === 13 && this.state.newItemName !== '') {
      event.preventDefault();
      this.props.addItem(
        this.props.list.id,
        this.state.newItemName,
      );
      this.setState({ newItemName: '' });
    }
  }
  handleDeleteItem(itemID) {
    this.props.deleteItem(
      this.props.list.id,
      itemID,
    );
  }
  handleClickItem(itemID) {
    this.props.clickItem(
      this.props.list.id,
      itemID,
    );
  }
  render() {
    return (
      <div className="inList" >
        <TextField
          hintText="Todo List's Name"
          value={this.props.list.name}
          onChange={this.handleChangeListName}
        />
        <RaisedButton
          icon={
            <ContentRemoveCircle
              color={grey900}
            />
          }
          style={style}
          onClick={this.handleDeleteList}
        />
        <TextField
          hintText="Your Todo Item's Name"
          value={this.state.newItemName}
          onChange={this.handleChange}
          onKeyDown={this.handleAddItem}
        />
        <div className="itemsBlock">
          {this.props.list.items.map(item =>
            <TodoItem
              key={item.id}
              item={item}
              deleteItem={this.handleDeleteItem}
              clickItem={this.handleClickItem}
            />,
          )}
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  list: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    items: React.PropTypes.array,
  }).isRequired,
  changeListName: React.PropTypes.func.isRequired,
  deleteList: React.PropTypes.func.isRequired,
  addItem: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  clickItem: React.PropTypes.func.isRequired,
};

export default TodoList;
