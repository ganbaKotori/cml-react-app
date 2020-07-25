import React from 'react';

import {Grid} from "semantic-ui-react"

import './App.css';


import SidePanel from "./SidePanel/SidePanel"
import TeamsPanel from "./TeamsPanel/TeamsPanel"

const Teams = () => (
  <Grid columns="equal" className="app" style={{background : '#eee'}}>
    <SidePanel />


    <Grid.Column style={{marginLeft: 300}}>
    </Grid.Column>
    
    
  </Grid>
)


export default Teams;