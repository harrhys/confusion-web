import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Button,	Form, FormGroup, Label, Input} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';

class Login extends React.Component{

    setUsername(formusername){
		this.username=formusername
	}
	setPassword(formpassword){
		this.password=formpassword
	}
	setRemember(formremember){
		this.remember=formremember
	}

    render(){

        return(
            <div className="container">
            <div className="row">
                <LoginBreadCrumb />
            </div>
            <div className="row">
                <LoginForm
					handleLogin={this.handleLogin}
					setUsername={(username)=>this.setUsername(username)}
					setPassword={(password)=>this.setPassword(password)}
					setRemember={(remember)=>this.setRemember(remember)}
				/>
            </div>
            </div>
        );

    }
}

const LoginBreadCrumb = () => {

	return(
		<div>
			<Breadcrumb>
				<BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
				<BreadcrumbItem active>Login</BreadcrumbItem>
			</Breadcrumb>
			<div className="col-12">
				<h3>Login</h3>
				<hr />
			</div>   
		</div>
	);
}

const LoginForm = (props) => {

	return(
		
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
			
	);
}

export default Login;