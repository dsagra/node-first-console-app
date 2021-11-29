const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }


    borrarTarea(id) {
        if (this._listado[id]) {

            delete this._listado[id];
        }

    }

    listarTarear() {
        console.log();
        this.listadoArr.forEach((tarea, idx) => {
            const i = `${idx + 1}`.green;
            let completo = (tarea.completadoEn)
                ? tarea.completadoEn.green
                : "Pendiente".red;


            console.log(`${i}. ${tarea.desc} :: ${completo}`);
        })
    }

    toggleCompletadas(ids = []) {
        // ids.forEach((e) => {
        //     const tarea = this._listado[e];
        //     if (!tarea.completadoEn) {
        //         tarea.completadoEn = new Date().toISOString();

        //     }
        // });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
            else {
                this._listado[tarea.id].completadoEn = new Date().toISOString();
            }
        })

    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let i = 0;
        let h = 0;
        this.listadoArr.forEach((tarea) => {

            if (tarea.completadoEn) {
                i++;
                let completo = tarea.completadoEn.green;
                if (completadas) console.log(`${(i + '.').green} ${tarea.desc} :: ${completo}`);
            }
            else {
                h++;
                let completo = "Pendiente".red;
                if (!completadas)
                    console.log(`${(h + '.').green} ${tarea.desc} :: ${completo}`);
            }
        })
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }



    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

}



module.exports = Tareas;