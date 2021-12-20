import SyncLoader from "react-spinners/SyncLoader";
import React, {Component} from "react";
import {css} from "@emotion/core";


const override = css`
    padding-left: 500px;
    font-size: 24px;
    border-radius: 4px;
`;
export default class ReloadHelper extends Component {
    constructor(props) {
        super(props);


}
    render(){

        return (
            <div>

                  <SyncLoader
                    css={override}
                    size={15}
                    color={"#50E3C2"}
                    loading={this.props.loading}
                    
                />
                
            </div>

              
           


        );
    }


}
