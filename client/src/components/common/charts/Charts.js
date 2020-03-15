import React, { Component } from 'react';
import { BarChart, AreaChart, LineChart, PieChart } from 'react-charts-d3';
import PostsService from "../../../services/Posts";
import ChartsService from "../../../services/Charts";

export default class Charts extends Component {
   
    constructor(props) {
        super(props);
        this.state = { };              

        // demo data 
        this.lineData = [
            { key: 'Web Developers', values: [ { x: 'A', y: 23 }, { x: 'B', y: 8 } ] },
            { key: 'Designers', values: [ { x: 'A', y: 15 }, { x: 'B', y: 37 } ] },
            { key: 'DBA', values: [ { x: 'A', y: 10 }, { x: 'B', y: 3 } ] },
            { key: 'IT', values: [ { x: 'A', y: 1 }, { x: 'B', y: 17 } ] },
            { key: 'Data Analyst', values: [ { x: 'A', y: 50 }, { x: 'B', y: 13 } ] }
          ];

        // demo data
        this.pieData = [
            { label: 'javascript', value: 23 },
            { label: 'git', value: 12 },
            { label: 'version-control', value: 10 },
            { label: 'python', value: 15 },
            { label: 'java', value: 45 },
            { label: 'react', value: 76 },
            { label: 'angular', value: 62 },
            { label: 'swift', value: 30 },
            { label: 'c#', value: 34 },
        ];
        
        // demo data
        this.Bubbledata = [
            { key: 'Group 1', values: [ { x: 'A', y: 23, r: 4 }, { x: 'B', y: 8, r: 19 } ] },
            { key: 'Group 2', values: [ { x: 'A', y: 15, r: 11 }, { x: 'B', y: 37, r: 21 } ] },
          ];

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
            from:'#a6cee3',
            to:'#b15928'
        }
    }

    componentDidMount() {
        ChartsService.getMostPopularPosts().then(data =>{
            this.setState({ data: [data] });
        }).catch(err => {
            console.log(err)
        });

        ChartsService.getUsersSkills();
    }

    render() {
        return (
            <>
            { !!this.state && !!this.state.data &&
                <BarChart data={this.lineData} axisConfig ={this.axisConfig} colorScale={this.colorScale}  />
            }
            { !!this.state && !!this.state.data &&
                <AreaChart data={this.state.data} axisConfig ={this.axisConfig} colorScale={this.colorScale}  />
            }
            { !!this.state && !!this.state.data &&
                <LineChart data={this.lineData} axisConfig ={this.axisConfig} colorScale={this.colorScale}  />
            }
            { !!this.state && !!this.state.data &&
                <PieChart data={this.pieData} colorScale={this.colorScale} />
            }
            </>
        );
    }
}