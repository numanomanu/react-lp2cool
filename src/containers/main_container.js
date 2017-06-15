// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    arrayMove,
    SortableElement,
    SortableContainer,
} from 'react-sortable-hoc';
import * as sectionActions from '../actions/section';
import Editcontainer from './edit_container';
import EyeCatchContainer from './eye_catch_container';
import TemplateSelectorDialog from '../components/themplate_selector_dialog';

function mapStateToProps(state: Object): Object {
    return {
        sectionList: state.sectionList.data,
    };
}

function mapDispatchToProps(dispatch: Function): Object {
    return {
        sectionActions: bindActionCreators(sectionActions, dispatch),
    };
}

const SortableItem = SortableElement(({ component }) => {
    return component;
});

const SortableList = SortableContainer(({ items }) => {
    return (
    <div>
        {items.map((section, i) => (
            <SortableItem
                key={`item-${i}`}
                index={i}
                component={
                    <Editcontainer
                        key={i}
                        index={i}
                        content={section.content}
                        editFlag={section.editFlag}
                    />
                }
            />
        ))}
    </div>
    );
});

class MainContainer extends Component {
    onSortEnd = ({ oldIndex, newIndex }) => {
        const { sectionList } = this.props;
        const updateList = arrayMove(sectionList, oldIndex, newIndex)
        this.props.sectionActions.sort({ updateList, newIndex })
    };

    props: {
        sectionList: any;
        sectionActions: any;
    };


    render() {
        const { sectionList } = this.props;
        return (
            <div>
                <EyeCatchContainer />
                <div className="container-fluid">
                    <SortableList
                         items={sectionList}
                         onSortEnd={this.onSortEnd}
                         useDragHandle={true}
                    />
                    <TemplateSelectorDialog sectionActions={this.props.sectionActions} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
