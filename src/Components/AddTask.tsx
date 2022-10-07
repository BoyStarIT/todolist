import React, { useEffect } from "react";
import { ITask } from "../Interfaces";
import { Form, Row, Col, Input, DatePicker, Select, Button } from "antd";
import moment from "moment";
import { FORMAT_DATE, PIORITY_LIST } from "../constants";

const { Option } = Select;

interface IAddTask {
  task?: ITask;
  onSuccess(data: ITask): void;
}

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const AddTask = (props: IAddTask) => {
  const { task, onSuccess } = props;
  const [form] = Form.useForm();

  const handleSubmit = (data: ITask) => {
    const _data = {
      ...data,
      ...(task === undefined && { id: generateUUID() }),

      checked: false,
    };
    onSuccess(_data);
    form.resetFields();
  };

  useEffect(() => {
    if (task !== undefined) {
      form.setFieldsValue({
        ...task,
        dueDate: moment(moment(task.dueDate), FORMAT_DATE),
      });
    }
  }, [task, form]);

  return (
    <div className="add-task-wrap">
      {task !== undefined ? "" : <h2 className="title"> New Task</h2>}

      <div className="form-add-task-wrap">
        <Form
          name="addTask"
          form={form}
          className="form-add-task"
          layout="vertical"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          onFinish={handleSubmit}
          autoComplete="off"
          initialValues={{
            dueDate: moment(),
            piority: PIORITY_LIST[1],
          }}
        >
          <Row gutter={[32, 0]} justify="center">
            <Col md={24} xs={24}>
              <Form.Item
                name="taskName"
                className="form-item form-taskname"
                rules={[
                  {
                    required: true,
                    message: "Please input task name!",
                  },
                ]}
              >
                <Input
                  className="ant-input-border"
                  placeholder="Add new task..."
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                label="Description"
                name="description"
                className="form-item form-description"
              >
                <Input.TextArea
                  placeholder=""
                  rows={5}
                  className="ant-input-border"
                />
              </Form.Item>
            </Col>

            <Col md={12} xs={24}>
              <Form.Item
                label="Due Date"
                name="dueDate"
                className="form-item form-duedate"
              >
                <DatePicker
                  className="duedate-date-picker"
                  format={FORMAT_DATE}
                  disabledDate={(current) => {
                    return (
                      moment().add(-1, "days") >= current ||
                      moment().add(1, "month") <= current
                    );
                  }}
                  clearIcon={null}
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label="Piority"
                name="piority"
                className="form-item form-piority"
              >
                <Select>
                  {PIORITY_LIST.map((piority) => (
                    <Option key={piority}>{piority}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              {task !== undefined ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-item btn-add-task"
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-item btn-add-task"
                >
                  Add
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddTask;
