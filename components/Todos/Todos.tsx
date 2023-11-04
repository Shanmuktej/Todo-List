import { effect, signal } from "@preact/signals-react";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { selectedTodo } from "./componentState";
// import { triggerTodoForm, selectedTodo } from "./componentState";
import { FilterTypes, selectedFilter } from "./Filters";
import { triggerTodoForm } from "./TodoForm";

export type TodoType = {
  id: number;
  title: string;
  description: string;
  createdDate: string;
  targetDate: string;
  modifiedDate?: string;
};
// export const selectedTodo = signal<TodoType | null>(null);
export const todos = signal<Array<TodoType>>([]);
export const filteredTodos = signal<Array<TodoType>>([]);

const today = new Date();
const pastDay = new Date();
const futureDay = new Date();
pastDay.setDate(today.getDate() -1)
futureDay.setDate(today.getDate() +1)
const tutorialTodos: TodoType[] = [
  {
    id: -1,
    createdDate: today.toLocaleString(),
    title: "Todo - Present",
    targetDate: today.toLocaleDateString(),
    description: "Example of Present todo, use present filter",
    },
    {
      id: -2,
      createdDate: today.toLocaleString(),
      title: "Todo - Past",
      targetDate: pastDay.toLocaleDateString(),
      description: "Example of Past todo, use past filter",
    },
    {
      id: -3,
      createdDate: today.toLocaleString(),
      title: "Todo - Future",
      targetDate: futureDay.toLocaleDateString(),
      description: "Example of Future todo, use future filter",
  },
]; 

export const setTodos = () => {
  let localTodos = localStorage.getItem("todos")
  todos.value = localTodos != null ? JSON.parse(localTodos) : tutorialTodos
};

export const setFilteredTodos = (filterType: FilterTypes) => {
  let allTodos = todos.value;
  switch (filterType) {
    case "All":
      filteredTodos.value = allTodos;
      break;
    case "Today":
      filteredTodos.value = allTodos.filter(
        (todo: TodoType) =>
          new Date(todo.targetDate).getDate() == new Date().getDate()
      );
      break;
    case "Past":
      filteredTodos.value = allTodos.filter(
        (todo: TodoType) =>
          new Date(todo.targetDate).getDate() < new Date().getDate()
      );
      break;
    case "Future":
      filteredTodos.value = allTodos.filter(
        (todo: TodoType) =>
          new Date(todo.targetDate).getDate() > new Date().getDate()
      );
      break;
    default:
      break;
  }
  console.log(filteredTodos.value);
};

const Todos = () => {
  useEffect(() => {
    setTodos()
  }, []);

  useEffect(() => {
    filteredTodos.value = todos.value;
    setFilteredTodos(selectedFilter.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos.value]);

  const editTodo = (data: TodoType) => {
    selectedTodo.value = data;
    console.log(selectedTodo.value);
    triggerTodoForm.value = true;
  }

  const removeTodo = (data: TodoType) => {
    todos.value = todos.value.filter((todo): boolean => todo.id !== data.id);
    localStorage.setItem("todos", JSON.stringify(todos.value));
  };

  return (
    <Row lg={3} md={2} sm={2} xs={1} style={{ paddingTop: "40px", paddingBottom: "100px" }} >
      {filteredTodos.value.map((todo: TodoType) => {
        return (
          <Col key={todo.id} lg={4} md={6} xs={12} className="mr-auto">
            <Card className="m-3 rounded rounded-4" >
              <Card.Header className="d-flex justify-content-between bg-transparent">{todo.title}
                <div className="actions">
                  <span role="button" className="fs-5 mx-1" onClick={() => editTodo(todo)} > 🖉 </span>
                  <span role="button" className="fs-5 mx-1" onClick={() => removeTodo(todo)} > 🗑 </span>
                </div>
              </Card.Header>
              <Card.Body className="overflow-hidden position-relative">
                <div>{todo.description}</div>
                <div className="position-absolute bottom-0">
                  {todo.targetDate && (
                    <span className="fw-light" style={{ fontSize: "10px" }}>
                      Target: {todo.targetDate}
                    </span>
                  )}
                </div>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between font-monospace bg-transparent">
                <span className="fw-lighter" style={{ fontSize: "10px" }}>
                  {todo.modifiedDate
                    ? `Modified On:${todo.modifiedDate}`
                    : `Created On: ${todo.createdDate}`}
                </span>
              </Card.Footer>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Todos;
