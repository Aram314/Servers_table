import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const SortIcon = styled.span`
    cursor: pointer;
    display: inline-block;
    margin-right: 3px;
    height: 25px;
    width: 25px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    &:hover {
        background-color: #e6e4e4;
    }
`;
class Sort extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sortAsc: true,
        };
        this.sort = this.sort.bind(this);
    }
    sort(field){
        this.props.sort(field, this.state.sortAsc);
        this.setState({
            sortAsc: !this.state.sortAsc,
        })
    }
    render(){
        const {field} = this.props;
        return (
            <SortIcon>
                {this.state.sortAsc ?
                    <i className="fas fa-sort-amount-up" onClick={()=>this.sort(field)}></i> :
                    <i className="fas fa-sort-amount-down" onClick={()=>this.sort(field)}></i>}
            </SortIcon>
        )
    }
}

Sort.propTypes = {
    field: PropTypes.string.isRequired,
    sort: PropTypes.func.isRequired,
};

export default Sort