import React from 'react'
import './Modal.css'
import AnyChart from 'anychart-react'

export default class GraphModal extends React.Component {

    state = {
        isOpen: false
    }

    getTripsByErrorId(){
        let errorTripId  = {
            id: this.props.id
        }

        fetch('http://test-ajax/get-trips.php', {
            method: "POST",
            headers : {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
            body: JSON.stringify(errorTripId)
        })
            .then(response => response.json())
            .then(data => {
                this.props.setTrips(data);
        });
    }

    render() {
        return (
            <React.Fragment>
                <button type={"button"} className={"btn btn-light m-0 p-0 pr-3 pl-3"} onClick={() => this.setState({isOpen:true})}>
                    Инфо
                </button>
                {this.state.isOpen && (
                <div className="modal text-dark">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Статус заказа</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ isOpen: false })}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Заказ не выписан</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => this.setState({ isOpen: false })}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </React.Fragment>
        )
    }
}