import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { fetchPostActivityCreator } from '../actionCreators/actionCreater'
import { connect } from 'react-redux'
import '../stylesheets/mainPage.css'
import DatePicker from "react-datepicker";





const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function AddActivityT(props) {
    let history = useHistory();
    const classes = useStyles();
    const [name, setname] = React.useState('');
    const [activityType, setactivityType] = React.useState('');
    const [image, setimage] = React.useState('');
    const [about, setabout] = React.useState('');
    // const [date, setdate] = React.useState(new Date());
    const [address, setaddress] = React.useState('');
    const [category_id, setcategory_id] = React.useState(1);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const handleChange1 = (event) => {
        setname(event.target.value);
    };
    const handleChange2 = (event) => {
        setactivityType(event.target.value);
    };
    const handleChange3 = (event) => {
        setimage(event.target.value);
    };
    const handleChange4 = (event) => {
        setabout(event.target.value);
    };

    const handleChange6 = (event) => {
        setaddress(event.target.value);
    };
    const handleChange7 = (event) => {
        setcategory_id(event.target.value);
    };


    function handleSubmit(event) {
        event.preventDefault()
        let data = { name: name, image: image, date: selectedDate, address: address, about: about, category_id: parseInt(category_id), user_id: props.currentUser.id }
        props.fetchPostActivityCreator(data)
        history.push(`/activities`)
    }

    
    return (
        <div>
            <Alert severity="warning" style={{ textAlign: 'center' }}>Due to Covid-19, Add an activity on your own risk!</Alert>
            <video id='video1' autoPlay muted loop >
                <source src='https://vod-progressive.akamaized.net/exp=1586929622~acl=%2A%2F1698360923.mp4%2A~hmac=2af0e496ee71df1e87710ab0b03e785c9df54655c43dc654abf2159d71998c66/vimeo-prod-skyfire-std-us/01/4710/15/398551000/1698360923.mp4' type='video/mp4' />
            </video>
            
            <FormControl className={classes.margin}>
                <Button onClick={() => history.push('/activities')}>Back</Button>
                <TextField
                    required
                    id="standard-required"
                    label="name"
                    placeholder='name'
                    value={name}
                    onChange={handleChange1}
                />
                <TextField
                    required
                    id="standard-required"
                    label="activity type"
                    type="activity type"
                    value={activityType}
                    onChange={handleChange2}
                />
                <TextField
                    required
                    id="standard-required"
                    label="image"
                    placeholder='image'
                    value={image}
                    onChange={handleChange3}
                />
                <TextField
                    required
                    id="standard"
                    label="About"
                    placeholder='About'
                    value={about}
                    onChange={handleChange4}
                />
                <NativeSelect
                    id="demo-customized-select-native"
                    placeholder='Select Category'
                    value={category_id}
                    onChange={handleChange7}
                >
                    <option aria-label="None" value="" />
                    <option value={1}>Theaters</option>
                    <option value={2}>Sports</option>
                    <option value={3}>Nature</option>
                    <option value={4}>Arts And Museumes</option>
                </NativeSelect>
                <TextField
                    required
                    id="standard"
                    label="address"
                    placeholder='address'
                    value={address}
                    onChange={handleChange6}
                />
                <DatePicker selected={selectedDate} value={selectedDate} onChange={handleDateChange} />
            <Button onClick={handleSubmit}>Add Activity</Button>
            </FormControl>

        </div>
    );
}

export default connect(null, { fetchPostActivityCreator })(AddActivityT)