import React from "react";
import { Dropdown } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

interface OptionToggleProps {
    itemId: number;
    onDelete: any;
    onEdit: any;
    isStatusOptionVisible?: boolean;
    onStatusChange?: any;
    status?: string;
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
        <ThreeDotsVertical />
    </a>
));

const OptionsToggle = (props: OptionToggleProps) => {
    return (
        <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>
  
      <Dropdown.Menu>
        <Dropdown.Item onClick={props?.onEdit}>Edit</Dropdown.Item>
        {!!props?.isStatusOptionVisible && <Dropdown.Item onClick={props?.onStatusChange}>{props?.status}</Dropdown.Item>}
        <Dropdown.Item onClick={props?.onDelete}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    );
};

export default OptionsToggle;