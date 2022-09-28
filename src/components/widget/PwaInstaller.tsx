import React, {useEffect, useState} from "react"


export const PwaInstaller = () => {
    const [installed, setInstall] = useState(true)

    const [deferredPrompt, setDeferredPrompt] = useState<any>()


    useEffect(() => {
        window.addEventListener('beforeinstallprompt', beforeInstallPrompt)

        return () => {
            window.removeEventListener('beforeinstallprompt', beforeInstallPrompt)
        }
    })

    const beforeInstallPrompt = (e:Event) => {
        console.log('beforeInstallPrompt...')
        // 未安装wpa
        setInstall(false)

        e.preventDefault()
        setDeferredPrompt(e)

        return false
    }

    const download = () => {
        if(deferredPrompt !== 'undefined') {
            // The user has had a postive interaction with our app and Chrome
            // has tried to prompt previously, so let's show the prompt.
            deferredPrompt.prompt()
            // Follow what the user has done with the prompt.
            deferredPrompt.userChoice.then((choiceResult: any) => {
                console.log('choiceResult', choiceResult)
                if(choiceResult.outcome === 'dismissed') {
                    console.log('User cancelled home screen install')
                } else {
                    console.log('User added to home screen');
                }
                setDeferredPrompt(null)
            })

        }
    }

    return (
        !installed 
        ?
        <div 
            className="installer"
            onClick={download}
        >
            <div className="installer__btn" />
        </div>
        :
        null
    )
}