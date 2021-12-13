const validar=(e,a)=> {
    if (e.trim() == ""){
     alert("debe seleccionar un valor en "+a+"");
     return 0}
    else{
     alert("ingreso "+e.trim()+", es correcto!");
     return 1;
   }
 } 
export default validar;