import { MDBBtn } from "mdbreact";
import { CSSProperties } from "react";
import "./style.css";

type buttonColor = 
  | 'amber'
  | 'blue-grey'
  | 'blue'
  | 'brown'
  | 'cyan'
  | 'danger'
  | 'dark-green'
  | 'dark'
  | 'deep-orange'
  | 'deep-purple'
  | 'default'
  | 'elegant'
  | 'green'
  | 'grey'
  | 'indigo'
  | 'info'
  | 'light-blue'
  | 'light-green'
  | 'light'
  | 'lime'
  | 'mdb-color'
  | 'orange'
  | 'pink'
  | 'primary'
  | 'purple'
  | 'secondary'
  | 'success'
  | 'unique'
  | 'warning'
  | 'red'
  | 'yellow';

interface TextInputProps {
  placeholder?: string;
  class?: string;
  value?: string;
  name: string;
  title: string;
  color: buttonColor;
  containerStyle?: CSSProperties;
  preIcon?: JSX.Element;
  postIcon?: JSX.Element;
  onClick?: any;
}

const InputButton2 = (props: TextInputProps) => {
    return (
      <MDBBtn className={props?.class} color={props.color} onClick={props?.onClick}>
        {props?.preIcon && props.preIcon}
        {props.title}
        {props?.postIcon && props.postIcon}
      </MDBBtn>
    );
};

export default InputButton2;
