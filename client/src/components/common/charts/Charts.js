import React, {Component} from 'react';
import {BarChart, AreaChart, LineChart, PieChart} from 'react-charts-d3';
import ChartsService from "../../../services/Charts";

export default class Charts extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        // graph properties configurations
        this.axisConfig = {
            showXAxis: true,
            showXAxisLabel: false,
            xLabel: "Subject",
            xLabelPosition: 'right',
            showYAxis: true,
            showYAxisLabel: false,
            yLabel: "Popularity",
            yLabelPosition: 'top'
        };
        this.colorScale = {
            from: 'dodgerblue',
            to: '#49515a'
        }
    }

    componentDidMount() {
        ChartsService.getMostActiveUsers().then(data => {
            if (data)
                this.setState({pieData: data.data});
        }).catch(err => {
            console.log(err)
        });

        ChartsService.getMostPopularPosts().then(data => {
            if (data)
                this.setState({barsData: [data]});
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return (
            <>
                {this.state && this.state.pieData &&
                <div className="chart">
                    <div>Most Active Users By Posts Number</div>
                    <PieChart data={this.state.pieData} colorScale={this.colorScale}/>
                </div>
                }
                {this.state && this.state.barsData &&
                <div className="chart">
                    <div>Most Common Posts Tags</div>
                    <BarChart data={this.state.barsData} axisConfig={this.axisConfig} colorScale={this.colorScale}/>
                </div>
                }
            </>
        );
    }
}