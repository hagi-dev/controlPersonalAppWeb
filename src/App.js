import React, { Children } from 'react'; 
import './assets/Styles/App.scss';
import ComboBox_C from './components/ComboBox.jsx'


  
const todoList = [
    { text: 'Cortar Cebolla', id:'500'},
    { text: 'Tomar el Cuso de Intro con React',id:'1'},
    { text: 'Lorem Ipsus', id:'2'},
    { text: 'Miroquezada Rha', id:'3'}
  ] 

const App = () => {
 

    return ( 
        <React.Fragment>

            <ComboBox_C
                text = {"HAGI"}
                todoList = {todoList}
                width= {120}
            
            /> 
         

        </React.Fragment>
    )
}

export default App;
