import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const StyledFilter = styled.input`
    width: 80%;
    flex-grow: 1;
`;
class Filter extends React.Component {
    constructor(props){
        super(props);
        this.filter = this.filter.bind(this);
    }
    filter(event){
        this.props.filter(event.target.value)
    }
    render(){
        return (
            <StyledFilter value={this.props.filterText} onChange={this.filter} />
        )
    }
}

Filter.propTypes = {
    filterText: PropTypes.string,
    filter: PropTypes.func.isRequired,
};

export default Filter