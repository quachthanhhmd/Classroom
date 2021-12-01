import { EditorState } from "draft-js";
import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.scss";


interface IPropsType {
    content: EditorState,
    setContent:  React.Dispatch<React.SetStateAction<EditorState>>;
}

const RichText = (props: IPropsType) => {
    const { content, setContent } = props;

    const uploadCallback = (file) => {
        return new Promise(
            (resolve, reject) => {
                if (file) {
                    let reader = new FileReader();
                    reader.onload = (e: any) => {
                        resolve({ data: { link: e.target.result } })
                    };
                    reader.readAsDataURL(file);
                }
            }
        );
    }

    return (
        <Editor
            editorState={content}
            onEditorStateChange={setContent}
            // editorClassName="editor-class"
            // toolbarClassName="toolbar-class"

            toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                image: {
                    uploadEnabled: true,
                    uploadCallback: uploadCallback,
                    previewImage: true,
                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                    alt: { present: false, mandatory: false },
                    defaultSize: {
                        height: 'auto',
                        width: '10rem',
                    },
                },
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },

                history: { inDropdown: true },

            }}
        />
    )
}

export default RichText;