import React, { useEffect, useState } from "react";
import { ITask } from "../Interfaces";
import TaskItem from "./TaskItem";
import { Button, Input, Modal } from "antd";

const { Search } = Input;

interface IListTask {
  listTask: ITask[];
  onUpdated: (task: ITask, index: number, action: "edit" | "remove") => void;
  onRemoveMultiple: () => void;
}

const ListTask = (props: IListTask) => {
  const { listTask, onUpdated, onRemoveMultiple } = props;

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);

  const onChangeKeyword = (event: any) => {
    setKeyword(event.target.value);
  };

  const onSearch = () => {
    let _tasks = listTask;
    _tasks = _tasks.filter((task) =>
      task.taskName.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    );
    setTasks(_tasks);
  };

  const onClickRemove = () => {
    setIsShowConfirm(true);
  };

  const onRemove = () => {
    onRemoveMultiple();
    setIsShowConfirm(false);
  };

  const handleCancelModal = () => {
    setIsShowConfirm(false);
  };

  useEffect(() => {
    let _tasks = listTask;
    if (keyword?.length > 0) {
      _tasks = _tasks.filter((task) =>
        task.taskName.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      );
    }
    _tasks.sort((a, b) => a?.dueDate - b?.dueDate);
    setTasks(_tasks);
  }, [listTask]);

  return (
    <div className="todo-list-wrap">
      <div className="todo-list-box">
        <h2 className="title"> To Do List </h2>
        <div className="search-task">
          <Search
            placeholder="Search ..."
            onChange={onChangeKeyword}
            onSearch={onSearch}
            className="ant-input-border "
          />
        </div>
        <div className="list-task-wrap">
          {tasks.map((task: ITask, index: number) => {
            return (
              <TaskItem
                key={task.id + index}
                task={task}
                index={index}
                onUpdated={onUpdated}
              />
            );
          })}
        </div>
      </div>
      {listTask.findIndex((task) => task.checked) > -1 && (
        <div className="bulk-action-wrap">
          <span className="bulk-action-title">Bulk Action:</span>
          <div className="bulk-ations">
            <Button className="btn-item btn-done">Done</Button>
            <Button className="btn-item btn-remove" onClick={onClickRemove}>
              Remove
            </Button>
          </div>
        </div>
      )}
      <Modal
        title="Confirm Modal"
        open={isShowConfirm}
        onOk={onRemove}
        onCancel={handleCancelModal}
      >
        <div>Are you sure remove multiple tasks?</div>
      </Modal>
    </div>
  );
};

export default ListTask;
