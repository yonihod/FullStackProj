import React, {Component} from 'react'
import Map from "./map/Map";
import Charts from './charts/Charts';
import "../../App.css";

export default class about extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="about">
                <div id="background">
                    <img src="https://media.istockphoto.com/vectors/white-grey-gradient-studio-room-background-vector-eps-10-vector-id1145390344?k=6&m=1145390344&s=170667a&w=0&h=Ww4KTAjK12ftThBgMaYUQamE3DPFkyD-uEfdFXll2iI=" className="stretch" alt=""/>
                </div>
                <section className="head">
                    <div>
                        <h1 className="title">Welcome To Developi</h1>
                        <p className="body_text">
                            Our product is a combination of existing solutions,<br/>
                            focusing on one niche so it would be more<br/>
                            suitable for developers and answer their needs.
                        </p>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/about-us.png`}/>
                </section>
                <div id="our-team">
                    <h1>Our Team</h1>
                    <div id="team-container">
                        <div>
                            <img src="/or.jpg" alt=""/>
                            <h5>Or</h5>
                        </div>
                        <div>
                            <img src="/alon.jpg" alt=""/>
                            <h5>Alon</h5>
                        </div>
                        <div>
                            <img src="/chen.jpg" alt=""/>
                            <h5>Chen</h5>
                        </div>
                        <div>
                            <img src="/kamil.jpg" alt=""/>
                            <h5>Kamil</h5>
                        </div>
                        <div>
                            <img src="/yoni.jpg" alt=""/>
                            <h5>Yoni</h5>
                        </div>
                    </div>
                </div>
                <section>
                    <h3 className="title">Statistics</h3>
                    <Charts/>
                </section>
                <section>
                    <h3 className="title">Visit Our Stores</h3>
                    <Map/>
                </section>
            </div>
        )
    }
}
