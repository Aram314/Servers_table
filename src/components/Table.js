import React, { Component } from 'react';
import Ports from './Ports'
import Sort from './Sort'
import Filter from './Filter'
import Action from './Action'
import styled from 'styled-components';
import PropTypes from 'prop-types'

const StyledTable = styled.table`
    thead tr {
        background-color: white;
        th {
            display: flex;
            input {
                flex-grow: 1;
                height: 26px;
            }
            .clear-button {
                padding: 0 9px;
            }
            &:last-child {
                justify-content: flex-end;
            }
            &:first-child {
                min-width: 120px;
            }
            &:nth-child(2) {
                min-width: 150px;
            }
            &:nth-child(3) {
                min-width: 336px;
            }
            &:nth-child(4) {
                min-width: 100px;
            }
        }
    }
    tbody tr {
        background-color: #F9F9F9;
        td {
            &:first-child {
                min-width: 120px;
            }
            &:nth-child(2) {
                min-width: 150px;
            }
            &:nth-child(3) {
                min-width: 336px;
            }
            &:nth-child(4) {
                min-width: 100px;
        }
    }
`;

class Table extends Component {
    constructor(props){
        super(props);
        this.sort = this.sort.bind(this);
        this.filter = this.filter.bind(this);
        this.clear = this.clear.bind(this);
    }
    sort(field, sortAsc){
        this.props.sort(field, sortAsc);
    }
    filter(txt, field){
        this.props.filter(txt, field)
    }
    clear(){
        this.props.clear();
    }
    render() {
        const { servers, filterOpen, filterName, filterIp_address, filterPorts } = this.props;
        return (
            <div className='table-responsive'>
                <StyledTable className="table">
                    <thead>
                    <tr className='d-flex'>
                        <th className='col-2'>
                            <Sort field='name' sort={this.sort} />
                            {filterOpen ? <Filter filterText={filterName} filter={txt=>{this.filter(txt, 'name')}}/> : <span>Name</span>}
                        </th>
                        <th className='col-2'>
                            <Sort field='ip_address' sort={this.sort} />
                            {filterOpen ? <Filter filterText={filterIp_address} filter={txt=>{this.filter(txt, 'ip_address')}}/> : <span>IP Address</span>}
                        </th>
                        <th className='col-5'>
                            <Sort field='ports' sort={this.sort} />
                            {filterOpen ? <Filter filterText={filterPorts} filter={txt=>{this.filter(txt, 'ports')}}/> : <span>Ports</span>}
                        </th>
                        <th className='col-3'>{filterOpen ?<button className="btn btn-outline-dark clear-button" onClick={this.clear}>Clear</button> :  <span/>}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {servers.map(server => {
                        return (
                            <tr key={server.id} className='d-flex'>
                                <td className='col-2 text-primary'><i className="fas fa-server"></i> {server.name}</td>
                                <td className='col-2'>{server.ip_address}</td>
                                <td className='col-5'><Ports ports_info={server.ports} /></td>
                                <td className='col-3'><Action server_name={server.name} server_id={server.id}/></td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </StyledTable>
            </div>

        );
    }
}

Table.propTypes = {
    servers: PropTypes.array.isRequired,
    filterOpen: PropTypes.bool.isRequired,
    sort: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    filterName: PropTypes.string,
    filterPorts: PropTypes.string,
    filterIp_address: PropTypes.string,
};

export default Table