import React from 'react';
import PropTypes from 'prop-types'
import KeyValueItem from "./Items/KeyValueItem";
import PageChanger from "./Items/PageChanger";
import ErrorTripsResult from "./Items/ErrorTripsResult";
import Loader from "./Loader";

function Content(props) {
    return (
        <div className={"row"}>
            <h5 className={"card-title col-12"}>Актуальные цены</h5>
            {
                props.loading ?
                <div className={"col-4"}>
                    <div className={"list-group col-12"}>
                        {props.redisKeys.map((redisKey, index) => {
                            if ((index < props.page * 5) && (index + 1 > props.page * 5 - 5))
                                return <KeyValueItem redisKey={redisKey} key={redisKey.id} index={index}/>
                        })}
                    </div>
                    <div className={"pt-3"}>
                        <PageChanger pageChange={props.pageChange}/>
                    </div>
                </div>
                :
                <div className={"col-4 "}>
                    <Loader />
                </div>
            }
            <div className={"col-8"}>
            <ErrorTripsResult/>
            <div className={"p-0 row justify-content-center"}>
            <button className="btn btn-secondary mr-3" onClick={() => props.pageTableChange(0)}> {"<"} </button>
            <button className="btn btn-secondary" onClick={() => props.pageTableChange(1)}> {">"} </button>
            </div>
            </div>
        </div>
    );
}

Content.propTypes = {
    pageChange: PropTypes.func.isRequired,
    test: PropTypes.number,
    redisKeys: PropTypes.array,
    page: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number
        ])
}

export default Content;