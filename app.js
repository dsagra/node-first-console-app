require('colors');
const { guardarDB, leerDB } = require('./helpers/guardar_archivo');
const { inquirerMenu, pausa, leerInput, borrarMenu, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');



console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }


    do {


        opt = await inquirerMenu();

        // console.log(opt)

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listarTarear();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                // console.log({ ids });
                break;


            case '6':
                const id = await borrarMenu(tareas.listadoArr);
                if (id !== '0') {
                    const seguro = await confirmar(`Esta seguro que quiere borrar ${tareas._listado[id].desc}?`);
                    if (seguro) {
                        tareas.borrarTarea(id);
                        console.log('Tarea eliminada'.green);
                    }
                }
                break;


        }

        guardarDB(tareas.listadoArr);



        if (opt !== '0') {
            await pausa();
        }
    } while (opt !== '0');



}

main();
