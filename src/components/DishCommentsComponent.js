import React from 'react';
import {Modal, ModalHeader, ModalBody, Button, Label, Col, Row} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function Comments({postComment,dish}) {

    const dishcomments = dish.comments.reverse().map(
        (dishcomment) => {
            return(	
                <li className="list-group-item" key={dishcomment._id}>
                    <blockquote  className="blockquote">
                        <p className="mb-0 normal">{dishcomment.comment}</p>
                        <footer className="blockquote-footer">
                            {dishcomment.author}, <cite title="Source Title">  
                                {new Intl.DateTimeFormat('en-US', 
                                {year:'numeric', month:'short', day:'2-digit'})
                                .format(new Date(Date.parse(dishcomment.createdAt)))}
                            </cite>
                        </footer>
                    </blockquote> 
                </li>
            );
        }
    );

    return(
        <div  className="col-12 col-md-5 m-1">
            <CommentsForm dish={dish} postComment={postComment}/>
            <ul className="list-group list-group-flush">
                {dishcomments}
            </ul>
        </div>
    );
}

export class CommentsForm extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            isModalOpen:false
        };
        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    toggleCommentForm(){

        this.setState(
            {
                isModalOpen:!this.state.isModalOpen
            }		
        );
    }

    handleSubmit(values) {
        this.toggleCommentForm();
        this.props.postComment(this.props.dish, values.rating, values.author, values.message);
    }

    render(){

        return(
            <>
            <h3>Comments<span>  </span> 
            <Button  onClick={this.toggleCommentForm}>
                <span className="fa fa-pencil"/> Post Comments
            </Button></h3>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleCommentForm}>
                <ModalHeader toggle={this.toggleCommentForm}>
                    Your Feedback
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Col md={10}>
                            <Control.select model=".rating" name="rating"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={2}>Your Name</Label>
                            <Col md={10}>
                                <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name"
                                className ="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="message" md={2}>Your Comments</Label>
                            <Col md={10}>
                                <Control.text model=".message" id="message" name="message"
                                rows="12" className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                ></Control.text>
                                <Errors
                                    className="text-danger"
                                    model=".message"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Submit Feeback
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                    
                </ModalBody>
            </Modal>
            </>
        )
    }
}

export default Comments;