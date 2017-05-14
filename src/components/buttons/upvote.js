import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUpVote } from '../../actions/scoreActions';

class UpVote extends Component {

    constructor(props) {
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this)
    }

    render() {
        return (
            <i className="glyphicon glyphicon-arrow-up upVote" onClick={this.handleUpVote} ></i>
        );
    }

    handleUpVote(e) {
        e.stopPropagation();
        this.props.addUpVote(this.props.currentScore);
    }
}

const mapStateToProps = ( state ) => {
    return state;
}

export default connect(mapStateToProps, { addUpVote })(UpVote);
