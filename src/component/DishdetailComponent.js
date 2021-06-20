import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg,BreadcrumbItem,Breadcrumb, CardText, CardBody,CardTitle,Label, Col , Row, Modal, ModalHeader, ModalBody,Button } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component{
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

        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId,values.rating,values.yourname,values.comment)
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

    function RenderDish( {dish} ) {
        console.log(dish);
         
        if ( !dish ) {
            return <></>
        } else
        return(
            
         <div>
         <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
            </div>  
                
         );
        }           
    function Comdate({ date }){
        let x = new Date(date).toDateString().split(" ");
        return(
            x[1] +" "+ x[2]+", "+x[3]
        );
    }

    function RenderComments({ comments,postComment,dishId}){
        if (!comments) return <></>
        else
        return(
            <div>
                    <h4>Comments</h4>
                    
                    <ul class="list-unstyled">
                    <Stagger in>
                        {comments.map(( {comment, author, date} )=> {                       
                            return (
                            <Fade in>
                            <li>{comment}</li>
                                                       
                            <li  className="mt-3 mb-4" >{`--${author},`} <Comdate date={date} /> </li>  
                            {/* {Comdate({date:date})} */}
                            </Fade>
                            );
                        })}
                    </Stagger>
                        {/* ${this.comdate(date)} */}
                    </ul>
                   <CommentForm dishId={dishId} postComment={postComment}/>

                </div>        
            
        );
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null)
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem> <Link to='/menu'> Menu </Link> </BreadcrumbItem>
                            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3> {props.dish.name} </h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row" > 
                        <div className="col-12 col-md-5 mt-1 mb-2 mx-2">
                    
                            <RenderDish dish={props.dish}/>
    
                        </div>
                    
                        <div className="col-12 col-md-5 mt-1 mb-2 mx-2">
    
                            <RenderComments comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id}
                            />
                                            
                        </div>
                                      
                    </div>
              </div>
            );
            else 
            return (<div></div>);
        }
export default DishDetail;