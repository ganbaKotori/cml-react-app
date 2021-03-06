import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase"

class Channels extends React.Component {
    state = {
        channels: [],
        channelName: '',
        channelDetails: '',
        channelRef: firebase.database().ref("channels"),
        modal: false,
        user : this.props.currentUser
    }

    componentDidMount() {
        this.addListeners();
    }

    addListeners = () => {
        let loadedChannels = [];
        this.state.channelRef.on('child_added', snap=>{
            loadedChannels.push(snap.val())
            console.log(loadedChannels);
            this.setState({channels: loadedChannels})
        })
    }

    addChannel = () => {
        const {channelRef, channelName, channelDetails, user} = this.state;

        const key = channelRef.push().key;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }

        }

        channelRef.child(key).update(newChannel)
        .then(()=>{
            this.setState({channelName: '', channelDetails: ''});
            this.closeModal();
            console.log("channel added")
        }).catch(err => {
            console.log(err)
        })
    }

    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }

    displayChannels = channels => 
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => console.log(channel)}
                name={channel.name}
                style={{opacity: 0.7}}
                >
                # {channel.name}
            </Menu.Item>
        ))
    

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid(this.state)) {
            this.addChannel()
        }
    }

    isFormValid = ({channelName, channelDetails}) => channelName && channelDetails;

    closeModal = () => this.setState({modal: false});

    openModal = () => this.setState({modal : true});

    render(){
        const { channels, modal }  = this.state;
        return (
            <React.Fragment>
            <Menu.Menu style={{paddingBottom: "2em"}}>
                <Menu.Item>
                    <span>
                        <Icon name="exchange" /> CHANNELS
                    </span>
                ({channels.length}) <Icon name="add" onClick={this.openModal} />
                </Menu.Item>
            {this.displayChannels(channels)}
            </Menu.Menu>

            <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header>Add a Channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Input 
                                fluid
                                label="Name of Channel"
                                name="channelName"
                                onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <Input 
                                fluid
                                label="About the Channel"
                                name="channelDetails"
                                onChange={this.handleChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSubmit}>
                        <Icon name="checkmark" />Add
                    </Button>
                    <Button color="red" onClick={this.closeModal} inverted>
                        <Icon name="remove" />Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
            </React.Fragment>

        )
    }
}

export default Channels;
