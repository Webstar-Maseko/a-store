import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCategory from "./Modals/AddCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategories,
} from "../../../Redux/store/slicers/CategorySlicer";
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {MdExpandMore,MdChevronRight} from "react-icons/md";
import {RiCheckboxBlankCircleLine,RiCheckboxCircleFill,RiCheckboxCircleLine} from "react-icons/ri";
import {HiFolder,HiFolderOpen,HiOutlineFolder} from "react-icons/hi";
import { IconContext } from "react-icons";

const Category = (props) => {
  let [showModal, setShow] = useState(false);
  const dispatch = useDispatch();
  const cate = useSelector((state) => state.category);
  const { isLoggedIn } = useSelector((state) => state.adminUser);
  const [checked, setChecked] = useState([]);
  const [expanded, setexpanded] = useState([]);

  useEffect(() => {
    function check() {
      !isLoggedIn && props.history.push("/admin/login");
    }
    check();
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function renderCategories(cate) {
    let myCategories = [];
    for (let category of cate) {
      myCategories.push({
        value: category._id,
        label: category.name,
        children: category.children.length > 0 && renderCategories(category.children)
      });
    }

    return myCategories;
  }

  const colors= {
    color:'#FF4C29',

  }

  return (
    <div className="">
      <h1>Categories</h1>
      <hr style={{width:"20%",border:'4px solid #FF4C29'}} />
      <div className="text-end">
        <Button onClick={() => setShow(true)}>Add Category</Button>
        
        <button disabled={checked.length > 0 ? false: true}  onClick={() => dispatch(deleteCategories(checked))}><DeleteIcon /></button>
      </div>
      <AddCategory show={showModal} onHide={() => setShow(false)} />
      <CheckboxTree
          nodes={renderCategories(cate)}
          checked={checked}
          expanded={expanded}
          onCheck={checked => setChecked(checked)}
          onExpand={expanded =>setexpanded(expanded)}

          icons={{
        check:  <RiCheckboxCircleFill/>,
        uncheck: <RiCheckboxBlankCircleLine/>,
        halfCheck: <RiCheckboxCircleLine/>,
        expandClose: <MdChevronRight/>,
        expandOpen: <MdExpandMore/>,
        expandAll: <span className="rct-icon rct-icon-expand-all" />,
        parentClose:<IconContext.Provider value={colors}><HiFolder/></IconContext.Provider> ,
        parentOpen:<IconContext.Provider value={colors}> <HiFolderOpen/></IconContext.Provider>,
        leaf:<IconContext.Provider value={colors}><HiOutlineFolder /></IconContext.Provider> 
          }}
        />

    </div>
  );
};

export default Category;
