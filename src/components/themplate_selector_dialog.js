import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import htmlTemplates from '../html_templates';


const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

export default class TemplateSelectorDialog extends React.Component {
    state = {
        open: false,
    };

    props: {
        sectionActions: Obejct;
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <div className="download-hidden" style={{ textAlign: 'center' }}>
                    <RaisedButton primary label="テンプレートを追加" onTouchTap={this.handleOpen} />
                </div>
                <span className="download-hidden" />
                <Dialog
                    open={this.state.open}
                    modal={true}
                    title="利用したいテンプレートを選択してください"
                    actions={actions}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                >
                    {htmlTemplates.map((temp, i) => (
                        <div key={i}>
                        <ListItem
                            style={{ padding: '42px 0', position: 'relative' }}
                            onClick={() => {
                                this.handleClose();
                                this.props.sectionActions.selectTemplateSection({ index: i })
                            }}
                            primaryText={<div className="row" dangerouslySetInnerHTML={{ __html: temp }} />}
                        />
                        <Divider />
                        </div>
                    ))}
                </Dialog>
            </div>
        );
    }
}
