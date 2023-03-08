




export const formatDate = (valor = Date.now()) => {
    const fecha = new Date(valor);
const opciones = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
 
  timeZone: 'Europe/Madrid'
};
const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);


  return fechaFormateada
  
}
