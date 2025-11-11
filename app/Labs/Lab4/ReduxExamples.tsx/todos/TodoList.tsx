// "use client";
// import { useState } from "react";
// import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
// import TodoForm from "./TodoForm";
// import TodoItem from "./TodoItem";
// import { useSelector } from "react-redux";

// interface Todo {
//   id: string;
//   title: string;
// }

// interface RootState {
//   todosReducer: {
//     todos: Todo[];
//     todo: Todo | { title: string };
//   };
// }

// export default function TodoList() {
//   const { todos } = useSelector((state: RootState) => state.todosReducer);
//   return (
//     <div>
//       <h2>Todo List</h2>
//       <ListGroup>
//         <TodoForm/>
//         {todos.map((todo: Todo) => (
//           <TodoItem 
//           todo={todo}
//           key={todo.id} />
//         ))}
//       </ListGroup>
//       <hr />
//     </div>
//   );
// }
