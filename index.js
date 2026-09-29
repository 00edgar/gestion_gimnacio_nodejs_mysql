import dotenv from 'dotenv';
dotenv.config();
import { Menu } from './commands/Menu.js';
import { error } from './utils/helpers.js';

const main = async function() {
  try {
    const menu = new Menu();
    await menu.iniciar();
  } catch (e) {
    error(e.message);
    process.exit(1);
  }
};

main();
