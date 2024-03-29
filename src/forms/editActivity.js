import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchPatchActivityCreator } from '../actionCreators/actionCreater'  
import { connect } from 'react-redux'

class EditActivity extends React.Component {


    state = {
        name: this.props.activity.name,
        activityType: this.props.activity.activityType,
        image: this.props.activity.image,
        about: this.props.activity.about,
        date: new Date(),
        category_id: this.props.activity.category_id,
        address: this.props.activity.address
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDateChange = selectedDate => {
        this.setState({
            date: selectedDate
        });
    };

    handleSubmit = event => {
        event.preventDefault()
        let data = { ...this.state, category_id: parseInt(this.state.category_id) }
        let id = this.props.activity.id
        this.props.fetchPatchActivityCreator(id, data) 
    }


    render() {
        console.log(this.state);
        return (

            <div>
                <form onSubmit={this.handleSubmit}>
                    <label >Name:</label>
                    <input onChange={this.handleChange} type="text" name="name" value={this.state.name}></input>
                    <label >ActivityType:</label>
                    <input onChange={this.handleChange} type="text" name="activityType" value={this.state.activityType}></input>
                    <label >Address:</label>
                    <input onChange={this.handleChange} type="text" name="address" value={this.state.address}></input>
                    <label >Image:</label>
                    <input onChange={this.handleChange} type="text" name="image" value={this.state.image}></input>
                    <label >Info:</label>
                    <input onChange={this.handleChange} type="text" name="about" value={this.state.about}></input>
                    <label >Choose a Category:</label>
                    <select name="category_id" value={this.state.value} onChange={this.handleChange}>
                        <option value="1">Theaters</option>
                        <option value="2">Sports</option>
                        <option value="3">Nature</option>
                        <option value="4">Art galleries and Museums</option>
                    </select>
                    <label >Date:</label>
                    <DatePicker selected={this.state.date} value={this.state.date} onChange={this.handleDateChange} />
                    {/* showTimeSelect dateFormat="Pp" */}
                    {/* <button onClick=Edit Activity</button> */}
                </form>
            </div>
        )
    }
}

export default connect(null, { fetchPatchActivityCreator })(EditActivity)


