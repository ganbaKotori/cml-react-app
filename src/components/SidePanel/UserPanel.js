import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux"
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";


class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser
  }


  dropdownOptions = () => [
    {
      key: "signout",
      text: <span onClick={this.handleSignOut}>Sign Out</span>
    }
  ];

  handleSignOut = () => {
    firebase
        .auth()
        .signOut()
        .then(()=> console.log("signed out!"))
  }

  render() {
    let primaryColor;
    let secondaryColor;
    let inverted = false;
    switch (this.state.user.second.university){
      case "UCI" : 
      primaryColor = "#0064A4";
      secondaryColor = "#FFD200";
      
      break;
      case "CSUF" : 
    primaryColor = "#00274C";
    secondaryColor = "#FF7900";
    break;
  }

    console.log(this.props.currentUser)
    return (
      <Grid style={{ background: secondaryColor }}>
        <Grid.Column>
        
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            
            
          </Grid.Row>

          {/* User Dropdown  */}
          <Header style={{ padding: "0.25em" }} as="h4" >
            <Dropdown
              trigger={<span>
                <Image src={this.state.user.photoURL} spaced="right" avatar/>
                {this.state.user.second.username}</span>}
              options={this.dropdownOptions()}
            />
          </Header>
          <Header as="h4">
            
              <Header.Content ><h2>Career Profile</h2></Header.Content>
            </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state =>({
    currentUser: state.user.currentUser
})


export default connect(mapStateToProps)(UserPanel);