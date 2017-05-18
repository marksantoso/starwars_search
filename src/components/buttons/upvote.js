import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, OverlayTrigger } from 'react-bootstrap';

import { addUpVote } from '../../actions/scoreActions';

class UpVote extends Component {

    constructor(props) {
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this)
    }

    render() {

        const upVotePopover = (
          <Popover id="popover-trigger-hover-focus" className="pop-over">
            Upvote character
          </Popover>
        );

        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={upVotePopover} name="upVote">
                <i className="glyphicon glyphicon-arrow-up upVote" onClick={this.handleUpVote} ></i>
            </OverlayTrigger>
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
