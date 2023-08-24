import React from 'React';
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Modal,Form,Button} from 'react-bootstrap';

export default class CourseList extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = { 
        listData:[]
      };
     }

  componentDidMount = () => {
    this.fetchApiToEntries('http://127.0.0.1:8000/api/v1/course/list'); 
    }

  fetchApiToEntries = (courseList) => {
      fetch(courseList)
                .then(result => result.json())
                .then((list) => {
                        this.setState({
                          listData:list.data
                          });
                })
                .catch((error) => console.log(error));
                // console.log("/////////////////////////////////////////////////");
  }   

  render() {
    // console.log(this.state.listData);
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
               {this.state.listData.map((data, index) => (
                  
                      <tr key={index}>
                        <td>{data.title}</td>
                        <td>{data.instructor}</td>
                        <td>{data.description}</td>
                        <td>{data.credits}</td>
                      </tr>

                 ))}
                </tbody>
             </Table>
     </>
    )
  };
}