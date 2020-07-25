import React from 'react';

import {Grid} from "semantic-ui-react"
import { Table, Label } from 'semantic-ui-react'

import '../App.css';

const StandingsPanel = () => (
    <Table stackable>
    <Table.Header >
      <Table.Row>
        <Table.HeaderCell>RANK</Table.HeaderCell>
        <Table.HeaderCell width={10}>UNIVERSITY</Table.HeaderCell>
        <Table.HeaderCell>COUNTY</Table.HeaderCell>
        <Table.HeaderCell>SCORE</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'>STUDENTS</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>University of California, Los Angeles</Table.Cell>
        <Table.Cell>Los Angeles</Table.Cell>
        <Table.Cell>+4503</Table.Cell>
        <Table.Cell textAlign='right'>563</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>University of California, Irvine</Table.Cell>
        <Table.Cell>Orange</Table.Cell>
        <Table.Cell>+3209</Table.Cell>
        <Table.Cell textAlign='right'>845</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>3</Table.Cell>
        <Table.Cell>California State University, Long Beach</Table.Cell>
        <Table.Cell>Los Angeles</Table.Cell>
        <Table.Cell>+2321</Table.Cell>
        <Table.Cell textAlign='right'>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>4</Table.Cell>
        <Table.Cell>California State University, Fullerton</Table.Cell>
        <Table.Cell>Orange</Table.Cell>
        <Table.Cell>+2124</Table.Cell>
        <Table.Cell textAlign='right'>None</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)


export default StandingsPanel;