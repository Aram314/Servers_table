import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const PortCard = styled.div`
    background-color: white;
    margin: 10px 0;
    padding: 7px;
    .card-text {
        margin-bottom: 5px;
        font-weight: 500;
    }
    .port_BGP_state {
        background-color: #E33743;
        color: white;
        font-weight: bold;
        width: fit-content;
        padding: 1px 7px;
        font-size: 13px;
        border-radius: 3px;
    }
`;
class Ports extends React.Component {
    render(){
        const {ports_info} = this.props;
        return (
            <div>
                {ports_info.map(port_info => {
                    return (
                        <PortCard className='port card' key={port_info.location}>
                            <p className="card-text">
                                <i className="fas fa-network-wired text-success"></i> {port_info.location}({port_info.port_name})@{port_info.switch}
                            </p>
                            <div className="port_BGP_state">
                                bgp: {port_info.bgp}; prefix: {port_info.prefix}; time: {port_info.time}
                            </div>
                        </PortCard>
                    )
                })}
            </div>
        )
    }
}

Ports.propTypes = {
    ports_info: PropTypes.array.isRequired,
};

export default Ports