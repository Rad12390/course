import React from 'React';
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from 'react-bootstrap';

const CourseList = (props) => {
  
const data = props.data;

const items = [];

  for (const values of props.data) {
    items.push(
      <tr key={values.id}>
        <td>{values.title}</td>
        <td>{values.instructor}</td>
        <td>{values.description}</td>
        <td>{values.credits}</td>
      </tr>
      );
  }

return ( 

  <>
  <Table stripped bordered hover size="sm">
              <thead>
                <tr>
                  <th width="170">Title</th>
                  <th width="170">Instructor</th>
                  <th width="170">Description</th>
                  <th width="170">Credits</th>
                  
                </tr>
              </thead>
              <tbody>
{items}
               
              
                </tbody>
             </Table>
  </>
  )
}

export default CourseList;