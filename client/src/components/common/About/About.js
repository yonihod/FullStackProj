import React, {Component} from 'react'
import "./About.css";
import Map from "../Map/Map";

export default class about extends Component {
    render() {
        return (
            <div>
                <p className="title">Welcome To DEVELOPI!</p>
                <p className="body_text">
                    Our product is a combination of existing solutions, focusing on one niche so it would be more
                    suitable for developers and answer their needs.
                    The existing solutions that correspond with our product are mainly :
                    Fiverr and Stackoverflow.
                </p>
                <p className="title">The Map!</p>
                <Map/>
            </div>
        )
    }
}
