// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { SortableHandle } from 'react-sortable-hoc';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DragHandle from 'material-ui/svg-icons/editor/drag-handle';
import * as sectionActions from '../actions/section';
import { MultiLineInput } from '../components/form/text_fields';
import htmlTemplates from '../html_templates';


const SortableDragHandle = SortableHandle(() => <div><DragHandle />ドラッグで順番を変えられます</div>);

function validate(values): Object {
    const errors = {};
    return errors;
}


function mapStateToProps(state: Object): Object {
    let initialValues = {};
    if (!!state.sectionList.data[state.sectionList.selectedIndex]) {
        initialValues = {
            content: state.sectionList.data[state.sectionList.selectedIndex].content,
        }
    } else {
        initialValues = { constet: htmlTemplates[0] }
    }

    return {
        sectionList: state.sectionList.data,
        sectionForm: state.form.EditForm,
        initialValues,
    };
}

function mapDispatchToProps(dispatch: Function): Object {
    return {
        sectionActions: bindActionCreators(sectionActions, dispatch),
    };
}


class EditContainer extends Component {

    props: {
        index: any;
        content: any;
        editFlag: boolean;
        handleSubmit: Function;
        sectionActions: {
            del: Function;
            edit: Function;
            changeEditMode: Function;
        };
    };

    section = (inputData: any) => {
        const payload = {
            index: this.props.index,
            content: inputData.content,
        }
        this.props.sectionActions.edit(payload);
    }

    renderEditOrHtml = () => {
        const { index, content } = this.props;
        if (this.props.editFlag) {
            return (
                <div>
                    <SortableDragHandle />
                    <Field
                        name="content"
                        component={MultiLineInput}
                        floatingLabelText="htmlを入力できます"
                    />
                    <RaisedButton primary label="更新" type="submit" />
                    <FlatButton onClick={() => { this.props.sectionActions.del({ index }) }} label="削除" />
                </div>
            )
        }
        return (
            <textbox onClick={() => { this.props.sectionActions.changeEditMode({ index }) }}>
                <div className="row" dangerouslySetInnerHTML={{ __html: content }} />
            </textbox>
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

EditContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'EditForm',
        validate,
        enableReinitialize: true,
    }),
)(EditContainer)

export default EditContainer;
