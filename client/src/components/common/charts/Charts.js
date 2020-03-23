import React, { Component } from 'react';
import { BarChart, AreaChart, LineChart, PieChart } from 'react-charts-d3';
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
            from: '#a6cee3',
            to: '#b15928'
        }
    }

    componentDidMount() {
        ChartsService.getMostActiveUsers().then(data => {
            this.setState({ pieData: data.data });
        }).catch(err => {
            console.log(err)
        });

        ChartsService.getMostPopularPosts().then(data => {
            this.setState({ barsData: [data] });
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return (
            <>
                {!!this.state && !!this.state.barsData &&
                    <BarChart data={this.state.barsData} axisConfig={this.axisConfig} colorScale={this.colorScale} />
                }
                {!!this.state && !!this.state.pieData &&
                    <div>
                        <h4>Most Active Users Posts</h4>
                        <PieChart data={this.state.pieData} colorScale={this.colorScale} />
                    </div>
                }
            </>
        );
    }
}