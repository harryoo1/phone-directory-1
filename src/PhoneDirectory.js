import React, {Component, useState, useEffect, useCallback, useMemo, useReducer} from "react";
import AddSubscriber from "./AddSubscriber";
import ShowSubscribers from "./ShowSubscribers";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./Footer";
import { Fragment} from "react/cjs/react.production.min";
import { SubscriberCountContext } from "./SubscriberCountContext";
import { TotalSubscribersReducer } from "./TotalSubscribersReducer";
import { useDispatch } from "react-redux";

export default function PhoneDirectory(){

    const [subscribersList, setSubscribersList] = useState([]);

    const [state, dispatchToTotalSubscriberReducer] = useReducer(TotalSubscribersReducer, {count:0});

    const dispatch = useDispatch();

    async function loadData(){
            
        const rawResponse = await fetch("http://localhost:7081/api/contacts");
        const data = await rawResponse.json();
        dispatch({"type": "SET_SUBSCRIBERS", payload: data});
        dispatchToTotalSubscriberReducer({"type": "UPDATE_COUNT", payload: data.length});
        setSubscribersList(data);
    }

    useEffect(() => {
        loadData();
    }, []);

    async function addSubscriberHandler(newSubscriber) {

        const rawResponse = await fetch("http://localhost:7081/api/contacts/",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSubscriber)
        });
        const data = await rawResponse.json();
        loadData();

        // if(subscribersList.length > 0){
        //     newSubscriber.id = subscribersList[subscribersList.length - 1].id + 1;
        // }
        // else{
        //     newSubscriber.id = 1;
        // }
        // subscribersList.push(newSubscriber);
        // setSubscribersList(subscribersList);
    }

    const deleteSubscriberHandler = useCallback(async(subscriberId) => {
        const rawResponse = await fetch("http://localhost:7081/api/contacts/"+subscriberId, {method: "DELETE"});
        const data = await rawResponse.json();
        loadData();
    }, []);

    // async function deleteSubscriberHandler(subscriberId) {
    //     const rawResponse = await fetch("http://localhost:7081/api/contacts/"+subscriberId, {method: "DELETE"});
    //     const data = await rawResponse.json();
    //     loadData();
    //     // const newSubscribers = subscribersList.filter((subscriber) => subscriber.id !== subscriberId);
    //     // setSubscribersList(newSubscribers);
    // }

    // const countOfSubscribers = useMemo(() => {
    //     return subscribersList.length;
    // }, [subscribersList]);

    return(
        <Fragment>
            <Router>
                <div>
                    <Routes>
                        <Route exact path="/" element={<ShowSubscribers deleteSubscriberHandler = {(subscriberId) => deleteSubscriberHandler(subscriberId)}/>}/>
                        {/* <Route exact path="/add" element={<AddSubscriber addSubscriberHandler = {this.addSubscriberHandler} history = {history}/>}/> */}
                        <Route exact path="/add" element={<AddSubscriber addSubscriberHandler = {(newSubscriber) => addSubscriberHandler(newSubscriber)}/>}/>
                    </Routes>
                </div>
            </Router>
            <SubscriberCountContext.Provider value={subscribersList.length}>
                <Footer/>
            </SubscriberCountContext.Provider>
        </Fragment>
    )
}
// class PhoneDirectory extends Component{

//     constructor(){
//         super();
//         this.state = {
//             subscribersList : [
//                 {
//                     id: 1,
//                     name: "Harish",
//                     phone: "8218610553"
//                 },
//                 {
//                     id: 2,
//                     name: "Golu",
//                     phone: "8954113521"
//                 }
//             ]
//         }
//     }

//     addSubscriberHandler = (newSubscriber) => {
//         let subscribersList = this.state.subscribersList;
//         if(subscribersList.length > 0){
//             newSubscriber.id = subscribersList[subscribersList.length - 1].id + 1;
//         }
//         else{
//             newSubscriber.id = 1;
//         }
//         subscribersList.push(newSubscriber);
//         this.setState({subscribersList: subscribersList});
//     }

//     deleteSubscriberHandler = (subscriberId) => {
//         let subscribersList = this.state.subscribersList;
//         let subscriberIndex = 0;
//         subscribersList.forEach(function(subscriber, index){
//             if(subscriber.id == subscriberId){
//                 subscriberIndex = index;
//             }
//         }, this);
//         let newSubscribers = subscribersList;
//         newSubscribers.splice(subscriberIndex, 1);
//         this.setState({subscribers : newSubscribers})
//     }

//     render(){
//         return(
//             <Router>
//                 <div>
//                     <Routes>
//                         <Route exact path="/" element={<ShowSubscribers subscribersList = {this.state.subscribersList} deleteSubscriberHandler = {this.deleteSubscriberHandler}/>}/>
//                         {/* <Route exact path="/add" element={<AddSubscriber addSubscriberHandler = {this.addSubscriberHandler} history = {history}/>}/> */}
//                         <Route exact path="/add" element={<AddSubscriber addSubscriberHandler = {this.addSubscriberHandler}/>}/>
//                     </Routes>
//                 </div>
//             </Router>
//         )
//     }
// }
// export default PhoneDirectory;