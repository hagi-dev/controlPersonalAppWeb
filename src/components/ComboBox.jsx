import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  
  select: {
    fontFamily: "mulish",

    color: "#666666",
    '&:before': {
        borderColor: "#2EA39D",
    },
    '&:after': {
        borderColor: "#666666",
    }
  },
  icon: {
    
    fill: "#2EA39D", 
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ComboBox_C () {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl  
        className={classes.formControl}>
        
        <InputLabel
            style = {{color : "#2EA39D", 
            fontFamily: "mulish",}}

            fullWidth 
            id="demo-simple-select-label"
            
            >Hagi Rai</InputLabel>
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
            value={age}
            onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
          <MenuItem value={30}>aaA</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export {ComboBox_C};

/*import * as React from 'react';

import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../assets/Styles/components/ComboBox.scss' 



function ComboBox_C () {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
        <Box 
             
            width="25%"
            margin="20px"
        >
            <FormControl 
                fullWidth
                variant="outlined"
            >
                
                <InputLabel
                borderColor="primary.main"
                id="demo-simple-select-label">Age</InputLabel>
                <Select 
                fullWidth 

                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
 

        </Box>
    );
}

export {ComboBox_C};
*/ 
