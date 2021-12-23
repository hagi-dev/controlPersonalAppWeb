import React from 'react';
import '../assets/Styles/components/loader.scss'

const Loader = (props) => {
    const {visibility}=props;
    console.log(visibility);
    return (
        
        <div className= "loadingio-eclipse" style={{display:visibility}}> 
            <div className= "ldio-rpinwye8j0b"> 
                <div> 
                </div> 
            </div> 
        </div>
    )
}
export default Loader;
