import React from 'react';
import {useParams } from 'react-router-dom';
import useServiceDetail from '../../Hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';


const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    // const [user, setUser] = useState({
    //     name: 'abudllah al masud',
    //     email: 'masud10|@gmail.com',
    //     address: 'jatrabari, Dhaka',
    //     phone: '01726457771'
    // });

    // const handleAddressChange = event => {
    //     console.log(event.target.value);
    //     const {address, ...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     console.log(newUser);
    //     setUser(newUser)
    // }

    const handlePlaceOrder = event =>{
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('https://pure-fjord-15769.herokuapp.com/order/',order)
        .then(response =>{
            const {data} = response;
            if(data.insertedId){
                toast('Your order is booked!!!');
                event.target.reset();
            }
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h3> Please order: {service.name}</h3>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' value={user?.displayName} type='text' name='name' placeholder='name' required readOnly disabled></input>
                <br/>
                <input className='w-100 mb-2' value={user.email} type='email' name='email' placeholder='email' required readOnly disabled></input>
                <br/>
                <input className='w-100 mb-2' value={service.name} type='text' name='service' placeholder='service' required readOnly></input>
                <br/>
                <input className='w-100 mb-2' type='text' name='address' autoComplete='off' placeholder='address' required></input>
                <br/>
                <input className='w-100 mb-2' type='text' name='phone' placeholder='phone' required></input>
                <br/>
                <input className='btn btn-primary' type='submit' value='Please Order' />
            </form>
        </div>
    );
};

export default Checkout;