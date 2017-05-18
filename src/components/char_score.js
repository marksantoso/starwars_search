import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownVote from './buttons/downvote';
import UpVote from './buttons/upvote';

class CharacterScore extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let score = 0;

        if (typeof(this.props.scores) != "undefined") {
            if ( this.props.scores[this.props.char]) {
                score = this.props.scores[this.props.char].score;
            }
        }

        return (
            <div className="char-score" >
                <UpVote currentScore={ { name: this.props.char, score: score }}  />
                <span> { score } </span>
                <DownVote currentScore={ {name: this.props.char, score: score}} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { scores } = state;
    return { scores };
}

export default connect(mapStateToProps, null)(CharacterScore);
