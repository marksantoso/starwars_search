import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Popover, OverlayTrigger} from 'react-bootstrap';

import {addDownVote} from '../../actions/scoreActions';

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
        const downVotePopover = (
            <Popover id="popover-trigger-hover-focus" className="pop-over">
                Downvote character
            </Popover>
        );

        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={downVotePopover} name="downVote">
                <i className="glyphicon glyphicon-arrow-down downVote" onClick={this.handleDownVote}></i>
            </OverlayTrigger>

        );
    }

}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, {addDownVote})(DownVote);
