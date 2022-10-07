import React, { FC, useEffect, useState } from "react";
import "./App.scss";
import ListTask from "./Components/ListTask";
import AddTask from "./Components/AddTask";
import { ITask } from "./Interfaces";
import { Row, Col } from "antd";
import { TODOLIST } from "./constants";

const App: FC = () => {
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [isInit, setIsInit] = useState<boolean>(true);

  const handelAddTask = (data: ITask): void => {
    const _todoList = [...todoList, data];
    setTodoList(_todoList);
  };

  const onUpdateTask = (
    task: ITask,
    index: number,
    action: "edit" | "remove"
  ) => {
    const _todoList = [...todoList];
    if (action === "edit") {
      _todoList[index] = task;
    } else {
      _todoList.splice(index, 1);
    }
    setTodoList(_todoList);
  };

  const onRemoveMultiple = () => {
    const _todoList = todoList.filter((task) => !task.checked);
    setTodoList(_todoList);
  };

  useEffect(() => {
    if (!isInit) {
      localStorage.setItem(TODOLIST, JSON.stringify(todoList));
    } else {
      setIsInit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList]);

  useEffect(() => {
    const initTodoList = localStorage.getItem(TODOLIST);
    if (initTodoList) {
      setTodoList(JSON.parse(initTodoList));
    }
  }, []);

  return (
    <div className="App">
      <div className="page-content">
        <Row justify="center">
          <Col lg={12} md={24} className="left-content">
            <AddTask onSuccess={handelAddTask} />
          </Col>
          <Col lg={12} md={24} className="right-content">
            <ListTask
              listTask={todoList}
              onUpdated={onUpdateTask}
              onRemoveMultiple={onRemoveMultiple}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default App;
