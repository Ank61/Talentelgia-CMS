import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../../Common/Layout/layout";
import axios from "../../../Common/SecureInstance/axiosInstance";
import { useNavigate } from "react-router";
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import 'froala-editor/js/plugins/char_counter.min.js';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import Stack from 'react-bootstrap/Stack';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
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
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl, { formControlClasses } from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';
import { CloseButton } from 'react-bootstrap';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CircleIcon from '@mui/icons-material/Circle';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

type moduleDetail = {
    moduleName: String
    moduleId: Number
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function AboutUsDynamic() {
    const [moduleDetails, setModuleDetails] = useState<moduleDetail>()
    const [data , setData] = useState<number>()
    const [editorContent, setEditorContent] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false)
    const [modalBackground, setModalBackground] = useState<boolean>(false)
    const [imageURL, setImageURL] = useState<string>("")
    const [textOverImage, setTextOverImage] = useState<string>("")
    let { id } = useParams();
    //For add button
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setModal(true)
    };
    //For Modal tab
const [value, setValue] = React.useState(0);
const [customization , setCustomization] = useState<boolean>(false)
const [codeSelected , setCodeSelected] = useState<boolean>(false)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    //For Grid view
    const [spacing, setSpacing] = React.useState(2);
    const handleChangeGrid = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpacing(Number((event.target as HTMLInputElement).value));
    };

    //For Bottom Navigation
    const [valueBottom, setValueBottom] = React.useState<number>(0);
    function handleBottomNavigation(event: React.MouseEvent<HTMLButtonElement>) {
        debugger
        console.log(valueBottom)
    }






    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8080/aboutUs").then(response => {
            if (response.data == "Logout") {
                toast.error("Session expired")
                setTimeout(() => {
                    navigate("/admin")
                }, 1000)
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
                    setTimeout(() => {
                        navigate("/admin")
                    }, 1000)
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
    function handleBackground() {
        setModalBackground(true)
    }
    function handleBackgroundModal() {
        setEditorContent((prev) => prev +
            `<div style='position: relative;text-align: center;color: white;'><img src=${imageURL} style='width:100%'><div style='position: absolute;  top: 1px; left: 1px; width : 400px; height : 200px; background-color : #ffffff; color : #000000; word-wrap: break-word;'>${textOverImage}</div></div>`)
        setModalBackground(false)
    }
    return (
        <>
            <div className="mainDiv">
                <Layout title="About Us" moduleName={moduleDetails ? moduleDetails.moduleName : " "}></Layout>
                <Toaster />
            </div>
            <div className='mainContentDiv'>
                <div className="contentDiv">
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        > <button className="addButton"><AddIcon /></button></Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem style={{ fontSize: 14 }} onClick={handleClose}> <ViewModuleIcon style={{ marginRight: 20, fontSize: 29 }} /> Divide Module
                            </MenuItem>
                            <MenuItem onClick={handleClose} style={{ fontSize: 14 }}><SmartButtonIcon style={{ marginRight: 20, fontSize: 31 }} /> Button</MenuItem>
                            <MenuItem onClick={handleClose} style={{ fontSize: 14 }}><WallpaperIcon style={{ marginRight: 20, fontSize: 26 }} />   Background Image</MenuItem>
                            <MenuItem onClick={handleClose} style={{ fontSize: 14 }}><AlignHorizontalCenterIcon style={{ marginRight: 20, fontSize: 28 }} /> Align Item</MenuItem>
                            <MenuItem onClick={handleClose} style={{ fontSize: 14 }}><FormatColorFillIcon style={{ marginRight: 20, fontSize: 27 }} /> Background Color</MenuItem>
                        </Menu>
                    </div>
                    {/* <Button variant="secondary" style={{ marginLeft: 8, marginTop: 4 ,background : "white" ,color : "black"}} onClick={() => setModal(true)}>Divide Module <ViewModuleIcon/></Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 ,background : "white" ,color : "black" }} onClick={() => handleButton()}>Background Color <FormatColorFillIcon/></Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 ,background : "white" ,color : "black"}} onClick={() => handleButton()}>Add Button <SmartButtonIcon/></Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 ,background : "white" ,color : "black"}} onClick={() => handleBackground()}>Background Image with Text<WallpaperIcon/></Button>
                <Button variant="secondary" style={{ marginLeft: 5, marginTop: 4 ,background : "white" ,color : "black"}} onClick={() => handleUpdate()}>Align Items <AlignHorizontalCenterIcon/></Button> */}
                    <div >
                        <button className="updateButton" ><VisibilityIcon /> Preview</button>
                        <button className="updateButton" onClick={() => handleUpdate()}><SendIcon /> Update</button>
                        <button className="updateButton" onClick={() => handleDelete()}><DeleteIcon /></button>
                    </div>
                </div>
                <div style={{ marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                    <FroalaEditor
                        tag='textarea'
                        model={editorContent}
                        onModelChange={(newContent: string) => setEditorContent(newContent)}
                        config={{
                            charCounterCount: true,
                            height: 460,
                            width: '100%',
                            autoFocus: true,
                            pluginsEnabled: ['fontFamily', 'fontSize', 'colors', 'textColor', 'image', "getPDF", "codeView", "inlineStyle", "inlineClass", "link", "video", "emoticons", "wordPaste", "embedly", "fontAwesome", "draggable", "lists", "paragraphStyle", "paragraphFormat", "quote", "align", "insertHTMLButton", "table"],
                            toolbarButtons: ['insertHTML', 'align', "quote", "draggable", "fontAwesome", "embedly", "wordPaste", "emoticons", "insertVideo", "insertLink", "inlineClass", "inlineStyle", "html", "getPDF", 'insertImage', 'backgroundColor', 'textColor', 'color', 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', 'paragraphFormat', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'insertFile', 'insertTable', 'specialCharacters', 'selectAll', 'clearFormatting', 'print', 'help', 'html', 'undo', 'redo', 'trackChanges', 'markdown', "insertHR", 'uploadFile'],
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
                    {/* <Modal.Header closeButton> */}
                    {/* <Modal.Title>
                            {/* <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <Tabs value={value} onChange={handleChange} centered>
                                    <Tab label="Select Column Type" />
                                    <Tab label="Customize " />
                                    <Tab label="Code" />
                                </Tabs>
                            </Box> */}
                    {/* </Modal.Title>  */}
                    {/* </Modal.Header> */}
                    <Modal.Body style={{ overflow: 'auto' }} >
                        {/* <Box> */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Select Column Type" {...a11yProps(0)} onClick={()=>{setCustomization(false);setCodeSelected(false)}} />
                                <Tab label="Customize" {...a11yProps(1)} onClick={()=>{setCustomization(true);setCodeSelected(false)}}/>
                                <Tab label="Code" {...a11yProps(2)}  onClick={()=>{setCodeSelected(true);setCustomization(false)}}/>
                                <Tab label={<ClearIcon onClick={() => setModal(false)}  />}></Tab>
                            </Tabs>
                        </Box>
                      {!customization && !codeSelected && valueBottom!==1? 
                      <> 
                            <div className="wrapper section">
                            <div className="first"><CropSquareOutlinedIcon style={{fontSize:31}} className='divisionModule'/>  Make Full width Column</div>
                            <div className="first"><SplitscreenIcon style={{fontSize:31}} className='divisionModule'/>  Divide into Two Column</div>
                          </div>
                          <div className='wrapper'>
                            <div className="first"  onClick={()=>{setData(3) ;setValueBottom(1)}}> <ViewWeekOutlinedIcon style={{fontSize:31}} className='divisionModule'/>  Divide into Three Column</div>
                            <div className="first"><CalendarViewWeekIcon style={{fontSize:31}} className='divisionModule'/>  Divide  into Four Column</div>
                          </div>
                          <div className='wrapper'>
                            <div className="first"> <TableChartOutlinedIcon style={{fontSize:31}} className='divisionModule'/> Grid of 1 row & 3 column</div>
                            <div className="first"><ViewComfyOutlinedIcon style={{fontSize:31}} className='divisionModule'/> Grid of 1 row & 2 column</div>
                          </div>
                          <div className='wrapper'>
                            <div className="first"> <ViewQuiltOutlinedIcon style={{fontSize:31}} className='divisionModule'/> Grid of 1 row & 3 colum</div>
                            <div className="first"><GridViewOutlinedIcon style={{fontSize:31}} className='divisionModule'/>  Grid of Four row</div>
                          </div>
                          <Box sx={{ width: 'auto' }}>
                                <BottomNavigation
                                    showLabels
                                    value={valueBottom}
                                    onChange={(event, newValue) => {
                                        setValueBottom(newValue);
                                    }}
                                >
                                    <BottomNavigationAction label={<CircleIcon style={{fontSize :10}}/>} onClick={(event) => handleBottomNavigation(event)} />
                                    <BottomNavigationAction label={<CircleIcon style={{fontSize :10}}/>} onClick={(event) => handleBottomNavigation(event)} />
                                    <BottomNavigationAction label={<CircleIcon style={{fontSize :10}}/>} onClick={(event) => handleBottomNavigation(event)} />
                                </BottomNavigation>
                            </Box>
                          </>
                                : ""}
                           {valueBottom===1 ? 
                           <TabPanel value={value} index={0}>
                                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                                    <Grid item xs={12} style={{ marginTop: 14 }}>
                                        <Grid container justifyContent="center" spacing={spacing} style={{ border: '1px solid #ededed', marginLeft: 2, width: '100%', backgroundColor: '#ededed' }}>
                                            {[0, 1, 2].map((value) => (
                                                <Grid key={value} item>
                                                    <Paper
                                                        sx={{
                                                            height: 130,
                                                            width: 80,
                                                            border: '1px solid #77aadc',
                                                            backgroundColor: (theme) =>
                                                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                                        }}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper sx={{ p: 2 }}>
                                            <Grid container style={{ height: 60 }}>
                                                <Grid item>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">Select Spacing</FormLabel>
                                                        <RadioGroup
                                                            name="spacing"
                                                            aria-label="spacing"
                                                            value={spacing.toString()}
                                                            onChange={handleChangeGrid}
                                                            row

                                                        >
                                                            {[0, 1, 2, 3, 4,].map((value) => (  // removed 0.5,8 and 12
                                                                <FormControlLabel
                                                                    key={value}
                                                                    value={value.toString()}
                                                                    control={<Radio />}
                                                                    label={value.toString()}
                                                                    style={{ height: 20, width: 40, marginLeft: 3 }}
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    </Grid>
                                    <Box sx={{ width: 'auto' }}>
                                <BottomNavigation
                                    showLabels
                                    value={valueBottom}
                                    onChange={(event, newValue) => {
                                        setValueBottom(newValue);
                                    }}
                                >
                                    <BottomNavigationAction label={<CircleIcon style={{fontSize :10}}/>} onClick={(event) => handleBottomNavigation(event)} />
                                    <BottomNavigationAction label={<CircleIcon style={{fontSize :10}}/>} onClick={(event) => handleBottomNavigation(event)} />
                                    <BottomNavigationAction label={<CircleIcon style={{fontSize :10}}/>} onClick={(event) => handleBottomNavigation(event)} />
                                </BottomNavigation>
                            </Box>
                            </TabPanel>
                                : ""}
                        {/* </> */}
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                        {/* </Box> */}
                        {/* <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                            <Grid item xs={12} style={{ marginTop: 40, marginBottom: 40 }}>
                                <Grid container justifyContent="center" spacing={spacing} style={{ border: '1px solid #ededed', marginLeft: 2, width: '100%', backgroundColor: '#ededed' }}>
                                    {[0, 1, 2].map((value) => (
                                        <Grid key={value} item>
                                            <Paper
                                                sx={{
                                                    height: 130,
                                                    width: 80,
                                                    backgroundColor: (theme) =>
                                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2 }}>
                                    <Grid container style={{ height: 60 }}>
                                        <Grid item>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Select Spacing</FormLabel>
                                                <RadioGroup
                                                    name="spacing"
                                                    aria-label="spacing"
                                                    value={spacing.toString()}
                                                    onChange={handleChangeGrid}
                                                    row

                                                >
                                                    {[0, 1, 2, 3, 4, 8].map((value) => (  // removed 0.5 and 12
                                                        <FormControlLabel
                                                            key={value}
                                                            value={value.toString()}
                                                            control={<Radio />}
                                                            label={value.toString()}
                                                            style={{ height: 20, width: 40, marginLeft: 3 }}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid> */}
                        {/* <Stack gap={3} style={{ textAlign: "left" }}>
                            <div className="bg-light border stackedDiv"><CropSquareOutlinedIcon style={{ fontSize: 50 }} /> &nbsp; &nbsp; &nbsp;Full Width Module</div>
                            <div className="bg-light border stackedDiv" onClick={() => handleThreeDiv()}><ViewWeekOutlinedIcon style={{ fontSize: 50 }} /> &nbsp; &nbsp; &nbsp; Divide the Module in three equal column</div>
                            <div className="bg-light border stackedDiv" onClick={() => handleTwoDiv()}><SplitscreenIcon className="rotate" /> Divide the page into two equal column</div>
                            <div className="bg-light border stackedDiv" ><DashboardCustomizeIcon style={{ fontSize: 30 }} /> &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Customize my column</div>
                        </Stack> */}
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
                            <input type="text" className="form-control" placeholder="Enter URL" onChange={(e) => setImageURL(e.target.value)} value={imageURL} />
                            <label>Text</label>
                            <textarea className="form-control" placeholder="Write something here!" value={textOverImage} onChange={(e) => setTextOverImage(e.target.value)} />
                            <div>Text Place: Top-Left (default)
                            </div>
                            <button className="btn btn-primary" onClick={() => handleBackgroundModal()}>Upload</button>
                        </Stack>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
export default AboutUsDynamic;