import React from "react";
import firebase from "../../firebase";
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
class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users'),
    university: ""
  };

  isFormValid = () => {

    let errors = [];
    let error;
      if(this.isFormEmpty(this.state)){
        error = { message: "Fill in all fields"};
        console.log(error)
        this.setState({errors:errors.concat(error) });
        return false;
      } else if (!this.isPasswordValid(this.state)){
        error = { message: "Password is invalid"};
        console.log(error)
        this.setState({errors: errors.concat(error)});
      } else {
          return true;
      }
  }

  isFormEmpty = ({username, email, password, passwordConfirmation}) => {
      return !username.length || !email.length || !password.length || !passwordConfirmation.length;
  }

  isPasswordValid = ({password,passwordConfirmation}) => {
    if(password.length < 6 || passwordConfirmation.length < 6){
        return false;
    } else if (password !== passwordConfirmation){
        return false;
    } else {
        return true;
    }
  }

displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>);

  validEmailDomains = ["student.csulb.edu", "fullerton.edu" , "uci.edu","ucla.edu"," berkeley.edu","cpp.edu", "csueastbay.edu"]

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
      if(this.isFormValid()){
        this.setState({
            errors: [],
            loading: true
        })
        console.log(this.state.errors)

      const domain = this.state.email.split('@')[1];

      alert(domain);
      if(!this.validEmailDomains.includes(domain)){
        alert("Email is not a valid school email")
      } else {
        switch(this.state.email.split('@')[1]){
          case "student.csulb.edu" : {
            this.setState({ university: "CSULB" });
          }
          break;
          case "fullerton.edu" : {
            this.setState({ university: "CSUF" });
          }
          break;
          case "uci.edu" : {
            this.setState({ university: "UCI" });
          }
          break;
          case "ucla.edu" : {
            this.setState({ university: "UCLA" });
          }
          break;
          case "berkeley.edu" : {
            this.setState({ university: "UCB" });
          }
          break;
          case "cpp.edu" : {
            this.setState({ university: "CPP" });
          }
          break;
          case "csueastbay.edu" : {
            this.setState({ university: "CSUEB" });
          }
          break;
        }
        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(createdUser => {
            console.log(createdUser);
            this.setState({ loading: false})
            createdUser.user.updateProfile({
                //displayName: this.state.username,
                photoURL: 'https://pbs.twimg.com/profile_images/983788433150689280/Jbs_Ln7P_400x400.jpg'
            })
            .then(() => {
                this.saveUser(createdUser).then(()=>{
                    console.log("User Saved!");
                });
                
            })
            .catch(err => {
                console.log(err)
                this.setState({ errors: this.state.errors.concat(err), loading: false})
            })
            
        })
        .catch(err => {
            console.error(err);
            this.setState({ errors: this.state.errors.concat(err), loading: false})
        })
      }
      } 
      console.log(this.state)

  }


  saveUser = createdUser => {
      return this.state.usersRef.child(createdUser.user.uid).set({
          name: this.state.username,
          avatar: createdUser.user.photoURL,
          university: this.state.university
      });
  }

  handleInputError = (errors, inputName) => {
    return errors.some(error => 
        error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }


  render() {
    const { username, email, password, passwordConfirmation, errors, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for Collegiate Math League
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                value={username}
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email11 Address"
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
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
                className={this.handleInputError(errors, 'password')}
              />
              <Button disabled={loading} className={loading ? 'loading': ''}color="orange" fluid size="large">
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
            Already a User? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
