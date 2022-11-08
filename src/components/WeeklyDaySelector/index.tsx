import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import COLORS from "../../utils/colors";

const WeeklyDaySelector = (props: any) => {
    const [daySelection, setDaySelection] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });

    const handleSelection = (selectedDay) => {
        const dayListClone = {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        };
        const selectionState = !dayListClone[selectedDay];
        dayListClone[selectedDay] = selectionState;
        setDaySelection(dayListClone);
        return props?.onChange(dayListClone);
    };

    useEffect(() => {
        if (!!props?.selected) {
            const x = [
                "MO",
                "TU",
                "WE",
                "TH",
                "FR",
                "SA",
                "SU"
            ];
            const idx = x.findIndex(day => day === props?.selected);
            const sk = Object.keys(daySelection)[idx];
            const dayListClone = { ...daySelection };
            dayListClone[sk] = true;
            setDaySelection(dayListClone);
        }
    }, [daySelection, props?.selected]);
    

    return (
        <>
            <p style={{ textAlign: 'left' }}>
                SELECTED DAYS
            </p>
            <div className={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                margin-top: 2vh;
                padding-right: 10vh;
            `}>
                <div className={css`
                    cursor: pointer;
                    border: 1px solid #DCE3EA;
                    border-radius: 10px;
                    padding: 12px 12px 12px 12px;
                    ${(!!daySelection?.sunday) ? "background-color: "+COLORS.RED : ""};
                    ${(!!daySelection?.sunday) ? "color: "+COLORS.WHITE : ""};
                    ${(!!daySelection?.sunday) ? "font-weight: bold" : ""};
                    ${(!!daySelection?.sunday) ? "border: 1px solid "+COLORS.RED : ""};
                `} onClick={() => handleSelection("sunday")}>S</div>
                <div className={css`
                    cursor: pointer;
                    border: 1px solid #DCE3EA;
                    border-radius: 10px;
                    padding: 12px 12px 12px 12px;
                    ${(!!daySelection?.monday) ? "background-color: "+COLORS.RED : ""};
                    ${(!!daySelection?.monday) ? "color: "+COLORS.WHITE : ""};
                    ${(!!daySelection?.monday) ? "font-weight: bold" : ""};
                    ${(!!daySelection?.monday) ? "border: 1px solid "+COLORS.RED : ""};
                `} onClick={() => handleSelection("monday")}>M</div>
                <div className={css`
                    cursor: pointer;
                    border: 1px solid #DCE3EA;
                    border-radius: 10px;
                    padding: 12px 12px 12px 12px;
                    ${(!!daySelection?.tuesday) ? "background-color: "+COLORS.RED : ""};
                    ${(!!daySelection?.tuesday) ? "color: "+COLORS.WHITE : ""};
                    ${(!!daySelection?.tuesday) ? "font-weight: bold" : ""};
                    ${(!!daySelection?.tuesday) ? "border: 1px solid "+COLORS.RED : ""};
                `} onClick={() => handleSelection("tuesday")}>T</div>
                <div className={css`
                    cursor: pointer;
                    border: 1px solid #DCE3EA;
                    border-radius: 10px;
                    padding: 12px 12px 12px 12px;
                    ${(!!daySelection?.wednesday) ? "background-color: "+COLORS.RED : ""};
                    ${(!!daySelection?.wednesday) ? "color: "+COLORS.WHITE : ""};
                    ${(!!daySelection?.wednesday) ? "font-weight: bold" : ""};
                    ${(!!daySelection?.wednesday) ? "border: 1px solid "+COLORS.RED : ""};
                `} onClick={() => handleSelection("wednesday")}>W</div>
                <div className={css`
                    cursor: pointer;
                    border: 1px solid #DCE3EA;
                    border-radius: 10px;
                    padding: 12px 12px 12px 12px;
                    ${(!!daySelection?.thursday) ? "background-color: "+COLORS.RED : ""};
                    ${(!!daySelection?.thursday) ? "color: "+COLORS.WHITE : ""};
                    ${(!!daySelection?.thursday) ? "font-weight: bold" : ""};
                    ${(!!daySelection?.thursday) ? "border: 1px solid "+COLORS.RED : ""};
                `} onClick={() => handleSelection("thursday")}>T</div>
                <div className={css`
                    cursor: pointer;
                    border: 1px solid #DCE3EA;
                    border-radius: 10px;
                    padding: 12px 12px 12px 12px;
                    ${(!!daySelection?.friday) ? "background-color: "+COLORS.RED : ""};
                    ${(!!daySelection?.friday) ? "color: "+COLORS.WHITE : ""};
                    ${(!!daySelection?.friday) ? "font-weight: bold" : ""};
                    ${(!!daySelection?.friday) ? "border: 1px solid "+COLORS.RED : ""};
                `} onClick={() => handleSelection("friday")}>F</div>
                <div className={css`
                    cursor: pointer;
                    border: 1px solid #DCE3EA;
                    border-radius: 10px;
                    padding: 12px 12px 12px 12px;
                    ${(!!daySelection?.saturday) ? "background-color: "+COLORS.RED : ""};
                    ${(!!daySelection?.saturday) ? "color: "+COLORS.WHITE : ""};
                    ${(!!daySelection?.saturday) ? "font-weight: bold" : ""};
                    ${(!!daySelection?.saturday) ? "border: 1px solid "+COLORS.RED : ""};
                `} onClick={() => handleSelection("saturday")}>S</div>
            </div>
        </>
    );
};

export default WeeklyDaySelector;