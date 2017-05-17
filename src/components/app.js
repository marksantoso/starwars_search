import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChars, fetchMoreChars } from '../actions/charactersActions';
import { Glyphicon } from 'react-bootstrap';
import CharacterList from '../containers/char_list';
import Accessibility from '../containers/access_options';

import { Loader } from './';
import SearchBar from '../containers/search_bar';

require('../sass/_styles.scss');


class App extends Component {

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

      console.log(this.props.characters);

      let content = null;
      let showLoadMore;

      if (this.props.pagination.next) {
          if (this.props.pagination.showMore) {
              showLoadMore = { display: 'block' }
          } else {
              showLoadMore = { display: 'none' }
          }
      } else {
          showLoadMore = { display: 'none' }
      }

      if (this.props.api.error) {
          content = <div className="error errorMessage">Error: {this.props.api.errorText}</div>;
      } else if (this.props.api.loading) {
          content = <Loader />;
          showLoadMore = { display: 'none' }
      } else {
          content = <CharacterList />;
      }

    return (
        <div className="margin-tb-40">
            <div className="container">
                <div className="row ">
                      <div className="col-md-6">
                          <h1 className="starwars-yellow">Starwars Library</h1>
                      </div>
                      <div className="col-md-6">
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
                        { content }
                    </div>

                    <span className="load-more-btn" style={showLoadMore} onClick={this._loadMore}><Glyphicon glyph="menu-down" /> Load more</span>
                </div>
            </div>
          </div>
    );
  }
}

const mapStateToProps = ( state ) => {

    const { pagination, characters, scores, api } = state
    return { pagination, characters, scores, api };
}


// pushes getChars results to all reducers
function mapDispatchToProps(dispatch) {
    return bindActionCreators(null, dispatch);
}

export default connect(mapStateToProps, { getChars, fetchMoreChars })(App);
