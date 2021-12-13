import React from 'react';
import {Button,Modal,TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { ThemeProvider } from '@material-ui/core/styles'; 
import { makeStyles , createTheme, withStyles } from '@material-ui/core/styles';
import {purple, green} from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import { responsiveFontSizes } from '@material-ui/core/styles';

import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[200],
    },
    secondary: {
      main: green[500],
    },
  },
});

let graphy = createTheme();
graphy = responsiveFontSizes(graphy);

const useStyles = makeStyles((p) => ({

    body:{
        width:"100%",
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    modal:{ 
      width:"100%",
      height:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    },
    root: {
      display: 'flex',
      justifyContent:"center",
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    paper: {  
        position: 'absolute',
        width: "60vw",
        background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(46,163,157,1) 49%, rgba(0,100,120,1) 100%)',
        //background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(252,220,60,1) 35%, rgba(130,100,0,1) 100%)',
        //background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(252,220,60,1) 50%, rgba(126,100,0,1) 100%)',
        border: '2px solid #00000080',
        boxShadow: '12px 12px 30px 0px rgba(0,0,0,0.69)',
        padding: '20px 40px 30px'
    },
    textField:{
        width:'100%'
    },
    large: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    textFieldTwo: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 140,
    },
    sButtons:{
      background: "#2EA39D",
      boxShadow: '12px 12px 30px 0px rgba(0,0,0,0.69)',
      width: "40%"
    },
    sButtons2:{
      background: "#7D0F2E",
      boxShadow: '12px 12px 30px 0px rgba(0,0,0,0.69)',
      width: "40%"
    },
    sDivOne:{ 
      display: "flex",
      justifyContent: "space-between",
      margin: "30px 0px"
    },
      table: {
      minWidth: 700,
    },
  }));
// ---------------- T A B L E ---------------------
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

// ---------------- T A B L E ---------------------

 const Asistencias = () => {

    const styles = useStyles();
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

 
    const mOpenModal = () =>{
        setChecked(!checked)
    }

    const body = (
        <div className={styles.paper}> 

            <figure className={styles.root}>
              <Avatar alt="Hot Model" src="https://www.pandesiaworld.com/wp-content/uploads/2020/12/alluring-woman-big-tits-sexy-swimwear-2.jpg" className={styles.large} />
            </figure>

            <article align="center" className={styles.container}>
              <ThemeProvider graphy={graphy}>
                <Typography variant="h4">SOFIA CARDASHA</Typography>
                <Typography variant="body1">ALMACÉN</Typography><span> </span>
                <Typography variant="body1">SUPERVISORA</Typography>
                <TextField
                  id="date"
                  label="Fecha"
                  type="date"
                  defaultValue="2022-05-24"
                  className={styles.textFieldTwo}
                  InputLabelProps={{shrink: true,}}
                />
              </ThemeProvider>
            </article>
            
            <ThemeProvider theme={theme} >

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                      <StyledTableCell align="right">Calories</StyledTableCell>
                      <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                      <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                      <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
                  
                  <div className={styles.sDivOne}>
                    <Button className={styles.sButtons}>Enviar</Button>
                    <Button className={styles.sButtons2}>Cancelar</Button>
                  </div>
              
            </ThemeProvider>
            
        </div>
    );
    
  return (
    <div className={styles.body}>
        <Button type='button' onClick={mOpenModal}>Open</Button>
        <h1>Formulario</h1>
        <Modal 
            className={styles.modal}
            open={checked}
            onClose={mOpenModal}
        >
          {body}
        </Modal>  
    </div>
  );
} 
export default Asistencias


{/*               <TextField color="primary" type="search" variant="outlined" error="true"  helperText="Incorrect entry." label="asdf" className={styles.textField}/><br/>
                  <TextField  type="search" variant="outlined" color='secondary' helperText="Incorrect entry." label="bfs" className={styles.textField}/><br/>
                  <TextField  type="search" variant="outlined"  helperText="Incorrect entry." label="casss" className={styles.textField}/><br/>
 */}