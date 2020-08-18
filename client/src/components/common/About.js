import React, {Component} from 'react'
import Map from "./map/Map";
import Charts from './charts/Charts';

export default class about extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="about">
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
