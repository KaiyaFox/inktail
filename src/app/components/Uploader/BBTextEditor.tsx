import React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import html2bbcode from 'html2bbcode';

class BBCodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    getBBCode = () => {
        const html = draftToHtml(
            convertToRaw(this.state.editorState.getCurrentContent())
        );
        const bbcode = html2bbcode(html);
        return bbcode;
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                />
                <button onClick={() => console.log(this.getBBCode())}>
                    Log BBCode
                </button>
            </div>
        );
    }
}

export default BBCodeEditor;