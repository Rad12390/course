import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Modal,Form,Button} from 'react-bootstrap';
import AddCourse from './AddCourse.jsx';
import CourseList from './CourseList.jsx';

export default class Course extends React.Component {
  constructor(props) {
        super(props);
        this.state = { 
             showModal: false,
             list:''
        };
      }
    
  toggleModal = () => this.setState({
                showModal: !this.state.showModal
              })
  componentDidMount = () => {
     this.fetchApiToEntries(); 
    }
  updateState = (data) => {

    this.setState({
    list: [
        ...this.state.list,
        data
    ]
});


//        let a = this.state.list.slice(); //creates the clone of the state
// a[] = data;
// this.setState({list: a});

        // this.setState({
        //   list:data
        // });
        this.toggleModal();
       
    }



  fetchApiToEntries = () => {
//     const [Courses, setCourses] = React.useState([]); 

      fetch("http://127.0.0.1:8000/api/v1/course/list")
                .then(result => result.json())
                .then((list) => {
                       this.setState({
                            list:list.data
                          });

                })
                .catch((error) => console.log(error));
                // console.log("/////////////////////////////////////////////////");
  }   

    render() {
       
      console.log("this.state");
      console.log(this.state);
        const buttonStyle = {marginLeft : '1053px'}
        const data = this.state.list;
        // setlists(this.state.list);


    
        // console.log("21341231231232131"+data);

        return (
            <div className="container mt-3">
            <div>  
                    <div className={`container ${this.state.showModal ? 'modal-open' :''}`}>
                        <h3>Courses   
                            <button  className="btn btn-primary" onClick={ this.toggleModal} style={buttonStyle}> Add Course </button>
                        </h3>
                        <AddCourse  toggle = {this.toggleModal} updateState={this.updateState} showModal={this.state.showModal}/>
                    </div>
               
            </div>
            
            <div className="row justify-content-center">
                    <CourseList data={data} />
            </div>
        </div>
        );
    }
}

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <Course/>
        </React.StrictMode>
    )
}