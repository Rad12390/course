import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Modal,Form,Button} from 'react-bootstrap';
import AddCourse from './AddCourse.jsx';
import CourseList from './CourseList.jsx';

export default class Course extends React.Component {
  state={
    showModal: false
  }

  
  toggleModal = () => this.setState({
                showModal: !this.state.showModal
              })



    render() {
        
    const buttonStyle = {marginLeft : '1053px'}
        return (
            <div className="container mt-3">
            <div>  
                    <div className={`container ${this.state.showModal ? 'modal-open' :''}`}>
                        <h3>Courses   
                            <button  className="btn btn-primary" onClick={ this.toggleModal} style={buttonStyle}> Add Course </button>
                        </h3>
                        <AddCourse  toggle = {this.toggleModal} showModal={this.state.showModal}/>
                    </div>
               
            </div>
            
            <div className="row justify-content-center">
                      <CourseList/>
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