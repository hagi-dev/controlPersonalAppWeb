const validar=(e,a)=> {
    if (e.trim() == ""){
     alert("falta datos por llenar principal los (*)");
     return 0}
    else{
     alert("ingreso "+e.trim()+", es correcto!");
     return 1;
   }
 } 
export default validar;