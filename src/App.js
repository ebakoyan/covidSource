import {Component} from "react"

import {fetchGlobal,} from './api'

import {Card, Chart,Country} from './components'

import s from './App.module.css'

export default class App extends Component {
    state = {
        data: {},
        loading: true,
        country: ''
    }
    componentDidMount() {
        fetchGlobal().then((res) => {
            this.setState({data: res})
            this.setState({loading: false})
        })

    }
    setCountry = (country)=>{
        this.setState({country:country})
    }
    render() {
        if (this.state.loading) {
            return <h2>Loading</h2>
        }
        return (
            <div>
                <div className={s.container}>
                    <Card
                        type="Infected"
                        color="red"
                        number={this.state.data.confirmed.value}
                        report={this.state.data.lastUpdate}/>
                    <div className={s.top}>
                        <h2>{this.state.country}</h2>
                    </div>
                    <Card
                        type="Deaths"
                        color="black"
                        number={this.state.data.deaths.value}
                        report={this.state.data.lastUpdate}/>
                </div>
                <Country setCountry={(i)=>this.setCountry(i)}/>
                <div className={s.chart}>
                    <Chart country={this.state.country}></Chart>
                </div>
           
            </div>
        );

    }
}
