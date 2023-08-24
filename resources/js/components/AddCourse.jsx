import React from 'React';
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Modal,Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default class AddCourse extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description:'',
      instructor:'',
      list:[]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  dismissModal = ()=>{
    this.props.toggle()
  }

  reload=()=>{
    this.forceUpdate();
  }

  handleInputChange(event) {
    let v =event.target.id;
    this.setState({[v]: event.target.value});
  }
  componentDidMount(){
   
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/api/v1/course/add', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        instructor: this.state.instructor,
        credits: '[{"lcerp":1.0,"nursing":1.0,"cpeu":1.0},{"lcerp":1.0,"nursing":1.0,"cpeu":1.0}]'
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
        return response.json()
      }).then(json => {
      this.setState({list:this.state});

      
        this.dismissModal();
       // onExit();
      });
  }

  render() {
  console.log(this.state);

 return (

      <div className={`modal fade WelcomeModal ${this.props.showModal ? 'show' : ''}`} 
        style={{
              display: `${this.props.showModal ? 'block' : 'none'}`,
            }}
        id="WelcomeModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog d-flex justify-content-center">
        <div className="modal-content w-75">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel4">Add Course</h5>
                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"  onClick={this.dismissModal}></button>
            </div>
            <div className="modal-body p-4">
                <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="name4">Name</label>
                        <input type="text" id="title" value={this.state.value} className="form-control" required onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="Instructor">Instructor</label>
                        <input type="text" id="instructor" value={this.state.value} className="form-control" required onChange={this.handleInputChange}/>
                    </div>
                    
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="Description">Description</label>
                        <textarea cols="5" rows="7" value={this.state.value} id="description" className="form-control" onChange={this.handleInputChange} required/>
                    </div>

                   
                    <button type="submit" className="btn btn-primary btn-block">Add Course</button>
                </form>
            </div>
        </div>
    </div>
        </div>

       
    )
  };
}