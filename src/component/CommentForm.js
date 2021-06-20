import React, { Component } from 'react';
import { Label, Col , Row, Modal, ModalHeader, ModalBody,Button} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
// import { Button } from 'bootstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){

        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal();
    }
       
    
    render() {
        return (
            <div>
                <button type="button" class="btn btn-outline-secondary" onClick={this.toggleModal}>  <i class="fa fa-pencil" aria-hidden="true"/> Submit Comment</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group mb-0 ml-0" >
                                <Label htmlFor="rating" >Rating</Label>
                                </Row>
                                <Row className="form-group ">
                                <Col >
                                    <Control.select model=".rating" id="rating" className="form-control"  name="rating">                                        
                                          
                                        <option value="1"> 1 </option>
                                        <option value="2"> 2 </option>
                                        <option value="3"> 3 </option>
                                        <option value="4"> 4 </option>
                                        <option value="5"> 5 </option>                                     
                                    </Control.select>                                    
                                </Col>
                    </Row>
                    <Row className="form-group mb-0 ml-0">
                                <Label htmlFor="yourname" >Your Name</Label>
                                </Row>
                                <Row className="form-group ">
                                <Col >
                                
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                    </Row>
                    <Row className="form-group mb-0 ml-0">
                                <Label htmlFor="comment" >Comment</Label>
                                </Row>
                                <Row className="form-group ">
                                <Col >
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                    </Row>
                    <Button type="submit" color="primary">Submit</Button>

                        </LocalForm>
                    </ModalBody>
            </Modal>
            </div>
        )
    }
   
}

export default CommentForm;
