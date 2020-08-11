import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const Menu = (props) => {
	
	if(props.dishes.isLoading)
	{
		return(
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>

		);
	}

	else if(props.dishes.errMess!=null)
	{
		return(
			<div className="container">
				<div className="row">
					<h4>{props.dishes.errMess}</h4>
				</div>
			</div>

		);
	}
	
	else{

		return(
			<div className="container">
				<div className="row">
					<MenuBreadCrumb />
				</div>
				<div className="row">
					<MenuItems dishes={props.dishes.dishes}/>
				</div>
			</div>
		);
	}
}

const MenuBreadCrumb = () => {

	return(
		<div>
			<Breadcrumb>
				<BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
				<BreadcrumbItem active>Menu</BreadcrumbItem>
			</Breadcrumb>
			<div className="col-12">
				<h3>Menu</h3>
				<hr />
			</div>   
		</div>
	);
}

const MenuItems = ({dishes}) => {

	return dishes.map((dish) => {

		return(
			<div key={dish._id} className="col-12 col-md-5 m-1">
				<Card>
					<Link to={`/menu/${dish._id}`}>
					<CardImg width="50%" src={baseUrl+dish.image} alt={dish.name} />
					<CardImgOverlay className="ml-5">
					<CardTitle heading={true}>{dish.name}</CardTitle>
					</CardImgOverlay>
					</Link>
				</Card>
			</div>
		)
	});
}


		
export default Menu;