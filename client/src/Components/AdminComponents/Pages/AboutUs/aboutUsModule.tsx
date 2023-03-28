import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../../Common/Layout/layout";
import axios from "../../../Common/SecureInstance/axiosInstance";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
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
type moduleDetail = {
    moduleName: String
    moduleId: Number
}
function AboutUsDynamic() {
    const [moduleDetails, setModuleDetails] = useState<moduleDetail>()
    const [editorContent, setEditorContent] = useState<string>('');
    let { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8080/aboutUs").then(response => {
            if (response.data == "Logout") {
                navigate("/admin")
            } else {
                console.log(response.data[0].Modules[`${id}`])
                setModuleDetails(response.data[0].Modules[`${id}`])
                setEditorContent(response.data[0].Modules[`${id}`].data)
            }
        }).catch(err => console.log(err))
    }, [])

    function handleUpdate() {
        const obj = {
            moduleId: moduleDetails?.moduleId,
            moduleName: `${moduleDetails?.moduleName}`,
            data: `${editorContent}`
        }
        console.log(obj, typeof moduleDetails?.moduleId)
        axios.post("http://localhost:8080/aboutUs/update", obj)
            .then(response => {
                if (response.data == "Logout") {
                    navigate("/admin")
                } else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))
    }


    const insertCustomDiv = () => {
    //     const divContent = prompt('Enter content for the div:');
    //     const div = document.createElement('div');
    //     div.innerHTML = divContent;
    //     document.execCommand('insertHTML', false, div.outerHTML);
    };

    return (
        <>
            <div className="mainDiv">
                <Layout title="About Us"></Layout>
            </div>
            <div className="contentDiv">
                <div className="headingAligned">
                    <h3 style={{ marginLeft: 460, marginTop: 20 }}>{moduleDetails ? moduleDetails.moduleName : " "}</h3>
                    <Button variant="primary" style={{ marginLeft: 430, marginTop: 20 }} onClick={() => handleUpdate()}>Update</Button>
                </div>
                <div style={{ marginLeft: 150, marginTop: 30 }}>
                    <FroalaEditor
                        tag='textarea'
                        model={editorContent}
                        onModelChange={(newContent: string) => setEditorContent(newContent)}
                        config={{
                            charCounterCount: true,
                            height: 400,
                            width: 980,
                            autoFocus: true,
                            pluginsEnabled: ['fontFamily', 'fontSize', 'colors', 'textColor', 'image', "getPDF", "codeView", "inlineStyle", "inlineClass", "link", "video", "emoticons", "wordPaste", "embedly", "fontAwesome", "draggable", "lists", "paragraphStyle", "paragraphFormat", "quote", "align", "insertHTMLButton", "table"],
                            toolbarButtons: ['customDiv', 'insertHTML', 'align', "quote", "draggable", "fontAwesome", "embedly", "wordPaste", "emoticons", "insertVideo", "insertLink", "inlineClass", "inlineStyle", "html", "getPDF", 'insertImage', 'backgroundColor', 'textColor', 'color', 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|', 'paragraphFormat', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertFile', 'insertTable', '|', 'specialCharacters', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo', 'trackChanges', 'markdown', "insertHR", 'uploadFile'],
                            toolbarCustomButtons: {
                                customDiv: {
                                    icon: 'insertDivIcon',
                                    title: 'Insert Custom Div',
                                    callback: insertCustomDiv,
                                },
                            },
                        }}
                    />
                    <div>
                        {/* <div dangerouslySetInnerHTML={{ __html: editorContent }}></div> */}

                        {/* {JSON.stringify(editorContent)} */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default AboutUsDynamic;