import React, {useContext} from 'react';
import PropTypes from "prop-types";
import Context from "../../context";
import ErrorTripsTableElem from "./ErrorTripsTableElem";

function ErrorTripsResult() {

    const {errorTrips} = useContext(Context);

    const {pageTable} = useContext(Context);

    let emptyTR = [];

    for(let i = 0; i < 5; i++){
        emptyTR.push(true);
    }

    return (
        <table className="table table-dark table-bordered text-center">
            <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">DIRECTION</th>
                <th scope="col">DATE_SEARCH</th>
                <th scope="col">DATE_ARR</th>
                <th scope="col">DATE_DEP</th>
                <th scope="col">PRICE</th>
                <th scope="col">INFO</th>
            </tr>
            </thead>
            <tbody>
                {errorTrips.map((errorTrip, index) => {
                    if((index < pageTable * 5)&&(index+1 > pageTable * 5 - 5)) {
                        emptyTR.pop();
                        return <ErrorTripsTableElem
                            dir={errorTrip.arr+errorTrip.dep}
                            arr={errorTrip.arr_date}
                            dep={errorTrip.dep_date}
                            search={errorTrip.search}
                            price={errorTrip.price}
                            index = {index+1}
                            id = {errorTrip.id}
                            key = {errorTrip.id}
                        />
                    }
                })}
                {emptyTR.map((e, i) => {
                    return <tr  key = {i}>
                        <td colSpan="6"> - </td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

ErrorTripsResult.propTypes = {
    errorTrips: PropTypes.array
}

export default ErrorTripsResult;