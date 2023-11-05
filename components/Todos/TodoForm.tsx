import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { setTodos, TodoType, todos, setFilteredTodos } from "./Todos";
import { selectedTodo } from "./componentState";
// import { triggerTodoForm, selectedTodo } from "./componentState";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { selectedFilter } from "./Filters";
import { signal, effect } from '@preact/signals-react';

export const triggerTodoForm = signal(false);
const TodoForm = (props: { show: boolean; onHide: any }) => {
  const { register, formState: { errors, isValid }, reset, setValue, getValues, } = useForm({ mode: "onChange" });

  useEffect(() => {
    setValue("form", {
      id: selectedTodo.value?.id ?? "",
      title: selectedTodo.value?.title ?? "",
      description: selectedTodo.value?.description ?? "",
      createdDate: selectedTodo.value?.createdDate ?? "",
      targetDate: selectedTodo.value?.targetDate ?? "",
      modifiedDate: selectedTodo.value?.modifiedDate ?? "",
    });
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTodo.value]);

  const createOrEditTodo = (data: TodoType) => {
    if (selectedTodo.value != null) {
      data.modifiedDate = new Date();
      data.targetDate = new Date(data.targetDate)
      todos.value[
        todos.value.findIndex((todo) => todo.id === selectedTodo.value?.id)
      ] = data;
    } else {
      Object.assign(data, {
        id: (todos.value.at(-1)?.id ?? 0) + 1,
        createdDate: new Date(),
      });
      todos.value.push(data);
    }
    localStorage.setItem("todos", JSON.stringify(todos.value));
    reset();
    setFilteredTodos(selectedFilter.value);
    triggerTodoForm.value = false;
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Todo</Modal.Title>
      </Modal.Header>
      <Form className="container vh-25 m-2 w-100">
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" {...register("form.title", { required: true })} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" type="text" placeholder="Description" {...register("form.description", { required: true })} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Target Date</Form.Label>
            <Form.Control type="date" {...register("form.targetDate", { required: true })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" type="submit" disabled={!isValid} className='increaseBtn'
            onClick={() => {
              createOrEditTodo(getValues("form"));
              props.onHide();
            }}
          >
            {selectedTodo.value != null ? "Save Changes" : "Create New"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TodoForm;
