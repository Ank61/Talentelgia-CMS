import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../../Common/Layout/layout";
import axios from "../../../Common/SecureInstance/axiosInstance";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import 'froala-editor/js/plugins/char_counter.min.js';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import Stack from 'react-bootstrap/Stack';
import toast, { Toaster ,useToasterStore } from 'react-hot-toast';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
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
import Modal from 'react-bootstrap/Modal';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';

type moduleDetail = {
    moduleName: String
    moduleId: Number
}
function AboutUsDynamic() {
    const [moduleDetails, setModuleDetails] = useState<moduleDetail>()
    const [editorContent, setEditorContent] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false)
    const [modalBackground , setModalBackground] = useState<boolean>(false)
    const [imageURL , setImageURL] = useState<string>("")
    const [textOverImage , setTextOverImage] = useState<string>("")
    let { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8080/aboutUs").then(response => {
            if (response.data == "Logout") {
                toast.error("Session expired")
                setTimeout(()=>{
                    navigate("/admin")
                },1000)
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
                    toast.error("Session expired")
                    setTimeout(()=>{
                        navigate("/admin")
                    },1000)
                } else {
                    toast.success("Updated Successfully")
                    console.log(response)
                }
            })
            .catch(err => console.log(err))
    }

    function handleButton() {
           setEditorContent((prev) => prev +
            "<span style='display: inline-block; text-align: center; width : 170px ; height : 40px ; background-color : #0957a6; border-radius : 15px ; color : white'>Type something</span>")
    }
    function handleTwoDiv() {
        //For two divs do not delete it
            setEditorContent((prev) => prev +
            "<div style='display : flex ; flex-direction: row;'><div style='width : 50% ;'>Hello</div><div style='width : 50% '>World</div></div>")
            setModal(false)
        }

    function handleThreeDiv() {
            setEditorContent((prev) => prev +
            "<div style='display : flex ; flex-direction: row;'><div style='width : 33% ;'>Hello</div><div style='width : 33% '>World</div><div style='width : 33% '>World</div></div>")
            setModal(false)
        }
    function handleDelete() {
        const obj = {
            moduleId: `${moduleDetails?.moduleId}`
        }
        axios.post("http://localhost:8080/aboutUs/delete", obj).then(response => console.log(response)).catch(err => console.log(err))
        navigate("/admin/aboutus")
        toast.error("Deleted successfully")
    }
    function handleBackground(){ 
        setModalBackground(true)
    }
    function handleBackgroundModal(){
        setEditorContent((prev) => prev +
        `<div style='position: relative;text-align: center;color: white;'><img src=${imageURL} style='width:100%'><div style='position: absolute;  top: 1px; left: 1px; width : 400px; height : 200px; background-color : #ffffff; color : #000000; word-wrap: break-word;'>${textOverImage}</div></div>`)
    setModalBackground(false)
    }
    return (
        <>
            <div className="mainDiv">
                <Layout title="About Us"></Layout>
                <Toaster/>
            </div>
            <div className="contentDiv">
                <div className="headingAligned">
                    <h3 style={{ marginLeft: 460, marginTop: 20 }}>{moduleDetails ? moduleDetails.moduleName : " "}</h3>
                </div>
                <Button variant="secondary" style={{ marginLeft: 8, marginTop: 4 ,background : "white" ,color : "black"}} onClick={() => setModal(true)}>Divide Module <ViewModuleIcon/></Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 ,background : "white" ,color : "black" }} onClick={() => handleButton()}>Background Color <FormatColorFillIcon/></Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 ,background : "white" ,color : "black"}} onClick={() => handleButton()}>Add Button <SmartButtonIcon/></Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 ,background : "white" ,color : "black"}} onClick={() => handleBackground()}>Background Image with Text<WallpaperIcon/></Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 ,background : "white" ,color : "black"}} onClick={() => handleUpdate()}>Align Items <AlignHorizontalCenterIcon/></Button>
                <Button variant="primary" style={{ marginLeft: 185 }} onClick={() => handleUpdate()}>Update</Button>
                <Button variant="danger" style={{ marginLeft: 15 }} onClick={() => handleDelete()}>Delete</Button>
                <div style={{ marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                    <FroalaEditor
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
                    <div>
                    </div>
                </div>
                {/*Modal for Div module */}
                <Modal
                    show={modal}
                    onHide={() => setModal(false)}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Select a Div for your Page</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stack gap={3} style={{ textAlign: "left" }}>
                            <div className="bg-light border stackedDiv"><CropSquareOutlinedIcon style={{fontSize : 50}} /> &nbsp; &nbsp; &nbsp;Full Width Module</div>
                            <div className="bg-light border stackedDiv"  onClick={() => handleThreeDiv()}><ViewWeekOutlinedIcon style={{fontSize : 50}}/> &nbsp; &nbsp; &nbsp; Divide the Module in three equal column</div>
                            <div className="bg-light border stackedDiv" onClick={() => handleTwoDiv()}><SplitscreenIcon className="rotate"  /> Divide the page into two equal column</div>
                            <div className="bg-light border stackedDiv" ><DashboardCustomizeIcon style={{fontSize : 30}}/> &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Customize my column</div>
                        </Stack>
                    </Modal.Body>
                </Modal>
                {/* Modal for Bakcground Image*/}
                <Modal
                    show={modalBackground}
                    onHide={() => setModalBackground(false)}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Upload Background Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stack gap={3} style={{ textAlign: "left" }}>
                            <label>URL : </label>
                            <input type="text" className="form-control" placeholder="Enter URL" onChange={(e)=>setImageURL(e.target.value)} value={imageURL}/>
                            <label>Text</label>
                            <textarea className="form-control" placeholder="Write something here!" value={textOverImage} onChange={(e)=>setTextOverImage(e.target.value)}/>
                            <div>Text Place: Top-Left (default) 
                            </div>
                            <button className="btn btn-primary" onClick={()=>handleBackgroundModal()}>Upload</button>
                        </Stack>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
export default AboutUsDynamic;