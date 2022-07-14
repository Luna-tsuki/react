import React, { Component, Fragment } from "react";

class TodoListExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "hello world!!!!",
      list: [],
    };
  }

  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea">输入内容</label>
          <input
            id="insertArea"
            value={this.state.inputValue}
            onChange={this.handleInputChange.bind(this)}
          />
          <button onClick={this.handleBtnClick.bind(this)}>提交</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <li
                key={index}
                onClick={this.handleItemDelete.bind(this, index)}
                dangerouslySetInnerHTML={{ __html: item }}
              ></li>
            );
          })}
        </ul>
      </Fragment>
    );
  }

  handleInputChange(e) {
    // console.log(e.target.value)
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleBtnClick(e) {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: "",
    });
  }

  handleItemDelete(index) {
    console.log(index);
    // 拷贝一份，不要直接去修改state里面的数据
    const list = [...this.state.list];
    list.splice(index, 1);

    this.setState({
      list: list,
    });
  }
}

export default TodoListExample;
