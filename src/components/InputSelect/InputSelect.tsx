import { css } from "@emotion/css";
import { useState } from "react";
import { Dropdown, DropdownProps } from "react-bootstrap";

interface InputDropdownProps extends DropdownProps {
    dropdownTitle: string;
    onSelect: (string) => any;
    options: string[];
}

const InputDropdown = (props: InputDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState();

    const handleSelect = (e) => {
        setSelectedValue(e);
        props?.onSelect(e);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="">
                {props?.dropdownTitle}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {props.options && props.options?.map(
                    (option: string) => <Dropdown.Item
                        className={css`background-color: ${!!(option === selectedValue) ? "rgba(255,67,17,.15)" : "unset"};`}
                        eventKey={option}>{option}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default InputDropdown;
