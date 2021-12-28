import React,{useEffect} from 'react';
import '../assets/Styles/components/Loader.scss';

const Loader = (props) => {
    const {visivility} = props;
    useEffect(()=>{
        console.log(visivility)
    },[])
    return (
        <div className="loadingio-spinner-ball-rsnml397nj" style={{display:visivility}}>
            <div className="ldio-ggx5obf9e4q">
                <div>
                </div>
            </div>
        </div>
    )
}

export default Loader;
