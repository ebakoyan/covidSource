import {Line, Bar} from 'react-chartjs-2'
import {Component} from "react"
import {fetchDaily, fetchCountry} from "../../api"

export class Chart extends Component {
    state = {
        data: {},
        loading: true
    }
    async componentDidMount() {
        if (this.props.country) {
            this.setState({
                data: await fetchCountry(this.props.country)
            })
        } else {
            this.setState({data: await fetchDaily()})
        }
        this.setState({loading: false})
    }
    render() {
        // console.log(this.props,this.state.data)
        if (this.state.loading) {
            return <h2>Loading</h2>
        }
        if (this.props.country) {
            return <Bar
                data={{
                labels: [
                    'Infected', 'Deaths'
                ],
                datasets: [
                    {
                        label: 'People',
                        backgroundColor: [
                            'red', 'black'
                        ],
                        data: [this.state.data.confirmed, this.state.data.deaths]
                    }
                ]
            }}
                options={{
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `Current state in ${this.props.country}`
                }
            }}/>
        }
        return <Line
            data={{
            labels: this.state.data.map((date) => new Date(date.lastUpdate).toLocaleDateString()),
            datasets: [
                {
                    data: this.state.data.map((data) => data.confirmed),
                    label: 'Infected',
                    borderColor: 'red',
                    fill: true
                }, {
                    data: this.state.data.map((data) => data.deaths),
                    label: 'Deaths',
                    borderColor: 'black',
                    backgroundColor: 'black',
                    fill: true
                }
            ]
        }}/>
    }
}
export default Chart