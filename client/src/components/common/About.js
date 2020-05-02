import React, {Component} from 'react'
import Map from "./map/Map";
import Charts from './charts/Charts';

export default class about extends Component {

    componentDidMount() {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        ctx.font = "20px Verdana";
        // Create gradient
        let gradient = ctx.createLinearGradient(0, 0, c.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText("Thank You For Your Interest!", 10, 90);
    }

    render() {
        return (
            <div className={"about"}>
                <section className="head">
                    <img src={`${process.env.PUBLIC_URL}/about-us.jpg`}/>
                    <h1>Welcome To DEVELOPI</h1>
                    <p className="body_text">
                        Our product is a combination of existing solutions,<br/>
                        focusing on one niche so it would be more<br/>
                        suitable for developers and answer their needs.
                    </p>
                </section>
                <div id="our-team">
                    <h1 className={"m-4"}>Our Team</h1>
                    <div id="team-container">
                        <div>
                            <h4>Or</h4>
                            <img src="/or.jpg" alt=""/>
                        </div>
                        <div>
                            <h4>Alon</h4>
                            <img src="/alon.jpg" alt=""/>
                        </div>
                        <div>
                            <h4>Chen</h4>
                            <img src="/chen.jpg" alt=""/>
                        </div>
                        <div>
                            <h4>Kamil</h4>
                            <img src="/kamil.jpg" alt=""/>
                        </div>
                        <div>
                            <h4>Yoni</h4>
                            <img src="/yoni.jpg" alt=""/>
                        </div>
                    </div>
                </div>
                <section>
                    <h3 className="title">Visit Our Stores</h3>
                    <Map/>
                </section>
                <section>
                    <h3 className="title">Statistics</h3>
                    <Charts/>
                </section>
                <canvas id="myCanvas"/>
            </div>
        )
    }
}
