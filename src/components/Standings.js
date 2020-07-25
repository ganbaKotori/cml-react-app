import React from 'react';

import {Grid} from "semantic-ui-react"

import './App.css';


import SidePanel from "./SidePanel/SidePanel"
import StandingsPanel from "./Standings/StandingsPanel"

const Standings = () => (
  <Grid columns="equal" className="app" style={{background : '#eee'}}>
    <SidePanel />


    <Grid.Column style={{marginLeft: 300}}>
    <StandingsPanel/>
    </Grid.Column>
    
    
  </Grid>
)


export default Standings;