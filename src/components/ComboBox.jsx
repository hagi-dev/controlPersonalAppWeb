import React,{useState,useEffect} from 'react';
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
      marginTop:"15px",
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
      /* margin: theme.spacing(1), */
      minWidth: props.width,
      margin: "0px !important"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
   input: {
     
   }
  }));
  const classes = useStyles();
  const [data, setData] = useState('');
  const handleChange = (event) => {
    setData(event.target.value);
  };

  return ( 
    <FormControl  
      className={classes.formControl}>
      
      <InputLabel 
          style = {{color : "#2EA39D", 
          fontFamily: "mulish",}}
          fullWidth>{props.text}</InputLabel>
      <Select         
          name={props.name}
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
          value={data}
          onChange={handleChange}
      >
        {props.data2.map(fAux =>(

          <MenuItem key={fAux.id} value={props.valor ==='nombre' ? fAux.nombre : fAux.id }>{fAux.nombre}</MenuItem>

        ))}
      </Select>
    </FormControl> 
    
  );
}

export default ComboBox_C;