import React, {Component} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import About from './AboutUsComponent';
import Menu from './MenuComponent';
import Dish from './DishComponent';
import Contact from './ContactComponent';
import Login from './LoginComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {register, login, logout, postComment, fetchDishes, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state =>{

	return{
		dishes: state.dishes,
		user: state.user,
		promotions: state.promotions,
		leaders: state.leaders
	};
}

const mapDispatchToProps = dispatch => ({
  
	postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
	fetchDishes: () => dispatch(fetchDishes()),
	fetchPromos: () => dispatch(fetchPromos()),
	fetchLeaders: () => dispatch(fetchLeaders()),
	register: (username,password, firstname, lastname, email) => dispatch(register(username,password, firstname, lastname, email)),
	logout: () => dispatch(logout()),
	login: (username, password) => dispatch(login(username, password))
});


class Main extends Component{

	componentDidMount(){
		if(this.props.dishes.dishes.length===0)
		this.props.fetchDishes();
		if(this.props.leaders.leaders.length===0)
		this.props.fetchPromos();
		if(this.props.promotions.promotions.length===0)
		this.props.fetchLeaders();
	}

	render(){
		
    const HomePage = () => {
      return(
		  <Home 
		  	  dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
			  dishesErrMess ={this.props.dishes.errMess}
			  dishesLoading={this.props.dishes.isLoading}
			  promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
			  promosErrMess ={this.props.promotions.errMess}
			  promosLoading={this.props.promotions.isLoading}
			  leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
			  leadersErrMess ={this.props.leaders.errMess}
			  leadersLoading={this.props.leaders.isLoading}
			 
          />
      );
    }

	const DishDetails = ({match}) => {
		
		return(
			<Dish
				isLoading={this.props.dishes.isLoading}
				dishesErrMess ={this.props.dishes.errMess}
				selectedDish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
				postComment={this.props.postComment}
			/> 
		);
	}
	
	const AboutUs = () => {
		
		return(
			<About leaders={this.props.leaders.leaders} />
		)
	}
		
	return (
		  	<div>
				<Header  
					login={this.props.login}
					user={this.props.user}
					logout={this.props.logout}
					register={this.props.register}
				/>
				<Switch>
					<Route path="/home" component={HomePage}/>
					<Route exact path="/aboutus" component={AboutUs} />
					<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
					<Route path="/menu/:dishId" component={DishDetails} />
					<Route exact path="/contactus" component={Contact} />
					<Route exact path="/login" component={() =><Login logout={this.props.logout} user={this.props.user} />} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
          	</div>
	   );
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
