
const CategoryDisplay = ({name, categoryLink, imageLink, name2}) =>{

    return (  
    <a href={categoryLink} >
            <div className="bgh text-center" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/${imageLink}`}} >
              <h2>{name} <br/> {name2}</h2>
            </div>
          </a>
          );

}

export default CategoryDisplay;