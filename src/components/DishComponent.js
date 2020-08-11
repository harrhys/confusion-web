import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import Comments from './DishCommentsComponent'
import {baseUrl} from '../shared/baseUrl';


function Dish(props){

	if(props.isLoading)
	{
		return(
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>

		);
	}
	else if(props.errMess!=null)
	{
		return(
			<div className="container">
				<div className="row">
					<h4>{props.disherrMess}</h4>
				</div>
			</div>

		);
	}
	else
			
		return(
			<div className="container">
				<div className="row">
					<DishBreadCrumb 
						dish={props.selectedDish}
					/>       
				</div>
				<div className="row">
					<DishDetails 
						dish={props.selectedDish} 
					/>
					<Comments 
						dish={props.selectedDish}
						postComment={props.postComment}
					/>
				</div>
			</div> 
		);
}

const DishBreadCrumb = ({dish}) => {

	return(
		<div>
			<Breadcrumb>
				<BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
				<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
				<BreadcrumbItem active>{dish.name}</BreadcrumbItem>
			</Breadcrumb>
			<div className="col-12">
				<h3>{dish.name}</h3>
				<hr />
			</div>         
		</div>
	);
}

const DishDetails = ({dish}) => {
	
	return(
		<div  className="col-12 col-md-5 m-1">
			<Card>
				<CardImg top src={baseUrl+dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
	
}

export default Dish;