




export const shortFormatDate = (valor = Date.now()) => {
    const fecha = new Date(valor);
const opciones = {
  
  year: 'numeric',
  month: 'short',
  day: 'numeric'
 
};
const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);


  return fechaFormateada
  
}
