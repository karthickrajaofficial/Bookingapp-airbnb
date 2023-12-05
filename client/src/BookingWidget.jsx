import { useContext, useState , useEffect } from "react"
import axios from "axios";
import {  Navigate } from "react-router-dom";

import {differenceInCalendarDays} from "date-fns";
import { UserContext } from "./UserContext";
const BookingWidget = ({place}) => {
const [checkIn,setCheckIn] = useState('')
const [checkOut,setCheckOut] = useState('')
const [nuberOfGuests,setNumberOfGuests] = useState(1)
const [name,setName] = useState('')
const [mobile,setMobile] = useState('')
const [redirect,setRedirect] = useState('')
const {user} = useContext(UserContext)

useEffect(() => {
  if (user) {
    setName(user.name);
  }
}, [user]);

let numberOfNights = 0;
if (checkIn && checkOut) {
    numberOfNights = Math.abs(differenceInCalendarDays(new Date(checkIn), new Date(checkOut)));
}

async function bookThisPlace(){
const response = await axios.post('/bookings',{
  checkIn,checkOut,name,mobile,nuberOfGuests,
  place:place._id,price:numberOfNights * place.price,
});
const bookingId = response.data._id;
setRedirect(`/account/bookings/${bookingId}`)

}

if (redirect){
  return <Navigate to ={redirect}/>
}


  return (
    <div className="bg-white shadow p-4 rounded-2xl">
          <div className=" text-2xl text-center">
            Price :  ₹{place.price}/Per night
          </div>
          <div className="border rounded-2xl mt-4">
            <div className="flex">
              <div className=" py-3 px-4 ">
                <label>CheckIn:</label>
                <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}/>
              </div>
              <div className=" py-3 px-4 border-l ">
                <label>CheckOut:</label>
                <input type="date"  value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
              </div>
            </div>
            <div className=" py-3 px-4 border-t ">
              <label>Number of Guests:</label>
              <input type="number" value={nuberOfGuests}  onChange={ev=>setNumberOfGuests(ev.target.value)} />
            </div>
            {numberOfNights > 0 && (
               <div className=" py-3 px-4 border-t ">
               <label>Your FullName :</label>
               <input type="text" value={name} 
                onChange={ev=>setName(ev.target.value)} />
               <label>Your Mobile No :</label>
               <input type="tel" value={mobile} 
                onChange={ev=>setMobile(ev.target.value)} />
             </div>
            )}
          </div>
          <button onClick={bookThisPlace} className="primary mt-4 ">
            Book this place   ₹ 
           {numberOfNights > 0 && (
            <span> {numberOfNights * place.price}</span>
           )}
            </button>
        </div>
  )
}

export default BookingWidget