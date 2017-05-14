import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDownVote } from '../../actions/scoreActions';

class DownVote extends Component {

    constructor(props) {
        super(props);
        this.handleDownVote = this.handleDownVote.bind(this);
    }

    handleDownVote(e) {
        e.stopPropagation();
        this.props.addDownVote(this.props.currentScore);
    }

    render() {
        return (
            <i className="glyphicon glyphicon-arrow-down downVote" onClick={this.handleDownVote} ></i>
        );
    }


}

const mapStateToProps = ( state ) => {
    return state;
}

export default connect(mapStateToProps, { addDownVote })(DownVote);
