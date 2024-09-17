import "./index.css"
const Table = ({
    columns=defaultColumns,
    rows
}) => {
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
        <div className="main">
           {
            [1,2,3,4,5,6,7,8,9,10].map(item=>(<div className="mainItems" key={item}>

               {
                 columns.map((elem,i)=>{
                    return <div className="contentsItem" key={i}>
                 
                        <p>{elem.title}</p>
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