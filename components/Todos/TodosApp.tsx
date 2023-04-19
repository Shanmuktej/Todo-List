import { Button, Container, Row, Col, Navbar } from "react-bootstrap";
import TodoForm, { triggerTodoForm } from "./TodoForm";
import Todos from "./Todos";
import { selectedTodo } from "./componentState";
import Filters from "./Filters";

// const baseURL = "https://e3381.mocklab.io";
// const baseURL = "https://mockend.com/org/repo/posts";
// const baseURL = "https://api.npoint.io/33b0a9db8d34a4783823";

function openNewTodo() {
  triggerTodoForm.value = true;
  selectedTodo.value = null;
}

function closeNewTodo() {
  triggerTodoForm.value = false;
  selectedTodo.value = null;
}

const TodosApp = () => {

  return (
    <>
      <Container className="row m-0 p-0" fluid style={{ width: "-webkit-fill-available" }} >
        <Col lg={2} className="filterContainer">
          <Filters />
        </Col>
        <Col lg={10} className="todoContainer">
          <Todos />
          <Button className="newTodo" size="lg" variant="none" onClick={openNewTodo} >+</Button>
        </Col>
        <TodoForm show={triggerTodoForm.value} onHide={closeNewTodo} />
      </Container>
    </>
  );
};

export default TodosApp;
