import {useState, useEffect} from "react";


const getWidth = ()=>{
    const {innerWidth:width} = window;

    return width;
}

const UseWindowDimensions = () =>{
    const [windowDimension,setWindowDimension] = useState(getWidth);

    useEffect(() =>{
        function handleResize(){
            setWindowDimension(getWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    
    },  []);
    return windowDimension;
}


export default UseWindowDimensions;