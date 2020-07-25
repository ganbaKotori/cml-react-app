import React from 'react';

import {Grid, Image} from "semantic-ui-react"
import { connect } from "react-redux"
import './App.css';

import SidePanel from "./SidePanel/SidePanel"
import TeamsPanel from "./TeamsPanel/TeamsPanel"
import Quiz from "./Quiz"
import Background from "./about-administration.jpg"
import Standings from "./Standings/StandingsPanel"

import logo from "./cml-logo.png";
import { withRouter } from 'react-router-dom';

const App = ({currentUser}) => (
  <Grid columns="equal" className="app" style={{background : '#eee'}}>
    
    
    <SidePanel currentUser={currentUser} />


    <Grid.Column style={{marginLeft: 252}}>
      <Grid.Row style={{
        backgroundImage: `url(${Background})`,
        height: "120px"
      }}>
        <table>
          <tr>
            <td>
            <Image src={logo} size='small' />
            </td>
            <td>
              <h2 style={{color: "#fff"}}>
                Collegiate Math League
              </h2>
              <p style={{color: "#fff"}}>
                CSULB
              </p>
            </td>
          </tr>
        </table>
      
      </Grid.Row>
    


    <Grid.Column width={4}>
    {currentUser.second.university}
    <Quiz/>
    <Standings/>
    </Grid.Column>
    </Grid.Column>
    
  </Grid>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentUserStats: state.userStats.currentUserStats
})

export default connect(mapStateToProps)(App);
