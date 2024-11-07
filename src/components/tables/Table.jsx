import "./index.css"
const Table = ({
    columns=defaultColumns,
    rows
}) => {
    console.log(rows)
  return (
    <div className="tablemain">
        <div className="contents">
            {
               columns.map((elem,i)=>{
                    return <div className="contentsItem" key={i}>
                 
                        <p>{elem.title}</p>
                    </div>
                })
            }
        </div>
        <div className="main" key={1}>
           {
            rows?.map(item=>(<div className="mainItems" key={item.id}>

               {
                 columns.map((elem,i)=>{
                    return <div className="contentsItem" key={elem.id}>
                 
                        <p>{item[elem.slug]}</p>
                    </div>
                })
               }

            </div>))
           }
        </div>

        
    </div>
  )
}

export default Table

const defaultColumns=[
    {id:1, title : "id"},
    {id:2, title: "name"},
    {id : 3 ,title: "description"},
    {id: 4 , title : "date"},
    {id: 5 , title : "date2"}
]