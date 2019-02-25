import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const ActionButton = styled.div`
    float: right;
    button {
        padding: 4px 9px;
    }
    .dropdown-menu-right {
        padding: 0;
    }
`;
class Action extends React.Component {
    render(){
        const {server_id, server_name} = this.props;
        const modalId = `modal${server_id}`;
        const data_target = `#modal${server_id}`;
        const modalLabel = `ModalLabel${server_id}`;
        return (
            <div>
                <ActionButton className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Action
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button" data-toggle="modal" data-target={data_target}><i className="far fa-trash-alt"></i> Delete</button>
                    </div>
                </ActionButton>

                <div className="modal fade" id={modalId} tabIndex="-1" role="dialog" aria-labelledby={modalLabel} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={modalLabel}>Delete "{server_name}"</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

Action.propTypes = {
    server_name: PropTypes.string.isRequired,
    server_id: PropTypes.number.isRequired,
};

export default Action