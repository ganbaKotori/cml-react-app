import React from "react";
import {Menu, Icon} from "semantic-ui-react"
import UserPanel from "./UserPanel"
import Channels from "./Channels";

class SidePanel extends React.Component {
    render() {
        const { currentUser } = this.props;

        let primaryColor = "";
        let secondaryColor = "";

        console.log(currentUser.second.university)

        switch (currentUser.second.university){
            case "UCI" : 
            secondaryColor = "# FFD200"
            primaryColor = "#0064A4";
            break;
            case "CSUF" : 
            primaryColor = "#00274C";
            secondaryColor = "#FF7900";
            break;
        }
        console.log(primaryColor)
        return (
            <Menu
                size="large"
                inverted
                fixed="left"
                vertical
                style={{backgroundColor: primaryColor, fontSize: '1.2rem'}}
            >
            <UserPanel currentUser={currentUser}/>
            <br/>
            <br/>
            <Menu.Item as='a'>
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='university' />
        Universities
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
            <Channels currentUser={currentUser}/>
            </Menu>
        )
    }
}

export default SidePanel;