import React, { Children } from 'react';
import Menu from './components/Menu';
import './assets/Styles/App.scss';
import Tabla from './components/Tabla';
import ComboBox_C from './components/ComboBox.jsx'
  
/* 
  function TodoList_C(props){
      return(
          <section>
              <ol>
                {props.children}
              </ol>
          </section>
      )
  }

  function TodoItem_C(props){
      return(
          <li>
              <p>{props.text}</p>
          </li>
      )
  } */

  
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

{/*             <TodoList_C>

                {todoList.map(fAux =>(
                     <TodoItem_C key={fAux.text} text= {fAux.text }/>
                ))}
            
            </TodoList_C> */}

        </React.Fragment>
    )
}

export default App;
