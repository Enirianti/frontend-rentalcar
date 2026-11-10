import axios from 'axios';
import { message } from 'antd';
export const bookCar=(reqObj)=>async dispatch=>{
    
    dispatch({type: 'LOADING', payload:true})

    try{
        await axios.post('/api/booking/bookcar', reqObj)
        dispatch({type: 'LOADING', payload:false})
        message.success("Your booked successfully");
        setTimeout(() => {
            window.location.href='/userbooking'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
        message.error("Something went wrong, please try again later");
    }
};

export const getAllBooking=()=>async dispatch=>{
    
    dispatch({type: 'LOADING', payload:true})

    try{
        const response = await axios.get('/api/booking/getallbooking')
        dispatch({type: 'GET_ALL_BOOKING', payload:response.data})
        dispatch({type: 'LOADING', payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}