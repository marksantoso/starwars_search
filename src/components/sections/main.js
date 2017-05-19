import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

// import character action creators
import {getChars, fetchMoreChars} from '../../actions/charactersActions';
import {Glyphicon} from 'react-bootstrap';

// import components
import CharacterList from '../../containers/char_list';
import Accessibility from '../../containers/access_options';
import {Loader} from '../';
import SearchBar from '../../containers/search_bar';

require('../../sass/_styles.scss');

class Main extends Component {

    constructor(props) {
        super(props);
        this.props.getChars(this.props.api.language, this.props.api.rootUrl, null);

        this.state = {
            showLoadMore: true
        }

        this._loadMore = this._loadMore.bind(this);
    }

    _loadMore() {
        this.props.fetchMoreChars(this.props.pagination.next, this.props.pagination.index + 10, null, this.props.api.language);
    }

    render() {

        /*
      let charImages = {};
      for ( let char in this.props.characters) {
          const name = this.props.characters[char].name;
          charImages[name] = { imageUrl: this.props.characters[char].imageUrl, thumbnailUrl: this.props.characters[char].thumbnailUrl };
      }

      console.log(JSON.stringify(charImages)); */

        let content = null;
        let showLoadMore;

        if (this.props.pagination.next) {
            if (this.props.pagination.showMore) {
                showLoadMore = {
                    display: 'block'
                }
            } else {
                showLoadMore = {
                    display: 'none'
                }
            }
        } else {
            showLoadMore = {
                display: 'none'
            }
        }

        if (this.props.api.error) {
            content = <div className="error errorMessage">Error: {this.props.api.errorText}</div>;
        } else if (this.props.api.loading) {
            content = <Loader/>;
            showLoadMore = {
                display: 'none'
            }
        } else {
            content = <CharacterList/>;
        }

        return (
            <div className="margin-tb-40">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-5 col-sm-7">
                            <div className="heading">
                                <h1 className="starwars-yellow">Starwars Library</h1>
                                <Link to="/about" className="about-link starwars-yellow">About</Link>
                            </div>
                        </div>
                        <div className="col-md-offset-4 col-md-3 col-sm-5">
                            <Accessibility />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <SearchBar onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="grid effect">
                            {content}
                        </div>

                        <span className="load-more-btn" style={showLoadMore} onClick={this._loadMore}><Glyphicon glyph="menu-down"/>
                            Load more</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {pagination, characters, scores, api} = state
    return {pagination, characters, scores, api};
}

export default connect(mapStateToProps, {getChars, fetchMoreChars})(Main);
