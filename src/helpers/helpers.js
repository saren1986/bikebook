export function distansFormatter(dist, units) {
 
if(units === 'KM'){
  return (dist / 1000).toFixed(1) + ' KM';
}

}