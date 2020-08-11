import React, {Component} from 'react';
import {Navbar,NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, 
	Jumbotron,Modal, ModalHeader, ModalBody, Button,
	Form, FormGroup, Label, Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { Col, Row} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Header extends Component{
	
	constructor(props){
		
		super(props);
		this.state = {
			isNavOpen : false,
			isLoginFormOpen:false,
			isSignupFormOpen:false,
			user:props.user
		};
		this.toggleNav = this.toggleNav.bind(this);
		this.toggleLoginForm = this.toggleLoginForm.bind(this);
		this.toggleSignupForm = this.toggleSignupForm.bind(this);
		this.handleLoginValues = this.handleLoginValues.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.logout = this.logout.bind(this);
		
	}
	
	toggleNav(){
		this.setState({isNavOpen:!this.state.isNavOpen});
	}

	toggleLoginForm(){
		this.setState({isLoginFormOpen:!this.state.isLoginFormOpen});
	}

	toggleSignupForm(){
		this.setState({isSignupFormOpen:!this.state.isSignupFormOpen})
	}

	handleSignUp(values){
		this.toggleSignupForm();
		alert("asdf"+values.username+values.password+values.firstname+values.lastname+values.email)
		this.props.register(values.username, values.password, values.firstname, values.lastname, values.email)
	}

	handleLoginValues(values){

		this.toggleLoginForm();
		this.props.login(values.username, values.password)
	}

	logout(){
		this.props.logout();
	}

	handleLoginNotWorking(event){

		this.toggleLoginForm();
		this.props.login(this.username.value, this.password.value)
	}

	redirect = redirectUrl => {
		console.log('path--'+window.location.pathname)
		window.location = redirectUrl;
	};

	render(){

		if (this.props.user.redirectTo) {
			return this.redirect(this.props.user.redirectTo);
		}

		return (
			<>
				<HeaderNavbar 
					isNavOpen={this.state.isNavOpen}
					toggleNav={this.toggleNav}
					toggleLoginForm={this.toggleLoginForm}
					toggleSignupForm={this.toggleSignupForm}
					user={this.props.user}
					logout={this.logout}
					path={window.location.pathname}
				/>
				<HeaderJumbotron />
				<LoginForm
					isLoginFormOpen={this.state.isLoginFormOpen}
					toggleLoginForm={this.toggleLoginForm}
					handleLoginValues={this.handleLoginValues}
				/>
				<SignUpForm
					isSignupFormOpen={this.state.isSignupFormOpen}
					toggleSignupForm={this.toggleSignupForm}
					handleSignUp={this.handleSignUp}
				/>
			</>
		);
	}
}

const HeaderNavbar = (props) => {

	if(props.user && props.user.loggedIn)
	return(
		<Navbar dark color="primary" expand="md" className="fixed-top">
			<div className="container">
				<NavbarToggler onClick={props.toggleNav} />
				<NavbarBrand className="mr-auto" href="/">
					<img alt="" src="assets/images/logo.png" height="30" width="41" />
				</NavbarBrand>
				<Collapse isOpen={props.isNavOpen} navbar>
				<Nav navbar>
					<NavItem>
						<NavLink className="nav-link" to="/home">
							<span className="fa fa-home fa-lg" /> Home
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="nav-link" to="/aboutus">
							<span className="fa fa-info fa-lg" /> About Us
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="nav-link" to="/menu">
							<span className="fa fa-list fa-lg" /> Menu
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="nav-link" to="/contactus">
							<span className="fa fa-address-card fa-lg" /> Contact Us 
						</NavLink>
					</NavItem>
				</Nav>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink className="nav-link" onClick={props.logout} to={props.path}>
							<span className="fa fa-sign-out fa-lg" /> Logout
						</NavLink>
					</NavItem>
				</Nav>
				</Collapse>
			</div>
		</Navbar>
	);
	else
	return(
		<Navbar dark color="primary" expand="md" className="fixed-top">
			<div className="container">
				<NavbarToggler onClick={props.toggleNav} />
				<NavbarBrand className="mr-auto" href="/">
				<img alt="" src="../assets/images/logo.png" height="30" width="41" />
				</NavbarBrand>
				<Collapse isOpen={props.isNavOpen} navbar>
				<Nav navbar>
					<NavItem>
						<NavLink className="nav-link" to="/home">
							<span className="fa fa-home fa-lg" /> Home
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="nav-link" to="/aboutus">
							<span className="fa fa-info fa-lg" /> About Us
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="nav-link" to="/menu">
							<span className="fa fa-list fa-lg" /> Menu
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="nav-link" to="/contactus">
							<span className="fa fa-address-card fa-lg" /> Contact Us 
						</NavLink>
					</NavItem>
				</Nav>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink className="nav-link" onClick={props.toggleLoginForm} to={props.path}>
							<span className="fa fa-sign-in fa-lg" /> Login
						</NavLink>
						{/* <Button outline onClick={props.toggleLoginForm}>
							<span className="fa fa-sign-in"/> Login 
						</Button> */}
					</NavItem>
					<NavItem>
						<NavLink className="nav-link" onClick={props.toggleSignupForm} to={props.path}>
							<span className="fa fa-user-plus fa-lg" /> Sign-up
						</NavLink>
					</NavItem>
				</Nav>
				</Collapse>
			</div>
		</Navbar>
	);
}

const HeaderJumbotron = (props) => {

	return(
		<Jumbotron>
			<div className="container">
				<div className="row row-header">
					<div className="col-12 col-sm-6">
						<h1>Ristorante Con Fusion</h1>
						<p>We take inspiration from the World's best cuisines, andcreate a unique fusion experience. Our lipsmacking creations willtickle your culinary senses!</p>
					</div>
				</div>
			</div>
		</Jumbotron>
	);
}

const  LoginForm = (props) => {

	return(
		<Modal isOpen={props.isLoginFormOpen} toggle={props.toggleLoginForm}>
			<ModalHeader toggle={props.toggleLoginForm}>
				Login
			</ModalHeader>
			<ModalBody>
				<LocalForm onSubmit={values => props.handleLoginValues(values)}>
					<Row className="form-group">
						<Label htmlFor="username" md={3}>Username</Label>
						<Col md={7}>
							<Control.text model=".username" id="username" name="username"
							placeholder="Enter your username"
							className ="form-control"
							validators={{
								required, minLength: minLength(1), maxLength: maxLength(15)
							}}
							/>
							<Errors
								className="text-danger"
								model=".username"
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
						<Label htmlFor="password" md={3}>Password</Label>
						<Col md={7}>
							<Control.password model=".password" id="password" name="passwordusername"
							placeholder="Enter your password"
							className ="form-control"
							validators={{
								required, minLength: minLength(1), maxLength: maxLength(15)
							}}
							/>
							<Errors
								className="text-danger"
								model=".password"
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
						<Col md={{size: 10, offset: 3}}>
							<Button type="submit" color="primary">
								Login
							</Button>
						</Col>
					</Row>
				</LocalForm>
			</ModalBody>
		</Modal>
	);
}

const  SignUpForm = (props) => {

	return(
		<Modal isOpen={props.isSignupFormOpen} toggle={props.toggleSignupForm}>
			<ModalHeader toggle={props.toggleSignupForm}>
				Sign-up
			</ModalHeader>
			<ModalBody>
				<LocalForm onSubmit={values => props.handleSignUp(values)}>
					<Row className="form-group">
						<Label htmlFor="username" md={3}>Username</Label>
						<Col md={7}>
							<Control.text model=".username" id="username" name="username"
							placeholder="Enter your username"
							className ="form-control"
							validators={{
								required, minLength: minLength(3), maxLength: maxLength(15)
							}}
							/>
							<Errors
								className="text-danger"
								model=".username"
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
						<Label htmlFor="password" md={3}>Password</Label>
						<Col md={7}>
							<Control.text model=".password" id="password" name="password"
							placeholder="Enter your password"
							className ="form-control"
							validators={{
								required, minLength: minLength(5), maxLength: maxLength(15)
							}}
							/>
							<Errors
								className="text-danger"
								model=".password"
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
						<Label htmlFor="firstname" md={3}>First Name</Label>
						<Col md={7}>
							<Control.text model=".firstname" id="firstname" name="firstname"
							placeholder="Enter your first name"
							className ="form-control"
							validators={{
								required, minLength: minLength(3), maxLength: maxLength(15)
							}}
							/>
							<Errors
								className="text-danger"
								model=".firstname"
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
						<Label htmlFor="lastname" md={3}>Last Name</Label>
						<Col md={7}>
							<Control.text model=".lastname" id="lastname" name="lastname"
							placeholder="Enter your last name"
							className ="form-control"
							validators={{
								required, minLength: minLength(3), maxLength: maxLength(15)
							}}
							/>
							<Errors
								className="text-danger"
								model=".lastname"
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
						<Label htmlFor="email" md={3}>E-mail</Label>
						<Col md={7}>
							<Control.text model=".email" id="email" name="email"
							placeholder="Enter your email address"
							className ="form-control"
							validators={{
								required, validEmail
							}}
							/>
							<Errors
								className="text-danger"
								model=".email"
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
						<Col md={{size: 10, offset: 3}}>
							<Button type="submit" color="primary">
								Login
							</Button>
						</Col>
					</Row>
				</LocalForm>
			</ModalBody>
		</Modal>
	);
}

const NotWorkingLoginForm = (props) => {

	return(
		<Modal isOpen={props.isLoginFormOpen}>
			<ModalHeader >
				Login
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={props.handleLogin}>
					<FormGroup>
						<Label htmlfor="username">Username</Label>
						<Input type="text" name="username" id="username"
							innerRef={(input) => props.setUsername(input)}/>
					</FormGroup>
					<FormGroup>
						<Label htmlfor="password">Password</Label>
						<Input type="password" name="password" id="password"
						innerRef={(input) => props.setPassword(input)}/>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="checkbox" name="remember" id="remember"
							innerRef={(input) => props.setRemember(input)}/>
							Remember me
						</Label>
					</FormGroup>
					<Button type="submit"  value="submit" className="bg-primary">Login</Button>
				</Form>
			</ModalBody>
		</Modal>
	);
}

export default Header;