import { MDBIcon } from 'mdbreact';
import React from 'react';

const CardMin = (props) => {
    return(
        <div className={"col-xl-3 col-md-6 mb-4 mt-4 " + props.className}>
            <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                            {props.titulo}
                            </div>
                            <div className={"h5 mb-0 font-weight-bold text-gray-800 " + props.textColor}>{props.valor}</div>
                        </div>
                        <div className="col-auto">
                            <MDBIcon icon={props.icon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardMin;