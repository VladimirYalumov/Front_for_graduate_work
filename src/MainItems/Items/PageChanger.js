import React from 'react';
import PropTypes from "prop-types";

function PageChanger({pageChange}) {
    return (
        <div className={"col-12 p-0 row justify-content-center"}>
                <button className="btn btn-secondary mr-3" onClick={()=>pageChange(0)}> {"<"} </button>
                <button className="btn btn-secondary" onClick={()=>pageChange(1)}> {">"} </button>
        </div>
    );
}

PageChanger.propTypes = {
    pageChange: PropTypes.func.isRequired
}

export default PageChanger;