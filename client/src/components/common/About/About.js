import React, {Component} from 'react'
import "./About.css";
import Map from "../Map/Map";

export default class about extends Component {
    render() {
        return (
            <div className={"about"}>
                <section>
                    <h1 className="title m-4">Welcome To DEVELOPI!</h1>
                    <p className="body_text">
                        Our product is a combination of existing solutions, focusing on one niche so it would be more
                        suitable for developers and answer their needs.
                        <br/>
                        The existing solutions that correspond with our product are mainly :
                        Fiverr and Stackoverflow.
                    </p>
                </section>
                <section id="our-team">
                    <h1 className={"m-4"}>Our Team</h1>
                    <div id="team-container">
                        <div>
                            <h3>Chen</h3>
                            <img src="/Blank-Silhouette.jpg" alt=""/>
                        </div>
                        <div>
                            <h3>Alon</h3>
                            <img src="/Blank-Silhouette.jpg" alt=""/>
                        </div>
                        <div>
                            <h3>Kamil</h3>
                            <img src="/Blank-Silhouette.jpg" alt=""/>
                        </div>
                        <div>
                            <h3>Or</h3>
                            <img src="/Blank-Silhouette.jpg" alt=""/>
                        </div>
                        <div>
                            <h3>Yoni</h3>
                            <img src="/Blank-Silhouette.jpg" alt=""/>
                        </div>
                    </div>
                </section>
                <section>
                    <h3 className="title">The Map!</h3>
                    <Map style={"margin:auto; width:100%"}/>
                </section>
            </div>
        )
    }
}
