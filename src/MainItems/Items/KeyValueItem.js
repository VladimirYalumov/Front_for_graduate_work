import React, {useContext} from 'react';
import PropTypes from "prop-types";
import Context from "../../context";

function KeyValueItem({redisKey, index}) {
    const {getErrorsByKey} = useContext(Context);

    let classLi = (redisKey.price > 0) ? " list-group-item-success" : " list-group-item-danger"
    return (
        <button key={index} className={
            "list-group-item list-group-item-action" + classLi
        } onClick={()=>getErrorsByKey(redisKey.id)}>
            {index+1}. {redisKey.keyRedis} - {redisKey.price}
        </button>

    );
}

KeyValueItem.propTypes = {
    redisKey: PropTypes.object.isRequired,
    index: PropTypes.number,
    price: PropTypes.number,
    keyRedis: PropTypes.string
}

export default KeyValueItem;