import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChars } from '../actions/charactersActions';
import { Debounce } from 'react-throttle';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (
            <div className="form-group">
                <Debounce time="400" handler="onChange">
                     <input
                            className="form-control input-md"
                            placeholder="Search..."
                            onChange = {this.handleInputChange}
                            //value={this.state.term} not required with debounce
                    />
                </Debounce>

             </div>

        );
    }

    handleInputChange(e) {
        this.setState({term: e.target.value})
        this.props.getChars(this.props.api.language, this.props.api.rootUrl, e.target.value);
    }
}


const mapStateToProps = (state) => {
    const { api } = state;
    return { api };
}

export default connect(mapStateToProps, { getChars })(SearchBar);
