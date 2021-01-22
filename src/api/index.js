import axios from "axios"

const _url = "https://covid19.mathdro.id/api"

export const fetchGlobal = async() => {
    const {
        data: {
            confirmed,
            deaths,
            lastUpdate
        }
    } = await axios.get(_url)
    return {confirmed, deaths,lastUpdate}
}

export const fetchDaily = async () =>{
    const {data}  = await axios.get(`${_url}/daily`)

    let newData = [];
    for(let i = 0;i<data.length;i++){
        let b = {
            confirmed:data[i].totalConfirmed,
            deaths:data[i].deaths.total,
            lastUpdate:data[i].reportDate
        }
        newData.push(b)
    }
    return newData
}
export const fetchCountry = async (country) =>{
    const {data}= await axios.get(`${_url}/countries/${country}`)

    return {
        confirmed:data.confirmed.value,
        deaths:data.deaths.value,
        lastUpdate:data.lastUpdate
    }
}

export const fetchCountryList = async ()=>{
    const {data}  = await axios.get(`${_url}/countries`)

    let modifedData= data.countries.map(c=>c.name)

    return modifedData;
}