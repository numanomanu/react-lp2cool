// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as eyeCatchActions from '../actions/eye_catch';
import EyeCatchInput from '../components/form/eye_catch_input';
import { OneLineInput } from '../components/form/text_fields';

function validate(values): Object {
    const errors = {};
    return errors;
}

function mapStateToProps(state: Object): Object {
    return {
        eyeCatch: state.eyeCatch,
        initialValues: {
            content: state.eyeCatch.data.title,
        },
    };
}

function mapDispatchToProps(dispatch: Function): Object {
    return {
        eyeCatchActions: bindActionCreators(eyeCatchActions, dispatch),
    };
}

const eyeCatchStyle = {
    width: '100%',
    height: '420px',
    objectFit: 'cover',
}
const eyeCatchTitleStyle = {
    wrapper: {
        top: '200px',
        left: '50%',
        width: '100%',
        color: 'white',
        fontSize: '20px',
        position: 'absolute',
        transform: 'translate(-50%,-50%)',
    },
    content: {
        textAlign: 'center',
        margin: '0 auto',
    },
}
class EyeCatchContainer extends Component {

    props: {
        eyeCatch: any;
        handleSubmit: Function;
        eyeCatchActions: {
            upload: Function;
            changeImageEditMode: Function;
            editTtile: Function;
            changeTitleEditMode: Function;
        };
    };

    section = (inputData: any) => {
        const payload = {
            content: inputData.content,
        }
        this.props.eyeCatchActions.editTtile(payload);
    }

    renderEditOrHtml = () => {
        if (!this.props.eyeCatch.data.image || this.props.eyeCatch.editImageFlag) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h3>アイキャッチ画像を選んでください</h3>
                    <Field
                        name="profileIcon"
                        component={EyeCatchInput}
                        upload={this.props.eyeCatchActions.upload}
                    />
                </div>
            )
        }
        return (
            <div>
                <textbox onClick={() => { this.props.eyeCatchActions.changeImageEditMode() }}>
                    <img alt="eyeCatch" style={eyeCatchStyle} src={this.props.eyeCatch.data.image} />
                </textbox>
                { this.props.eyeCatch.editTitleFlag ?
                <div>
                    <Field
                        name="content"
                        component={OneLineInput}
                        floatingLabelText="htmlを入力できます"
                    />
                    <RaisedButton primary label="更新" type="submit" />
                </div> :
                <textbox style={eyeCatchTitleStyle.wrapper} onClick={() => { this.props.eyeCatchActions.changeTitleEditMode() }}>
                    <div style={eyeCatchTitleStyle.content} dangerouslySetInnerHTML={{ __html: this.props.eyeCatch.data.title }} />
                </textbox>
                }
            </div>
        )
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.section)}>
                    <div>{this.renderEditOrHtml()}</div>
                </form>
            </div>
        );
    }
}

EyeCatchContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        destroyOnUnmount: false,
        form: 'EyeCatchForm',
        validate,
        enableReinitialize: true,
    }),
)(EyeCatchContainer)

export default EyeCatchContainer;
