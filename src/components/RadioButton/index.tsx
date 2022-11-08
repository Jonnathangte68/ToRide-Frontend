const RadioButton = (props: any) => {
    if (!!props?.selected) {
        return (
            <img 
                alt="radio button selected"
                src="../assets/img/selected-radio-button-to-ride-item.png"
                className={props?.class}
            />
        );
    }
    return (
        <img 
            alt="radio button selected"
            src="../assets/img/unselected-radio-button-to-ride-style.png"
            className={props?.class}
        />
    );
}

export default RadioButton;
