import chalk from 'chalk';
import Table from 'cli-table3';

export const mostrar = function(msg) { 
  console.log(chalk.white(msg)); 
};

export const exito = function(msg) { 
  console.log(chalk.green.bold('✔ ' + msg)); 
};

export const error = function(msg) { 
  console.log(chalk.red.bold('✖ ' + msg)); 
};

export const mostrarTabla = function(titulo, columnas, datos) {
  console.log(chalk.cyan.bold('\n' + titulo + '\n'));
  
  const tabla = new Table({
    head: columnas.map(c => chalk.yellow.bold(c)),
    style: { 
      head: [], 
      border: [] 
    }
  });
  
  datos.forEach(fila => {
    tabla.push(fila);
  });
  
  console.log(tabla.toString());
  console.log('');
};