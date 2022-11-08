import styled from "@emotion/styled";
import { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const WYSIWYGContainer = styled.div`
        border: 1px solid #F3F3F3 !important;
        border-radius: 6px;
    `;
  
export default class WYSIWYGEditor extends Component {
    constructor(props) {
      super(props)

      if (props.defautContent) {
        console.log("wysiwyg editor loaded default content.");
        console.log(props.defautContent);
        this.state = {
            contentState : htmlToDraft(props.defautContent)
          }
          setTimeout(() => {
              if (document.querySelector(".public-DraftStyleDefault-block > span") && props.defautContent) {
                document.querySelector(".public-DraftStyleDefault-block > span").innerHTML = props.defautContent;
              }
          }, 2000);
      } else {
        this.state = {
            contentState : {
                entityMap: {},
                blocks: [
                  {
                    key: "637gr",
                    text: "",
                    type: "unstyled",
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
            }
        }
      }
    }
  
    onContentStateChange = contentState => {
     console.log('as HTML:', draftToHtml(contentState));
     this.setState({ contentState});
        // @ts-ignore
     this.props.onContentChange(draftToHtml(contentState));
     document.getElementById("htmlAboutContent").innerHTML = draftToHtml(contentState);
    }
  
    render() {
     // @ts-ignore
     const { contentState } = this.state

     return (
         <WYSIWYGContainer>
             <Editor
                //  @ts-ignore
                initialContentState={this.state.content}
                // @ts-ignore
                editorContent={contentState}
                onContentStateChange={this.onContentStateChange}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
            />
            <input type="hidden" id="htmlAboutContent" />
         </WYSIWYGContainer>
    )
   }
}
