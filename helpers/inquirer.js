const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar una tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }

        ]
    }

];




const inquirerMenu = async () => {
    console.clear();
    console.log('========================'.green);
    console.log(' Selecciones una opción '.white);
    console.log('========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const borrarMenu = async (listado = []) => {
    const choices = [{
        value: '0',
        name: `${'0.'.green} Volver`
    }];
    choices.push(...listado.map((tarea, index) => {
        const indice = `${index + 1}.`;
        return {
            value: tarea.id,
            name: `${indice.green} ${tarea.desc}`,
        }
    }));

    const listadoTareas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Que desea hacer?',
            choices: choices
        }

    ];
    console.clear();
    console.log('==============================='.green);
    console.log(' Selecciones la tarea a borrar '.white);
    console.log('===============================\n'.green);

    const { opcion } = await inquirer.prompt(listadoTareas);
    return opcion;
}


const mostrarListadoCheckList = async (listado = []) => {

    const choices = listado.map((tarea, index) => {
        const indice = `${index + 1}.`;


        return {
            value: tarea.id,
            name: `${indice.green} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false

        }
    });


    // choices.unshift({
    //     value: '0',
    //     name: `${'0.'.green} Volver`,


    // });
    const listadoTareas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices: choices
        }

    ];

    const { ids } = await inquirer.prompt(listadoTareas);
    return ids;
}

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt({
        type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.green} para continuar`,

    })
}

const leerInput = async (msg) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: msg,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}



const confirmar = async (msg) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: msg,

        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    borrarMenu,
    confirmar,
    mostrarListadoCheckList
}