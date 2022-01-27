import React, {Component, useState} from "react";
import Header from "./Header";
import './AddSubscriber.css';
import {Link, useNavigate } from 'react-router-dom';
import {ValidatorForm} from 'react-material-ui-form-validator';
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";

export default function AddSubscriber({addSubscriberHandler}){

    const [addSubscriberForm, setAddSubscriberForm] = useState({
        id: 0,
        name: '',
        phone: ''
    });

    const{name, phone} = addSubscriberForm;
    const navigate = useNavigate();

    function inputChangedHandler(e) {
        const state = addSubscriberForm;
        state[e.target.name] = e.target.value;
        setAddSubscriberForm({...state});
    }
    
    //function onFormSubmitted(e) {
    const onFormSubmitted = (e) => {
        e.preventDefault();
        addSubscriberHandler(addSubscriberForm);
        setAddSubscriberForm({id: 0, name: '', phone: ''});
        navigate('/');
    }

    return(
        <div>
            <Header heading="Add Subscriber"/>
            <div className="component-body-container">
                <Link to="/">
                    <button className="custom-btn back-btn">Back</button>
                </Link>
                <ValidatorForm className="subscriber-form" onSubmit={onFormSubmitted}>
                    <TextValidator
                        fullWidth 
                        id="name"
                        label="Name"
                        type="text"
                        name="name"
                        onChange={inputChangedHandler}
                        value ={name}
                        validators = {['required']}
                        errorMessages = {['Name is required!']}
                        variant="standard"
                    />
                    <br/><br/>
                    <TextValidator
                        fullWidth
                        id="phone"
                        label="Phone"
                        type="text"
                        name="phone"
                        onChange={inputChangedHandler}
                        value ={phone}
                        validators = {['required']}
                        errorMessages = {['Phone Number is required!']}
                        variant="standard"
                    />
                    <br/>
                    {/* <label htmlFor="name" className="label-control">Name : </label><br/>
                    <input id="name" type="text" className="input-control" name="name" onChange={inputChangedHandler}/><br/>
                    <label htmlFor="phone" className="label-control">Phone : </label><br/>
                    <input id="phone" type="text" className="input-control" name="phone" onChange={inputChangedHandler}/> */}
                    <div className="subscriber-info-container">
                        <span className="subscriber-to-add-heading">Subscriber to be added : </span><br/>
                        <span className="subscriber-info">Name : {name}</span><br/>
                        <span className="subscriber-info">Phone : {phone}</span>
                    </div>
                    <button type="submit" className="custom-btn add-btn custom-add-btn">Add</button>
                </ValidatorForm>
            </div>
        </div>
    )
}

// class AddSubscriber extends Component{

//     constructor(){
//         super();
//         this.state = {
//             id: 0,
//             name: '',
//             phone: ''
//         }
//     }

//     inputChangedHandler = (e) => {
//         const state = this.state;
//         state[e.target.name] = e.target.value;
//         this.setState(state);
//     }

//     onFormSubmitted = (e) => {
//         e.preventDefault();
//         this.props.addSubscriberHandler(this.state);
//         this.setState({id: 0, name: '', phone: ''});
//         this.props.history.push('/');
//     }

//     render(){
//         const {name, phone} = this.state;
//         return(
//             <div>
//                 <Header heading="Add Subscriber"/>
//                 <div className="component-body-container">
//                     <Link to="/">
//                         <button className="custom-btn back-btn">Back</button>
//                     </Link>
                    // <form className="subscriber-form" onSubmit={this.onFormSubmitted.bind(this)}>
                    //     <label htmlFor="name" className="label-control">Name : </label><br/>
                    //     <input id="name" type="text" className="input-control" name="name" onChange={this.inputChangedHandler}/><br/>
                    //     <label htmlFor="phone" className="label-control">Phone : </label><br/>
                    //     <input id="phone" type="text" className="input-control" name="phone" onChange={this.inputChangedHandler}/>
                    //     <div className="subscriber-info-container">
                    //         <span className="subscriber-to-add-heading">Subscriber to be added : </span><br/>
                    //         <span className="subscriber-info">Name : {name}</span><br/>
                    //         <span className="subscriber-info">Phone : {phone}</span>
                    //     </div>
                    //     <button type="submit" className="custom-btn add-btn custom-add-btn">Add</button>
                    // </form>
//                 </div>
//             </div>
//         )
//     }
// }
// export default AddSubscriber;