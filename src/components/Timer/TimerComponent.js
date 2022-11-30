import Timer from "./Timer";
import Settings from "./Settings";
import {memo, useState} from "react";
import SettingsContext from "./SettingsContext";

const TimerComponent = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(45);
    const [breakMinutes, setBreakMinutes] = useState(15);

    return (
        <>
            <SettingsContext.Provider value={{
                showSettings,
                setShowSettings,
                workMinutes,
                breakMinutes,
                setWorkMinutes,
                setBreakMinutes,
            }}>
                {showSettings ? <Settings/> : <Timer/>}
            </SettingsContext.Provider>
        </>
    );
};
const memoizedTimer = memo(TimerComponent)
export default memoizedTimer;