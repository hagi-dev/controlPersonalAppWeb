import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'; 
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../assets/Styles/components/ComboBox.scss';



function ComboBox_C (props) {

  
  const useStyles = makeStyles((theme) => ({
    select: {
      margin:"0",
      fontFamily  : "mulish",
      color       : "#666666",
      '&:before'  : {borderColor: "#2EA39D"},
      '&:after'   : {borderColor: "#666666",
      }
    },
    icon: {
      fill: "#2EA39D", 
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: props.width,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [todoList, setTodoList] = React.useState('');

  const handleChange = (event) => {
    setTodoList(event.target.value);
    console.log(event.target.value);
  };

  return ( 
    <FormControl  
      className={classes.formControl}>
      
      <InputLabel 
          style = {{color : "#2EA39D", 
          fontFamily: "mulish",}}
          fullWidth 
          id="demo-simple-select-label">{props.text}</InputLabel>
      <Select         

          value="1"
          className={classes.select}
          inputProps={{
              classes: {
                  icon: classes.icon,
              },
          }}

          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={todoList}
          onChange={handleChange}
      >
        {props.todoList.map(fAux =>(

          <MenuItem key={fAux.id} value={fAux.id}>{fAux.text }</MenuItem>

        ))}

      </Select>
    </FormControl> 
  );
}

export default ComboBox_C;