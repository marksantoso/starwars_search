import React from 'react';
import {Link} from 'react-router-dom';
import {Glyphicon} from 'react-bootstrap';

const About = () => {
    return (
        <div className="about-section">
            <div className="container">
                <div className="col-md-12">
                    <div className="navigation">
                        <Link to="/" ><Glyphicon glyph="chevron-left" role="navigation" />Back</Link>
                    </div>
                    <div className="about-content">

                            <h1>Starwars character search</h1>

                            <p>Assignment for CM interview</p>

                            <ul>
                                <li>- SPA built in react.js</li>
                                <li>- Users can browse characters and upvote or downvote there favourite characters</li>
                                <li>- Ability to search</li>
                                <li>- Accessibility options</li>
                                <li>- Users can comment on characters</li>
                                <li>- View further details of characters</li>
                            </ul>

                            <p>
                                <a href="mailto:marksantoso@gmail.com" className="email"><span className="emoji">👨🏻‍🔧 </span> marksantoso@gmail.com</a>
                            </p>

                    </div>

                </div>
            </div>
        </div>
    )
};

export default About;
