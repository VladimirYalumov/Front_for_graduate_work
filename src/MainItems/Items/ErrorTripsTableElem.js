import React from 'react';
import PropTypes from "prop-types";
import GraphModal from "../GraphModal";

function ErrorTripsTableElem(errorTrip) {
    let [trips, setTrips] = React.useState([]);

    return (
        <tr key={errorTrip.id}>
            <th scope="col">{errorTrip.index}</th>
            <th scope="col">{errorTrip.dir}</th>
            <th scope="col">{errorTrip.search}</th>
            <th scope="col">{errorTrip.arr}</th>
            <th scope="col">{errorTrip.dep}</th>
            <th scope="col">{errorTrip.price}</th>
            <th className={"p-0 pt-2"}>
                <GraphModal id = {errorTrip.id} trips = {trips} setTrips = {setTrips}/>
            </th>
        </tr>
    );
}

ErrorTripsTableElem.propTypes = {
    index: PropTypes.number
}

export default ErrorTripsTableElem;