import React from 'react'
import { Card, Icon, Image, Header } from 'semantic-ui-react'

const TeamCard = ({team}) => (
  <React.Fragment>
    <br/>
  <Card>
    <Image src={team.image} wrapped ui={false} />
    <Card.Content>
    <Header as='h5'>{team.name}</Header>
      <Card.Meta>
        <span className='date'>{team.county}</span>
      </Card.Meta>
    </Card.Content>
  </Card>
  </React.Fragment>
)

export default TeamCard