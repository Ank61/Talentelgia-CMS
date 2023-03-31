import { useState, useEffect, useRef } from 'react';
import Layout from "../../../Common/Layout/layout";
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/print.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/inline_class.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/third_party/font_awesome.min.js';
import 'froala-editor/js/third_party/font_awesome.min.js'
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/draggable.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { Button } from "react-bootstrap";
import axios from "../../../Common/SecureInstance/axiosInstance";
import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';

type moduleDetail = {
    moduleName: String
    moduleId: Number
}
function Header() {
    const editor = useRef(null);
    const navigate = useNavigate();
    const [moduleDetails, setModuleDetails] = useState<moduleDetail>()
    const [editorContent, setEditorContent] = useState<string>('');


    useEffect(() => {
        axios.get("http://localhost:8080/header").then(
            response => {
                setEditorContent(response.data[0].data)
            }
        ).catch(err => console.log(err))
    }, [])

    function handleUpdate() {
        const obj = {
            headerId: "1",
            data: `${editorContent}`
        }
        axios.post("http://localhost:8080/header/update", obj)
            .then(response => {
                if (response.data === "Logout") {
                    navigate("/admin")
                } else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))
    }
    function handleButton() {
         setEditorContent((prev)=>prev +
        "<span style='display: inline-block; text-align: center; width : 150px ; height : 30px ; background-color : #fb9502; border-radius : 15px ; color : white'>Get a Quote Now</span>")

    }
function handleDiv(){

     setEditorContent((prev)=>prev +
        "<div style='display : flex ; flex-direction: row;align-items: center; justify-content: center;'><div style='width : 50% '>Hello</div><div style='width : 50% ;height : 50px'>World</div></div>")
}


    return (
        <>
            <div className="mainDiv">
                <Layout title="Header" moduleName=""/>
            </div>
            <div className="contentDiv">
                <Button variant="secondary" style={{ marginLeft: 8, marginTop: 4 }} onClick={() => handleDiv()}>Add Div</Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 }} onClick={() => handleButton()}>Background Color</Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 }} onClick={() => handleUpdate()}>Add Button</Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 }} onClick={() => handleUpdate()}>Background Image</Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 }} onClick={() => handleUpdate()}>Align Items</Button>
                <Button variant="primary" style={{ marginLeft: 375 }} onClick={() => handleUpdate()}>Update</Button>
                <div style={{ marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                    <FroalaEditor
                        ref={editor}
                        tag='textarea'
                        model={editorContent}
                        onModelChange={(newContent: string) => setEditorContent(newContent)}
                        config={{
                            charCounterCount: true,
                            height: 400,
                            width: 1240,
                            autoFocus: true,
                            pluginsEnabled: ['fontFamily', 'fontSize', 'colors', 'textColor', 'image', "getPDF", "codeView", "inlineStyle", "inlineClass", "link", "video", "emoticons", "wordPaste", "embedly", "fontAwesome", "draggable", "lists", "paragraphStyle", "paragraphFormat", "quote", "align", "insertHTMLButton", "table"],
                            toolbarButtons: ['insertHTML', 'align', "quote", "draggable", "fontAwesome", "embedly", "wordPaste", "emoticons", "insertVideo", "insertLink", "inlineClass", "inlineStyle", "html", "getPDF", 'insertImage', 'backgroundColor', 'textColor', 'color', 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|', 'paragraphFormat', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertFile', 'insertTable', '|', 'specialCharacters', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo', 'trackChanges', 'markdown', "insertHR", 'uploadFile'],
                        }}
                    />
                </div>
                {JSON.stringify(editorContent)}
            </div>
        </>
    )
}
export default Header;