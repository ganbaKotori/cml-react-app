import React from "react";
import TeamCard from "./TeamCard"
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";

class TeamsPanel extends React.Component {
    render() {
        const csulb = {
            name: 'California State University, Long Beach',
            image: 'https://firebasestorage.googleapis.com/v0/b/fog-math.appspot.com/o/csulb.png?alt=media&token=cdffaaab-8ada-4c3e-acdb-1223fcd0b35c',
            county: "Los Angeles"
          };
        const ucla = {
            name: 'University of California, Los Angeles',
            image: 'https://firebasestorage.googleapis.com/v0/b/fog-math.appspot.com/o/ucla.png?alt=media&token=dc95ffe3-c3df-4dad-a6fd-8c76845f9a8f',
            county: "Los Angeles"
          };

        const csuf = {
            name: 'California State University, Fullerton',
            image: 'https://firebasestorage.googleapis.com/v0/b/fog-math.appspot.com/o/csuf.png?alt=media&token=8264fbdd-16dd-4166-b265-f17c3b12c426',
            county: "Orange"
          };

        const uci = {
            name: 'University of California, Irvine',
            image: 'https://firebasestorage.googleapis.com/v0/b/fog-math.appspot.com/o/uci.png?alt=media&token=a535eea2-bfcd-4507-a9a5-e4ec628a41ce',
            county: "Orange"
          };
        
          const csueb = {
            name: 'California State University, East Bay',
            image: 'https://firebasestorage.googleapis.com/v0/b/fog-math.appspot.com/o/csueb.png?alt=media&token=de141a42-74cd-4f48-9e0f-e5b1d42592b9',
            county: "Alameda"
          };
        return (
            <Grid columns={4}>
<Grid.Row>
<Header floated="left" as="h2">
                <Header.Content>Universities</Header.Content>
                </Header>
    </Grid.Row>
<Grid.Row>
      <Grid.Column>
      <TeamCard team={csulb}/>
      </Grid.Column>
      <Grid.Column>
      <TeamCard team={ucla}/>
      </Grid.Column>
      <Grid.Column>
      <TeamCard team={csuf}/>
      </Grid.Column>
      <Grid.Column>
      <TeamCard team={uci}/>
      </Grid.Column>
      <Grid.Column>
      <TeamCard team={csueb}/>
      </Grid.Column>
    </Grid.Row>
                
                

                
                
          </Grid>
        )
    }
}

export default TeamsPanel;