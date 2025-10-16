import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import todos from "./todos.json";
export default function TodoList() {
 return(
   <div id="wd-todolist">
     <h3>Todo List</h3>
     <ListGroup>
       { todos.map(todo => {
           // eslint-disable-next-line react/jsx-key
           return(<TodoItem todo={todo}/>);   })}
     </ListGroup><hr/>
   </div>
);}
