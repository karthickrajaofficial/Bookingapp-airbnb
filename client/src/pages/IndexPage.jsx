import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../Image";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    }, []); // Move the empty dependencies array here
  }, []); // This is where the dependencies array should be placed

  return (
    <div className="mt-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 && places.map((place,index) => (
          <Link to ={'/place/'+place._id} key={index}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt="" />
            )}
            </div>
            <h2 className="font-bold"> {place.address}</h2>
            <h3 className="text-sm  text-gray-500"> {place.title}</h3>
             <div className="mt-1">
              <span className="font-bold">
              ₹{place.price}
              </span>.Rs per night
           
             </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
