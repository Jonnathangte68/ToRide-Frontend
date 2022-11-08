import React from "react";
import { Dropdown } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";

interface OptionToggleProps {
    itemId: number;
    hideEdit?: boolean;
    hideActive?: boolean;
    hideDelete?: boolean;
    onDelete: any;
    onEdit: any;
};

// @ts-ignore
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
        // @ts-ignore
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    >
        <ThreeDots />
    </a>
));

const OptionsToggleHorizontal = (props: OptionToggleProps) => {
    return (
        <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>
  
      <Dropdown.Menu>
        {!props?.hideEdit && (<Dropdown.Item onClick={props?.onEdit}>Edit</Dropdown.Item>)}
        {!props?.hideActive && (<Dropdown.Item>Active</Dropdown.Item>)}
        {!props?.hideDelete && (<Dropdown.Item onClick={props?.onDelete}>Delete</Dropdown.Item>)}
      </Dropdown.Menu>
    </Dropdown>
    );
};

export default OptionsToggleHorizontal;