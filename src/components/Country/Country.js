import {Component} from 'react'
import List from "./List"
import s from './Country.module.css'
import {fetchCountryList} from '../../api'

export default class Country extends Component {
    state = {
        list: ['USA'],
        search: "",
        loading: true,
        show:false
    }
    async componentDidMount() {
        this.setState({list: await fetchCountryList()})
        this.setState({loading: false})
    }
    render() {
        let countryList = []
        this
            .state
            .list
            .forEach(a => {
                if (a.toLowerCase().includes(this.state.search.toLowerCase())) {
                    countryList.push(a)
                }
            })
        const changeHandler = ({target: {value}}) => {
            this.setState({search: value})
        }
        let component = [];
        if(!this.state.loading){
            for(let i =0;i<3;i++){
                let a=countryList[i]
                component.push(<List name = {a} setCountry={this.props.setCountry} key={a}/>)
            }
        }
        return (
            <div className={s.input}>
                <input type="text" placeholder='Search' onChange={changeHandler} onClick={()=>this.setState({show:true})}/>
                <div>
                    {this.state.show ? component :null}
                </div>
            </div>
        )
    }
}