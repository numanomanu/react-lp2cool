// @flow
import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';


class EyeCatchInput extends Component {

    onChange = (e: any) :void => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            const reader = new FileReader();

            // サイズのバリデーションなどを行うため、redux-form の state に input で取得した file を保存
            this.props.input.onChange(file)
            reader.readAsDataURL(file);

            // Filereader の onloadend メソッドを使って、画像の読み込みが完了したら dataURL を作成する
            reader.onloadend = () => {
                // redux-form の バリデーションに通っていなければメソッドを呼ばない
                if (this.props.meta.valid) {
                    this.props.upload({ image: reader.result });
                }
            }
        }
    }

    props: {
        meta: Object; // redux-form
        input: Object;  // redux-form
        upload: Function;
    }

    render() {
        return (
            <div>
                <FlatButton label={'画像登録'} >
                    <input type="file" onChange={this.onChange} />
                </FlatButton>
            </div>
        )
    }
}

export default EyeCatchInput;
