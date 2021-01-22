import {Component} from 'react'
import List from "./List"
import {fetchCountryList} from '../../api'

export default class Country extends Component {
    state = {
        list: ['USA'],
        search: "",
        loading: true
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
        if(this.state.search.length>1){
            this.props.setCountry(countryList[0])
        }
        return (
            <div>
                <input type="text" onChange={changeHandler}/>
                <div>
                    {!this.state.loading
                        ? (countryList.map(a =><List name = {a}> </List>))
                        : null}
                </div>
            </div>
        )
    }
}