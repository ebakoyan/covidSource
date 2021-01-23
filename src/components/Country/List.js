const List = ({name,setCountry})=>(
    <div onClick={()=>setCountry(name)} style={{cursor:"pointer"}}>
        <h2>
            {name}
        </h2>
    </div>
)
export default List