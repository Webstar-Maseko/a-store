import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { useState } from "react";


const ListDrop = (props) => {


const handleOpen = () =>{
    setOpen(!open);
  }
  let [open, setOpen] = useState(true);

  return(<List component="nav">
  <ListItem button onClick={handleOpen} className="pl-0">
    <ListItemText primary={props.name} className="caption" />
    {open ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse in={open} unmountOnExit>
  {props.children}
   {/* "mmh"
    <br />
    <br />
    <br />
    <b>Fabric Content:</b>
    <br />
    Lorem ipsum dolor sit.
    <br />
    <br />
    <b>Wash Care:</b>
    <br />
    Lorem, ipsum dolor. */}
  </Collapse>
</List>);


} 

export default ListDrop;
