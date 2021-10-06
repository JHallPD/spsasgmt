import React from "react";
import './App.css';
import edit from "./edit.svg";
import copy from './copy.svg';
import deleteW from './deleteW.svg';
import deleteB from './deleteB.svg';
import settings from './Settings.svg';
import style from './Style.svg';
import settingsS from './Settings (1).svg';
import styleS from './Style (1).svg';
import { BlockPicker  } from 'react-color';



class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            tab: "settings",
            editable: false,
            titleColorOpen: false,
            bodyColorOpen: false,
            panelColorOpen: false,
            ...this.props.data,
        };
    }
    // copy card
    copy = () => {
        this.props.copyCard(this.props.data)
    }
    // delete card
    delete = () => {
        this.props.deleteCard(this.props.data.key)
    }
    // open edit modal
    openEdit = () => {
        let oldEL = document.getElementsByClassName("card-div-edit")[0]
        let el = document.getElementById(this.props.data.key)

        if(oldEL){
            oldEL.classList.add("card-div")
            oldEL.classList.remove("card-div-edit")
            oldEL.childNodes[2].setAttribute("style", "visibility: hidden")
        }
        if(oldEL !== el){
            el.classList.add("card-div-edit")
            el.classList.remove("card-div")
        }

        this.setState({ editable: !this.state.editable })
        // open modal for color & text editor
        // color & text editor should edit the props
    }
    //change tab toggle
    changeTab = (e) =>{
        this.setState({ tab: e.target.name })
    }

    openColorPicker = (name) =>{

        this.setState((prev) => ({ [name]: !prev[name] }));
        switch (name) {
            case "titleColorOpen":
                this.setState({
                    titleColorOpen: !this.state.titleColorOpen,
                    bodyColorOpen: false,
                    panelColorOpen: false, })
                break
            case "bodyColorOpen":
                this.setState({
                    titleColorOpen: false,
                    bodyColorOpen: !this.state.bodyColorOpen,
                    panelColorOpen: false, })
                break
            case "panelColorOpen":
                this.setState({
                    titleColorOpen: false,
                    bodyColorOpen: false,
                    panelColorOpen: !this.state.panelColorOpen, })
                break
            default:
                console.log("shouldn't be here :/")
                this.setState({
                    titleColorOpen: false,
                    bodyColorOpen: false,
                    panelColorOpen: false, })
        }
    }

    // edit logic to handle changing data
    edit = (e) =>{
        switch (e.target.name) {
            case "title":
                this.setState({ title: e.target.value })
                break
            case "body":
                this.setState({ text: e.target.value })
                break
            case "titleColor":
                this.setState({ titleColor: e.target.value })
                break
            case "titleSize":
                this.setState({ titleSize: e.target.value })
                break
            case "bodyColor":
                this.setState({ bodyColor: e.target.value })
                break
            case "bodySize":
                this.setState({ bodySize: e.target.value })
                break
            case "cornerRadius":
                this.setState({cornerRadius: e.target.value})
                break
            default:
                console.log("shouldn't be here :/")
        }
    }
    changeColor = (color) =>{
        console.log(color)
        switch (true) {
            case this.state.panelColorOpen:
                this.setState({ color: color.hex })
                break
            case this.state.titleColorOpen:
                this.setState({ titleColor: color.hex })
                break
            case this.state.bodyColorOpen:
                this.setState({ bodyColor: color.hex })
                break
            default:
                console.log("shouldn't be here :/")
        }
    }
    render() {
        return <div className="card-div" style={{order: this.state.key, backgroundColor: this.state.color, borderRadius: this.state.cornerRadius}} id={this.state.key}>
            <div className="card-title-box">
                <p className="card-title" style={{color: this.state.titleColor, fontSize:this.state.titleSize}}>{this.state.title}</p>
                <img src={edit} className="card-edit" alt="edit" onClick={this.openEdit}/>
                <img src={copy} className="card-copy" alt="copy" onClick={this.copy}/>
                {this.props.lastCard?
                    <img src={deleteW} className="card-delete-blank" alt="delete" onClick={null}/>
                    :
                    <img src={deleteB} className="card-delete" alt="delete" onClick={this.delete}/>}
            </div>
            <div className="card-body" >
                <p className="card-text" style={{color: this.state.bodyColor, fontSize:this.state.bodySize}}>{this.state.text}</p>
            </div>
            <div className="editModal" id={"edit-"+this.state.key} style={{visibility: this.state.editable?"visible":"hidden"}}>
                <div className="tabs" >
                    <div className="edit-settings" name="settings" onClick={this.changeTab}>
                        {this.state.tab === "settings"?
                            <img src={settings} className="selected"  name="settings" alt="settings"/>
                            :<img src={settingsS}  alt="settings" name="settings"/>
                        }
                    </div>
                    <div className="edit-style" name="style" onClick={this.changeTab}>
                        {this.state.tab === "settings"?
                            <img src={style} alt="style" name="style"/>
                            :<img src={styleS} className="selected" name="style" alt="style"/>}

                    </div>
                </div>
                {this.state.tab === "settings"?
                    <div className="content">
                        <div className="title-box">
                            <label className="title">
                                <p className="title-text">Title Text</p>
                                <input type="text" name="title" className="title-input" onChange={this.edit} placeholder={"Enter custom title"}/>
                            </label>
                        </div>
                        <div className="text-box">
                            <label className="text">
                                <p className='text-text'>Body Text</p>
                                <input type="text" name="body" className="text-input" onChange={this.edit} placeholder={"Enter custom text"}/>
                            </label>
                        </div>

                    </div>:
                    <div className="content">
                        <p className="picker-title">Title</p>
                        <div className="title-picker">
                            <div className="title-size">
                                <label>Size</label>
                                <input type="text" name="titleSize" onChange={this.edit} value={this.state.titleSize} data-placeholder="/px"/>
                            </div>
                            <div className="title-color">
                                <label>Color</label>
                                <div style={{backgroundColor:this.state.titleColor}} onClick={() => this.openColorPicker('titleColorOpen')} className="colorBox"/>
                                {this.state.titleColorOpen?
                                <BlockPicker color={this.state.titleColor} onChangeComplete={this.changeColor}/>
                                :null}
                            </div>
                        </div>
                        <p className="picker-body">Body</p>
                        <div className="body-picker">
                            <div className="body-size">
                                <label>Size</label>
                                <input type="text" name="bodySize" onChange={this.edit} value={this.state.bodySize} data-placeholder="/px"/>
                            </div>
                            <div className="body-color">
                                <label>Color</label>
                                <div style={{backgroundColor:this.state.bodyColor}} onClick={() => this.openColorPicker('bodyColorOpen')} className="colorBox"/>
                                {this.state.bodyColorOpen?
                                    <BlockPicker color={this.state.bodyColor} onChangeComplete={this.changeColor}/>
                                    :null}
                            </div>
                        </div>
                        <p className="picker-panel">Panel</p>
                        <div className="panel-picker">
                            <div className="panel-size">
                                <label>Corner Radius</label>
                                <input type="text" name="cornerRadius" onChange={this.edit} value={this.state.cornerRadius} data-placeholder="/px"/>
                            </div>
                            <div className="panel-color">
                                <label>Color</label>
                                <div style={{backgroundColor:this.state.color}} onClick={() => this.openColorPicker('panelColorOpen')} className="colorBox"/>
                                {this.state.panelColorOpen?
                                    <BlockPicker color={this.state.color} onChangeComplete={this.changeColor}/>
                                    :null}
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    }
}


export default Card;
