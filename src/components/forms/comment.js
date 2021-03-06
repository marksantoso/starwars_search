import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class CommentForm extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <form className="commentForm" role="form" aria-label="comment" onSubmit={handleSubmit}>
                <div >
                    <Field className="comment" name="comment" component="textarea" type="text" />
                </div>
                <button className="btn btn-md submit-btn" role="button" type="submit">Submit</button>
            </form>
        );
    }
}

// Decorate the form component
CommentForm = reduxForm({
    form: 'comment' // a unique name for this form
})(CommentForm);

export default CommentForm;
