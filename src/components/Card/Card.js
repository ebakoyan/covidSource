import s from './Card.module.css'

const Card = ({type, color, number, report}) => {
    return (
        <div className={s.container}>
            <div>
                <h3 style={{color:color}}>{type}</h3>
                <h3>{number.toLocaleString()}</h3>
                <h2>{new Date(report).toDateString()}</h2>
                <p>Number of active cases from COVID-19.</p>
                <div
                    style={{
                    backgroundColor: `${color}`,
                    width: "100%",
                    height: "20px",
                    position: "absolute",
                    bottom: "0"
                }}></div>
            </div>
        </div>
    )
}
export default Card