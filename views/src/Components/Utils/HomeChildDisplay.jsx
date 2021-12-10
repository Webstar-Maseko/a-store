
const HomeChildDisplay = ({
    heading,
    categories,
 
}) =>{
    return ( 
        <div className="centerIt  text-center pt-3">
            <h4
              className="pt-3 pb-3"
              style={{ fontWeight: "bold", color: "black" }}>
              {heading}
            </h4>

            {categories.map((item,index) => <a href={item.link} key={index} className="a-sub">{item.name} </a> )}
          </div>
          );
}
export default HomeChildDisplay;