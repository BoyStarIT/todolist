import React, { useState } from "react";
import { ITask } from "../Interfaces";
import { Button, Checkbox, Modal } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import AddTask from "./AddTask";
interface ITaskItem {
  task: ITask;
  index: number;
  onUpdated: (task: ITask, index: number, action: "edit" | "remove") => void;
}

const TaskItem = (props: ITaskItem) => {
  const { index, task, onUpdated } = props;

  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const onChange = (e: CheckboxChangeEvent) => {
    const _task = {
      ...task,
      checked: e.target.checked,
    };
    onUpdated(_task, index, "edit");
  };

  const editSuccess = (task: ITask) => {
    console.log("1111 :>> ", 1111);
    onUpdated(task, index, "edit");
    setIsShowEdit(false);
  };

  const onRemoveTask = () => {
    setIsShowConfirm(true);
  };

  const handleCancelModal = () => {
    setIsShowConfirm(false);
  };

  const handleOkModal = () => {
    onUpdated(task, index, "remove");
    setIsShowConfirm(false);
  };

  return (
    <div className="task-item-wrap">
      <div className="content-wrap">
        <div className="task-title">
          <Checkbox checked={task?.checked} onChange={onChange}>
            {task.taskName}
          </Checkbox>
        </div>
        <div className="task-actions-wrap">
          <Button
            className="btn-item btn-detail"
            onClick={() => setIsShowEdit(!isShowEdit)}
          >
            Detail
          </Button>
          <Button className="btn-item btn-remove" onClick={onRemoveTask}>
            Remove
          </Button>
        </div>
      </div>
      {isShowEdit && <AddTask onSuccess={editSuccess} task={task} />}
      <Modal
        title="Confirm Modal"
        open={isShowConfirm}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
      >
        <div>Are you sure remove this task?</div>
      </Modal>
    </div>
  );
};

export default TaskItem;
