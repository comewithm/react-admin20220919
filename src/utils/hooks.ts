import React, { useState } from "react";

interface ITurn {
    turnOn: () => void
    turnOff: () => void
    setSwitcher: React.Dispatch<React.SetStateAction<boolean>>
}

export const useSwitch = (init: boolean = false):[boolean, ITurn] => {
    const [switcher, setSwitcher] = useState(init)
    const turnOn = () => setSwitcher(true)
    const turnOff = () => setSwitcher(false)

    return [
        switcher,
        {
            turnOn,
            turnOff,
            setSwitcher
        }
    ]
}