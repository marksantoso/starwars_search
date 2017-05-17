import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Character from '../components/char_tile';
import { fetchMoreChars } from '../actions/charactersActions';

class CharacterList extends Component {

    constructor(props) {
        super(props);

        this.state = {
             moreItems : true
        };
    }

    _loadMore() {

        if (this.props.pagination.next != null) {
                this.props.fetchMoreChars(this.props.pagination.next, this.props.pagination.index + 10, 'infinitescroll', this.props.api.language);
        } else {
            this.state.moreItems = false;
        }

    }

    render() {

        // Push all chars into an array.
        let chars = [];

        for (var char in this.props.characters) {
           chars.push(this.props.characters[char]);
        }

        // Add score to char items
        let charsWithScore = chars.map((char) => {
            if (Object.keys(this.props.scores).length > 0) {
                Object.entries(this.props.scores).forEach(
                    ([key, value]) => {
                        if (key === char.name) {
                            char = { ...char, ...this.props.scores[key] };
                        }
                    }
                );
                return char;
            }
            return char;
        });

        // Sort chars by score
        charsWithScore = charsWithScore.sort(function(a,b) {

            // for chars with no score set score to zero
            if (typeof a.score == "undefined") {
                a.score = 0;
            }

            if (typeof b.score == "undefined") {
                b.score = 0;
            }

            if (a.score == b.score) {
                return a.score - b.score;
            }

            return b.score - a.score;
        });


        // Create JSX item with new order
        const charItems = charsWithScore.map((char) => {
                return <Character key={char.name} char={char} />
        });

        const loader = <span className="loader starwars-yellow">🚀 Loading more...</span>;
        const complete = <span className="complete-msg starwars-yellow">⭐ All characters loaded</span>
        return (
                <InfiniteScroll
                    next={this._loadMore.bind(this)}
                    hasMore={this.state.moreItems}
                    endMessage={complete}
                    scrollThreshold={0.9}
                    loader={loader}
                    style={{ overflow: 'hidden' }}
                    >
                    {charItems}
                  </InfiniteScroll>
        );
    }
}

const mapStateToProps = ( state ) => {
    const { pagination, characters, scores, api } = state
    return { pagination, characters, scores, api };
}

export default connect(mapStateToProps, { fetchMoreChars })(CharacterList);
