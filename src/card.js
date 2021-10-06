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
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            tab: "settings",
            editable: false,
            ...this.props.data
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
        }
        if(oldEL !== el){
            el.classList.add("card-div-edit")
            el.classList.remove("card-div")
        }

        this.setState({ editable: !this.state.editable })
        // open modal for color & text editor
        // color & text editor should edit the props
    }
    changeTab = (e) =>{
        console.log(e.target.name)

        this.setState({ tab: e.target.name })
    }
    edit = (e) =>{
        console.log(e)
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
            default:
                console.log("shouldn't be here :/")
        }
    }
    render() {
        return <div className="card-div" style={{order: this.state.key}} id={this.state.key}>
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
            {this.state.editable && (                <div className="editModal" id={"edit-"+this.state.key} >
                    <div className="tabs">
                        <div className="edit-settings" name="settings" id={"edit-settings-" + this.state.key}onClick={() => this.changeTab}>
                            {this.state.tab === "settings"?
                                <img src={settings} className="selected"  alt="settings"/>
                                :<img src={settingsS}  alt="settings"/>
                            }
                        </div>
                        <div className="edit-style" name="style" id={"edit-style-" + this.state.key} onClick={() => this.changeTab}>
                            {this.state.tab === "settings"?
                                <img src={style} alt="style"/>
                                :<img src={styleS} className="selected"  alt="style"/>}

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

                        </div>
                    }

                </div>
            )}
        </div>
    }
}


export default Card;
