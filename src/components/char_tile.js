import React, { Component } from 'react';
import CharacterScore from './char_score';
import CharDetailedModal from './char_detailed';
import { connect } from 'react-redux';

// import actionCreators
import { getFilms } from '../actions/filmsActions';
import { getSpecies } from '../actions/speciesActions';
import { getStarships } from '../actions/starshipsActions';

// import asset
import noImage from '../assets/images/char_images/no-image.jpg';

class Character extends Component {

        constructor(props) {
            super(props);

            this.state = {
                modalState: false,
            };

            this.showModal = this.showModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
        }

        showModal() {
            this.setState({ modalState: true })

            const char = this.props.char;
            const language = this.props.api.language;

            // Get sub props from api if not already defined
            if (!(char.name in this.props.films)) {
                this.props.getFilms(char.name, char['films'], language);
            }

            if (!(char.name in this.props.species)) {
                this.props.getSpecies(char.name, char['species'], language);
            }

            if (!(char.name in this.props.starships)) {
                this.props.getStarships(char.name, char['starships'], language);
            }
        }

        closeModal() {
            this.setState({ modalState: false })
        }


        render() {

            const charImage = (this.props.char.thumbnailUrl !== null) ? this.props.char.thumbnailUrl : noImage;

            const imageStyle = {
                backgroundImage:  'url(' + charImage + ')',
            }

            return (
                <div className="col-md-3 col-sm-3 col-xs-12 c-item animate">
                   <div className="content" onClick={this.showModal}>
                       <div className="row">
                           <div className="col-md-12">
                               <div className="image" style={imageStyle}  />
                               <div className="details">
                                <span className="name">{this.props.char.name}</span>
                                <span className="planet">{this.props.char.homeworldName}</span>
                               </div>
                           </div>
                       </div>
                       <div className="row">
                           <div className="col-md-12">
                                <CharacterScore char={this.props.char.name} />
                           </div>
                       </div>
                    </div>

                    <CharDetailedModal show={this.state.modalState} char={this.props.char} onHide={this.closeModal} />
                </div>
            );
        }
}

const mapStateToProps = (state) => {
     return state;
}

export default connect(mapStateToProps, { getFilms, getStarships, getSpecies })(Character);
