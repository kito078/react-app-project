import React, { useState } from "react";

import "./TripList.css";
import useFetch from "../hooks/useFetch";

//Any reference type objects , arrays and functions if they are used direct as dependences ey will trigger an infinite loop
//use useRef to wrap an object/array argument wch is a useEffect dependency
//functions wen passed an argument we use callback to prvnt infinite loop

function TripList() {
  const [url, setUrl] = useState(" http://localhost:8000/trips");
  const { data: trips, isPending, error } = useFetch(url, "shaun");
  console.log(trips);

  return (
    <div className="trip-list">
      <h2>triplist</h2>
      {isPending && <div>Loading trips...</div>}
      {error && <div>{error}</div>}
      <ul>
        {trips &&
          trips.map((trip) => (
            <li key={trip.id}>
              {trip.id}
              <h3>{trip.title}</h3>
              <p>{trip.price}</p>
            </li>
          ))}
      </ul>
      <div className="filters">
        <button
          onClick={() => setUrl("  http://localhost:8000/trips?loc=europe")}
        >
          Europe
        </button>
        <button onClick={() => setUrl(" http://localhost:8000/trips")}>
          All Trips
        </button>
      </div>
    </div>
  );
}

export default TripList;

// import React, { useCallback, useEffect, useState } from "react";

// import "./TripList.css";

// function TripList() {
//   const [trips, setTrips] = useState([]);
//   const [url, setUrl] = useState(" http://localhost:8000/trips");

//   const fetchTrips = useCallback(async () => {
//     const response = await fetch(url);
//     const json = await response.json();
//     setTrips(json);
//     //use callback has dependences as argument
//     //its using a dynamic url value inside the func, the cast func wont be created wen the url changes
//     //we pass the url so tt anytym we click the button the func will rerun
//   }, [url]);

//   useEffect(() => {
//     fetchTrips();
//     // //this is an async task it returns a promise
//     // fetch(url)
//     //   //returns us a json
//     //   .then((response) => response.json())
//     //   //now we have access to the actual data
//     //   .then((json) => setTrips(json));
//   }, [fetchTrips]);

//   console.log(trips);

//   return (
//     <div className="trip-list">
//       <h2>triplist</h2>

//       <ul>
//         {trips.map((trip) => (
//           <li key={trip.id}>
//             {trip.id}
//             <h3>{trip.title}</h3>
//             <p>{trip.price}</p>
//           </li>
//         ))}
//       </ul>
//       <div className="filters">
//         <button
//           onClick={() => setUrl(" http://localhost:8000/trips?loc=europe")}
//         >
//           Europe
//         </button>
//         <button onClick={() => setUrl(" http://localhost:8000/trips")}>
//           All Trips
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TripList;
