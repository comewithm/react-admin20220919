import React,{useState} from "react"
import {SettingOutlined} from '@ant-design/icons'
import {SketchPicker} from 'react-color'

const BACKGROUND_COLOR = '#313653'

export const ThemePicker = () => {

    const [switcherOn, setSwitcherOn] = useState(false)
    const [background, setBackground] = useState(localStorage.getItem('@primary-color') || BACKGROUND_COLOR)

    const handleChangeComplete = (color:any) => {
        console.log('color===>>>',color)
        setBackground(color.hex)
        localStorage.setItem('@primary-color', color.hex)
    }

    const handleSwitcherOn = () => {
        setSwitcherOn(!switcherOn)
    }

    return (
        <div className="switcher">
            <span 
                className="sw-btn dark-white"
                onClick={handleSwitcherOn}
            >
                <SettingOutlined className="text-dark" type="setting" />
            </span>
            <div className="clear p-2.5">
                <SketchPicker
                    color={background} 
                    onChangeComplete={handleChangeComplete}
                />
            </div>
        </div>
    )
}