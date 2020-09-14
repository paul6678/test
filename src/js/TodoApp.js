import React, { Component } from 'react';
import TodoList from './TodoList';
import '../css/TodoApp.css';
import TextField from 'material-ui/TextField';

const styles = {
  textField: {
    height: 100,
    width: 500,
    fontSize: 40,
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoLists: [],
      newListName: '',
      completedItemNum: [0, 0],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChangeListName = this.handleChangeListName.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }
  handleChange(event) {
    this.setState({
      newListName: event.target.value,
    });
  }
  handleKeyDown(event) {
    if (event.keyCode === 13 && this.state.newListName !== '') {
      event.preventDefault();
      const todoLists = this.state.todoLists;
      todoLists.push({
        id: this.state.todoLists.length,
        name: this.state.newListName,
        items: [],
      });
      this.setState({
        todoLists,
        newListName: '',
      });
    }
  }
  handleChangeListName(listID, newListName) {
    const targetList = this.state.todoLists[listID];
    targetList.name = newListName;
    this.setState({ targetList });
  }
  handleDeleteList(listID) {
    const itemNum = this.state.completedItemNum;
    for ( let i = 0 ; i < this.state.todoLists[listID].items.length ; i += 1 ) {
      if (typeof this.state.todoLists[listID].items[i] === 'undefined') {
        continue;
      }
      itemNum[
        this.state.todoLists[listID].items[i].completed
      ] -= 1;
    }
    this.setState({ itemNum });
    delete this.state.todoLists[listID];
    this.setState({ todoLists: this.state.todoLists });
  }
  handleAddItem(listID, newItemName) {
    const targetList = this.state.todoLists[listID];
    targetList.items.push({
      id: targetList.items.length,
      name: newItemName,
      completed: 0,
    });
    const itemNum = this.state.completedItemNum;
    itemNum[0] += 1;
    this.setState({
      targetList,
      itemNum,
    });
  }
  handleDeleteItem(listID, itemID) {
    const itemNum = this.state.completedItemNum;
    itemNum[
      this.state.todoLists[listID].items[itemID].completed
    ] -= 1;
    this.setState({
      itemNum,
    });
    delete this.state.todoLists[listID].items[itemID];
    this.setState({
      todoLists: this.state.todoLists,
    });
  }
  handleClickItem(listID, itemID) {
    const targetList = this.state.todoLists[listID];
    const itemNum = this.state.completedItemNum;
    itemNum[
      targetList.items[itemID].completed
    ] -= 1;
    targetList.items[itemID].completed += 1;
    targetList.items[itemID].completed %= 2;
    itemNum[
      targetList.items[itemID].completed
    ] += 1;
    this.setState({
      targetList,
      itemNum,
    });
  }

  render() {
    return (
      <div className="todoApp">
        <h1 className="appTitle">TODOs</h1>
        <div className="todoListsInput">
          <TextField
            hintText="Your Todo List's Name"
            value={this.state.newListName}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            style={styles.textField}
          />
        </div>
        <p className="numItems">
          # of Active Items: {this.state.completedItemNum[0]}
        </p>
        <p className="numItems">
          # of Completed Items: {this.state.completedItemNum[1]}
        </p>
        <div>
          <ul className="todoLists">
            {this.state.todoLists.map(list =>
              <div className="todoList">
                <TodoList
                  key={list.id}
                  list={list}
                  changeListName={this.handleChangeListName}
                  deleteList={this.handleDeleteList}
                  addItem={this.handleAddItem}
                  deleteItem={this.handleDeleteItem}
                  clickItem={this.handleClickItem}
                />
              </div>,
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
