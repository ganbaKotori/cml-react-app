import React from "react";
import firebase from "../../firebase";
import campusVideo from "./campusSeq_2.webm"
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };



displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);

  validEmailDomains = ["student.csulb.edu", "csu.fullerton.edu" , "uci.edu","ucla.edu"]

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
      if(this.isFormValid(this.state)){
        this.setState({ errors: [], loading: false})
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                    loading: false
                })
            })
      } 
  }

  isFormValid = ({email,password}) =>  email && password;


  handleInputError = (errors, inputName) => {
    return errors.some(error => 
        error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }


  render() {
    const { email, password,  errors, loading } = this.state;
    return (
      <div style={{backgroundColor: "#000000"}}>
      <div style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          opacity: "100%",
          backgroundColor:"#000"
          
        }}>
        
        <video autoPlay loop muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          opacity: "60%",
          color:"#000"
          
        }}
        >
          <source src={campusVideo} type="video/mp4"/>

        </video>

        </div>
      
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to Collegiate Math League
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>


              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
                value={email}
                className={this.handleInputError(errors, 'email')}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
                className={this.handleInputError(errors, 'password')}
              />
              <Button disabled={loading} className={loading ? 'loading': ''}color="violet" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
              <Message error>
                  <h3>Error</h3>
                  {this.displayErrors(errors)}
              </Message>
          )}
          <Message>
            Not a Member? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default Login;
