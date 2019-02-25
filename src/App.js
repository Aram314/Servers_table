import React, { Component } from 'react';
import axios from 'axios';
import Table from './components/Table';
import {ipToNumber} from "./helper";
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid #dedada;
    margin: 15px;
    border-radius: 8px;
    background-color: #F9F9F9;
    .filter-button {
        padding: 0px 7px;
        font-size: 14px;
        border-radius: 2px;
        float: right;
        margin: 7px 15px;
    }
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      servers: [],
      filterOpen: false,
      filterName: '',
      filterIp_address: '',
      filterPorts: '',
    };
    this.sort = this.sort.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.filter = this.filter.bind(this);
    this.clear = this.clear.bind(this);
  }
  componentDidMount() {
      this.getData();
  }
  clear(){
      this.getData();
      this.setState({
          filterName: '',
          filterIp_address: '',
          filterPorts: '',
      })
  }
  getData(){
       return (
           axios.get('data.json')
               .then(response => {
                   this.setState({
                       servers: response.data.data,
                   });
                   return response.data.data;
               })
       )
  }
  sort(field, sortAsc) {
    let sortedServers = this.state.servers;
    if(field === 'ports') {
        // when sorting ports -- first sort port in itself, then first elements of ports compare to each other
        sortedServers.forEach(server => {
            server.ports.sort(function(a,b){
                let portStrTemplateA = `${a.location}(${a.port_name})@${a.switch}`;
                let portStrTemplateB = `${b.location}(${b.port_name})@${b.switch}`;
                if (portStrTemplateA > portStrTemplateB) {
                    return 1;
                }
                if (portStrTemplateA < portStrTemplateB) {
                    return -1;
                }
                return 0;
            });
            server.ports = sortAsc ? server.ports : server.ports.reverse();
        });
    }
    sortedServers.sort(function (a, b) {
      if(field === 'ip_address') {
        return ipToNumber(a[field]) - ipToNumber(b[field])
      }
      if(field === 'ports') {
          let portStrTemplateA = `${a.ports[0].location}(${a.ports[0].port_name})@${a.ports[0].switch}`;
          let portStrTemplateB = `${b.ports[0].location}(${b.ports[0].port_name})@${b.ports[0].switch}`;
          if (portStrTemplateA > portStrTemplateB) {
              return 1;
          }
          if (portStrTemplateA < portStrTemplateB) {
              return -1;
          }
          return 0;
      }
      if (a[field] > b[field]) {
          return 1;
      }
      if (a[field] < b[field]) {
          return -1;
      }
      return 0;
    });
    sortedServers = sortAsc ? sortedServers : sortedServers.reverse();
    this.setState({
        servers: sortedServers,
    })
  }
  toggleFilter(){
        this.setState({
            filterOpen: !this.state.filterOpen,
        })
    }
  checkPortsMatch(server, txt){
      let bool = false;
      let arrPortsStr = [];
      server.ports.forEach(port => {
          arrPortsStr.push(`${port.location}(${port.port_name})@${port.switch}`)
      });
      arrPortsStr.forEach(portStr => {
          if(portStr.toLowerCase().indexOf(txt.toLowerCase()) !== -1) {
              bool = true;
          }
      });
      return bool;
  }
  filter(txt, field){
      let filteredServers;
      let filterField = `filter${field.charAt(0).toUpperCase() + field.slice(1)}`;
      const {filterName, filterIp_address, filterPorts} = this.state;

      this.getData()
          .then(servers => {
              filteredServers = servers.filter(server => {
                  if(field === 'name') {
                      return server.name.toLowerCase().indexOf(txt.toLowerCase()) !== -1 &&
                             server['ip_address'].indexOf(filterIp_address) !== -1 &&
                             this.checkPortsMatch(server, filterPorts)
                  }
                  if(field === 'ip_address') {
                      return server.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 &&
                             server['ip_address'].indexOf(txt) !== -1 &&
                             this.checkPortsMatch(server, filterPorts)
                  }
                  if(field === 'ports') {
                      return server.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 &&
                             server['ip_address'].indexOf(filterIp_address) !== -1 &&
                             this.checkPortsMatch(server, txt)
                  }
                  return '';
              });
              this.setState({
                  [filterField]: txt,
                  servers: filteredServers,
              })
          });
  }
  render() {
    const {servers, filterOpen, filterName, filterIp_address, filterPorts} = this.state;
    return (
        <Container>
          <button onClick={this.toggleFilter} className="btn btn-outline-dark filter-button"><i className="fas fa-filter"></i> Filter</button>
          <Table
              servers={servers}
              filterOpen={filterOpen}
              sort={this.sort}
              filter={this.filter}
              clear={this.clear}
              filterName={filterName}
              filterPorts={filterPorts}
              filterIp_address={filterIp_address}
          />
        </Container>
    )
  }
}

export default App;