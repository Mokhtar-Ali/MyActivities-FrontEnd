import React from 'react'
import { connect } from 'react-redux'
import { fetchDeleteActivityCreator } from '../actionCreators/actionCreater'
import EditActivity from '../forms/editActivity'
import { Link } from 'react-router-dom'
import Chatroom from './chatroom'
import Map from './map'


class ActivityPage extends React.Component {

    state = {
        activity: null,
        host: null,
        participants: [], // represnts the user from user_id of that join
        editActivityState: false,
    }
    componentDidMount() {
        fetch(`http://localhost:3000/activities/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(data => this.setState({ activity: data, host: data.user, participants: data.participants}))
    }

    switchEditActivityState = () => {
        this.setState({
            editActivityState: !this.state.editActivityState
        })
    }

    joinActivity = () => {
        let data = { user_id: this.props.currentUser, activity_id: this.props.activity.id }
        fetch('http://localhost:3000/participants', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(response => { if (response.errors) { alert(response.errors) }else {
                this.setState({participants: [...this.state.participants, this.props.currentUser]})   
            } })
    }

    deleteActivity = () => {
        let id = this.state.activity.id
        this.props.fetchDeleteActivityCreator(id)
        this.props.history.push('/home')
    }

    renderParticipants = () => {
        return this.state.participants.map(p => <Link><image src={p.image} height='100px' alt=''/></Link>)
    }

    render() {
        console.log('participants', this.state.participants);
        return (
            <div>
                {this.state.activity && this.state.host ?
                    <div>
                        <h3>{this.state.activity.name}</h3>
                        <h5>Happening on:{this.state.activity.date}</h5>
                        <h4>Created By: {this.state.host.name}</h4>
                        {/* <img src={this.state.host.image} alt='image'></img> */}

                        <img src={this.state.activity.image} height='400px'></img>
                        <h6>Address:{this.state.activity.address}</h6>
                        <p><strong>About: </strong><br />{this.state.activity.about}</p>
                        {this.props.currentUser.id === this.state.host.id ? <div><button onClick={this.switchEditActivityState}>Edit Activity</button> <button onClick={this.deleteActivity}>Delete Activity</button></div> : null}
                        {this.state.editActivityState ? <div><EditActivity activity={this.state.activity} /> <button onClick={this.switchEditActivityState}>Close Form</button> </div> : null}
                        <br />
                        <Chatroom currentUser={this.props.currentUser}/>

                        <h4>Map:</h4>
                        <div height='400' width='400'>
                            <Map />
                        </div>
                    </div>
                    : <h2>'Loading!!!'</h2>
                }
            </div>
        )
    }
}
const msp = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(msp, { fetchDeleteActivityCreator })(ActivityPage)


