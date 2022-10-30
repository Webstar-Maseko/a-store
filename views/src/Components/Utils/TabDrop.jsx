import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


const TabDrop =(props)=>{

    return(
        <Tabs defaultActiveKey="Description" fill className="mb-3">
           {props.children}
        </Tabs>
    );


}
export default TabDrop;