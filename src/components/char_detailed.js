import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
// import action creators
import { saveComment } from '../actions/charactersActions';

// import image assets
import spinner from '../assets/images/loaders/bar.gif';
import noImage from '../assets/images/char_images/no-image.jpg';

//import comment form component
import CommentForm from './forms/comment';



class CharDetailedModal extends Component {

    constructor(props) {
        super(props);
    }

    submit = (values) => {
      // Do something with the form values
      this.props.saveComment(this.props.char.name, values);
    }

    render() {

        const charImage = (this.props.char.thumbnailUrl !== null) ? this.props.char.thumbnailUrl : noImage;

        const imageStyle = {
            backgroundImage:  'url(' + charImage + ')',
        }

        let loading = { display: 'block' };

        if (!(this.props.api.filmsLoading) && !(this.props.api.speciesLoading) && !(this.props.api.starshipsLoading)) {
             loading = { display: 'none' };
        }

        const char = this.props.char;
        // Create JSX li with char props
        const { name, height, mass, skin_color, eye_color, birth_year, gender, homeworldName, score } = char;

        const charDetail = {
            height,
            mass,
            'skin color' : char.skin_color,
            'eye color' : char.eye_color,
            'birth year' : char.birth_year,
            gender,
        }

        if (char.name in this.props.films) {
            const films = this.props.films[char.name];
            if (Object.keys(films).length > 0) charDetail['films'] = films;
        }

        if (char.name in this.props.species) {
            const species = this.props.species[char.name];
            if (Object.keys(species).length > 0) charDetail['species'] = species;
        }

        if (char.name in this.props.starships) {
            const starships = this.props.starships[char.name];
            if (Object.keys(starships).length > 0) charDetail['starships'] = starships;
        }

        let comment;
        if (char.name in this.props.comments) {
            comment = (
                <div className="posted-comment">
                    <h4>Comment</h4>
                    {this.props.comments[char.name]}
                </div>
            );
        } else {
            comment = <CommentForm onSubmit={this.submit} />
        }

        const charItem = Object.keys(charDetail).map((prop) => {
            if (typeof charDetail[prop] == 'object') {
                    const sublistitems = Object.keys(charDetail[prop]).map(
                        (subprop) => {
                            if (charDetail[prop][subprop]['title']) {
                                return <li key={charDetail[prop][subprop]['title']}>{charDetail[prop][subprop]['title']}</li>
                            } else if (charDetail[prop][subprop]['name']) {
                                return <li key={charDetail[prop][subprop]['name']}>{charDetail[prop][subprop]['name']}</li>
                            }
                        }
                    );
                    return (
                        <li key={prop}>
                            <span className="prop">{prop}: <ul>{sublistitems}</ul></span>
                        </li>
                    )
            } else {
                return (
                    <li key={prop}><span className="prop">{prop}: {charDetail[prop]}</span></li>
                );
            }
        });

        return (
          <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                bsSize="large"
                aria-labelledby="contained-modal-title-sm"
                dialogClassName="char-detail-modal"
            >
            <Modal.Header closeButton>
                <div className="image-thumb" style={imageStyle}  />

                <div className="header-details">
                    <Modal.Title id="contained-modal-title-sm">{ this.props.char.name }</Modal.Title>
                    <h5>{ this.props.char.homeworldName }</h5>
                    <span className="score">{ this.props.char.score } votes</span>
                </div>

                <img className="pull-right loader-bar" style={loading} src={spinner} />

            </Modal.Header>
            <Modal.Body>
              <ul className="char-details">
                {charItem}
              </ul>

              {comment}

            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-md close-btn" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}

const mapStateToProps = ( state ) => {
    const { species, films, starships, api, comments } = state;
    return { species, films, starships, api, comments };
}

export default connect(mapStateToProps, { saveComment })(CharDetailedModal);
