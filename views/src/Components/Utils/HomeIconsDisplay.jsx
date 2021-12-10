import { IconContext } from "react-icons";

const HomeIconsDisplay = ({
    icon:Icon,
    name,
    link
}) =>
{

    return ( <div className="d-inline-block ">
          <a href={link} className="icon-link">
            <div className="icons-cir">
              <IconContext.Provider value={{ size: "2.3em" }}>
              <Icon />
              </IconContext.Provider>
            </div>
            <span className="icon-child">{name}</span>
          </a>
        </div>);
}

export default HomeIconsDisplay;