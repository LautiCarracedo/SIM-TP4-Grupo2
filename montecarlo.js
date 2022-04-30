const btnSimular = document.getElementById("btnSimular");
const btnSimDelete = document.getElementById("btnSimDel");

// variables globales para determinar cantidad de pinos a tirar
const PINOS_TIRADA1 = [7, 8, 9, 10];
const PINOS_TIRADA2_TIRADA1_7 = [0, 1, 2, 3];
const PINOS_TIRADA2_TIRADA1_8 = [0, 1, 2];
const PINOS_TIRADA2_TIRADA1_9 = [0, 1];

/**
 * Funcion de soporte para truncar un numero a una cantidad de decimales, ambos pasados como parametros
 * @param {number} number numero a truncar
 * @param {number} digits cantidad de decimales a truncar
 * @returns
 */
const truncateDecimals = (number, digits) => {
    const multiplier = Math.pow(10, digits);
    return Math.trunc(number * multiplier) / multiplier;
};

/**
 * Funcion que toma los valores de los inputs de las probabilidades para la tirada 1
 * @returns un arreglo con las probabilidades acumuladas para la tirada 1
 */
const tomarProbabilidadesTirada1 = () => {
    const prob_tirada1 = [];
    const prob_acum_tirada1 = new Array(4);

    const prob7_tirada1 = parseFloat(
        document.getElementById("prob7-1tirada").value
    );
    const prob8_tirada1 = parseFloat(
        document.getElementById("prob8-1tirada").value
    );
    const prob9_tirada1 = parseFloat(
        document.getElementById("prob9-1tirada").value
    );
    const prob10_tirada1 = parseFloat(
        document.getElementById("prob10-1tirada").value
    );

    prob_tirada1.push(
        prob7_tirada1,
        prob8_tirada1,
        prob9_tirada1,
        prob10_tirada1
    );

    let acu = 0;
    for (let i = 0; i < prob_acum_tirada1.length; i++) {
        acu += prob_tirada1[i];
        prob_acum_tirada1[i] = acu;
    }

    return prob_acum_tirada1;
};

/**
 * Funcion que toma los valores de los inputs de las probabilidades para la tirada 2
 * @returns un arreglo con las probabilidades acumuladas para la tirada 2
 */
const tomarProbabilidadesTirada2 = () => {
    const prob_tirada2_tirada1_7 = [];
    const prob_tirada2_tirada1_8 = [];
    const prob_tirada2_tirada1_9 = [];

    const prob_acum_tirada2_tirada1_7 = new Array(4);
    const prob_acum_tirada2_tirada1_8 = new Array(3);
    const prob_acum_tirada2_tirada1_9 = new Array(2);

    //probabilidades de que tire x pinos en la segunda tirada si en la primera se tiraron 7 pinos
    const prob0_tirada2_tirada1_7 = parseFloat(
        document.getElementById("prob0-7tirados-2tirada").value
    );
    const prob1_tirada2_tirada1_7 = parseFloat(
        document.getElementById("prob1-7tirados-2tirada").value
    );
    const prob2_tirada2_tirada1_7 = parseFloat(
        document.getElementById("prob2-7tirados-2tirada").value
    );
    const prob3_tirada2_tirada1_7 = parseFloat(
        document.getElementById("prob3-7tirados-2tirada").value
    );

    //probabilidades de que tire x pinos en la segunda tirada si en la primera se tiraron 8 pinos
    const prob0_tirada2_tirada1_8 = parseFloat(
        document.getElementById("prob0-8tirados-2tirada").value
    );
    const prob1_tirada2_tirada1_8 = parseFloat(
        document.getElementById("prob1-8tirados-2tirada").value
    );
    const prob2_tirada2_tirada1_8 = parseFloat(
        document.getElementById("prob2-8tirados-2tirada").value
    );

    //probabilidades de que tire x pinos en la segunda tirada si en la primera se tiraron 9 pinos
    const prob0_tirada2_tirada1_9 = parseFloat(
        document.getElementById("prob0-9tirados-2tirada").value
    );
    const prob1_tirada2_tirada1_9 = parseFloat(
        document.getElementById("prob1-9tirados-2tirada").value
    );

    prob_tirada2_tirada1_7.push(
        prob0_tirada2_tirada1_7,
        prob1_tirada2_tirada1_7,
        prob2_tirada2_tirada1_7,
        prob3_tirada2_tirada1_7
    );

    prob_tirada2_tirada1_8.push(
        prob0_tirada2_tirada1_8,
        prob1_tirada2_tirada1_8,
        prob2_tirada2_tirada1_8
    );

    prob_tirada2_tirada1_9.push(
        prob0_tirada2_tirada1_9,
        prob1_tirada2_tirada1_9
    );

    let acu = 0;
    for (let i = 0; i < prob_acum_tirada2_tirada1_7.length; i++) {
        acu += prob_tirada2_tirada1_7[i];
        prob_acum_tirada2_tirada1_7[i] = acu;
    }

    acu = 0;
    for (let i = 0; i < prob_acum_tirada2_tirada1_8.length; i++) {
        acu += prob_tirada2_tirada1_8[i];
        prob_acum_tirada2_tirada1_8[i] = acu;
    }

    acu = 0;
    for (let i = 0; i < prob_acum_tirada2_tirada1_9.length; i++) {
        acu += prob_tirada2_tirada1_9[i];
        prob_acum_tirada2_tirada1_9[i] = acu;
    }

    return [
        prob_acum_tirada2_tirada1_7,
        prob_acum_tirada2_tirada1_8,
        prob_acum_tirada2_tirada1_9,
    ];
};

/**
 * Funcion que toma los valores de los inputs de los puntajes
 * @returns un arreglo con los puntajes
 */
const tomarPuntajes = () => {
    const puntaje_1tiro_10 = parseFloat(
        document.getElementById("puntaje-primertiro10").value
    );
    const puntaje_2tiros_10 = parseFloat(
        document.getElementById("puntaje-dostiros10").value
    );
    const puntaje_alcanzar = parseFloat(
        document.getElementById("puntaje-a-alcanzar").value
    );

    return [puntaje_1tiro_10, puntaje_2tiros_10, puntaje_alcanzar];
};

/**
 * Funcion que arma los intervalos que se utilizaran para determinar la cantidad de pinos tirados
 * @param {boolean} esTirada1 true si se esta calculando para la tirada 1, false si se esta calculando para la tirada 2
 * @param {number} cantPinosTirada1 en caso que se este calculando para la tirada 2, la cantidad de pinos que se tiraron en la tirada 1. Por defecto es null
 * @returns un arreglo que contiene dos arreglos, uno que contiene los limites inferiores y otro que contiene los limites superiores
 */
const armarIntervalos = (esTirada1, cantPinosTirada1 = null) => {
    let lim_inf = 0;
    let lim_sup = 0;
    let lim_superiores = [];
    let lim_inferiores = [];
    let prob_acum = 0;
    let cant_pinos = 0;

    if (esTirada1) {
        prob_acum = tomarProbabilidadesTirada1();
        cant_pinos = PINOS_TIRADA1;
    } else {
        switch (cantPinosTirada1) {
            case 7:
                [prob_acum] = tomarProbabilidadesTirada2();
                cant_pinos = PINOS_TIRADA2_TIRADA1_7;
                break;
            case 8:
                [, prob_acum] = tomarProbabilidadesTirada2();
                cant_pinos = PINOS_TIRADA2_TIRADA1_8;
                break;
            case 9:
                [, , prob_acum] = tomarProbabilidadesTirada2();
                cant_pinos = PINOS_TIRADA2_TIRADA1_9;
                break;
            case 10:
                lim_inferiores = [0.0];
                lim_superiores = [0.9999];
                break;
        }
    }

    if (esTirada1 || cantPinosTirada1 != 10) {
        for (let i = 0; i < cant_pinos.length; i++) {
            if (i == 0) {
                lim_inf = lim_inf;
                lim_sup = truncateDecimals(Number(prob_acum[i] - 0.0001), 4);
                lim_inferiores.push(lim_inf);
                lim_superiores.push(lim_sup);
            } else {
                lim_inf = Number(lim_sup) + 0.0001;
                lim_sup = truncateDecimals(Number(prob_acum[i] - 0.0001), 4);
                lim_inferiores.push(lim_inf);
                lim_superiores.push(lim_sup);
            }
        }
    }

    return [lim_inferiores, lim_superiores];
};

/**
 * Funcion que determina el intervalo al que pertenece un numero pasado por parametro y devuelve la cantidad de pinos tirados
 * @param {number} rnd numero a comprobar en que intervalo se encuentra
 * @param {Array} tirada arreglo con la cantidad de pinos que se pueden tirar
 * @param {Array} lim_inferiores arreglo con los limites inferiores
 * @param {Array} lim_superiores arreglo con los limites superiores
 * @returns {number} cantidad de pinos tirados
 */
const determinarIntervalo = (rnd, tirada, lim_inferiores, lim_superiores) => {
    for (let k = 0; k < tirada.length; k++) {
        if (rnd > lim_inferiores[k] && rnd < lim_superiores[k]) {
            return tirada[k];
        }
    }
};

/**
 * Funcion que determina los pinos que se pueden tirar en la tirada 2, en base a los pinos tirados en la tirada 1
 * @param {number} pinos_tirados_tirada1 cantidad de pinos tirados en la tirada 1
 * @returns un arreglo con los pinos que se pueden tirar en la tirada 2
 */
const determinarPinosTirada2 = (pinos_tirados_tirada1) => {
    switch (pinos_tirados_tirada1) {
        case 9:
            return PINOS_TIRADA2_TIRADA1_9;
        case 8:
            return PINOS_TIRADA2_TIRADA1_8;
        case 7:
            return PINOS_TIRADA2_TIRADA1_7;
    }
};

/**
 * Funcion que realiza el metodo montecarlo
 * @param {number} x cantidad de filas (rondas) que tendra cada partida
 * @param {number} n cantidad total de filas (rondas) que tendra la tabla
 * @returns un arreglo de objetos que poseen los datos para generar la tabla
 */
const generacionMontecarlo = (x, n) => {
    let vectoresEstado = [];

    let rnd_tirada1 = 0;
    let rnd_tirada2 = 0;
    let pinos_tirados_tirada1 = 0;
    let pinos_tirados_tirada2 = 0;
    let total_pinos = 0;
    let pinos_int_tirada2 = 0;
    let nropartida = 0;
    let puntaje_total = 0;
    let puntaje_total_acum = 0;
    let randObj = {};

    // obtener los puntajes de los inputs
    const [puntaje_1tiro_10, puntaje_2tiros_10, puntaje_alcanzar] =
        tomarPuntajes();

    // armar los intervalos para la tirada 1
    const [lim_inferiores, lim_superiores] = armarIntervalos(true, null);

    // ciclo para generar {n} filas en la tabla
    for (let i = 0; i < n; i++) {
        // generar rnd para la tirada 1
        rnd_tirada1 = truncateDecimals(Math.random(), 4);

        // determinar a que intervalo pertenece el rnd de la tirada 1 (para saber cuantos pinos se tiraron)
        pinos_tirados_tirada1 = determinarIntervalo(
            rnd_tirada1,
            PINOS_TIRADA1,
            lim_inferiores,
            lim_superiores
        );

        if (pinos_tirados_tirada1 === 10) {
            rnd_tirada2 = "-";
            pinos_tirados_tirada2 = "-";
            pinos_int_tirada2 = pinos_tirados_tirada2.replace("-", 0);
            total_pinos = pinos_tirados_tirada1 + Number(pinos_int_tirada2);
            puntaje_total = puntaje_1tiro_10;
        } else {
            // armar los intervalos para la tirada 2, en base a los pinos tirados en la tirada 1
            const [lim_inferiores, lim_superiores] = armarIntervalos(
                false,
                pinos_tirados_tirada1
            );

            // generar rnd para la tirada 2
            rnd_tirada2 = truncateDecimals(Math.random(), 4);

            // determinar los pinos que se pueden tirar en la tirada 2, en base a los pinos tirados en la tirada 1
            let pinos_tirada2 = determinarPinosTirada2(pinos_tirados_tirada1);

            // determinar a que intervalo pertenece el rnd de la tirada 2 (para saber cuantos pinos se tiraron)
            pinos_tirados_tirada2 = determinarIntervalo(
                rnd_tirada2,
                pinos_tirada2,
                lim_inferiores,
                lim_superiores
            );

            // cantidad de pinos tirados en total (en las dos tiradas)
            total_pinos = pinos_tirados_tirada1 + pinos_tirados_tirada2;

            // calculo del puntaje obtenido
            if (total_pinos === 10) {
                puntaje_total = puntaje_2tiros_10;
            } else {
                puntaje_total = total_pinos;
            }
        }

        puntaje_total_acum += puntaje_total;

        //nropartida
        if ((i + 1) % 10 === 0) {
            //cambiar 10 por el valor del input
            nropartida = "Fin Partida";
            //puntaje_total_acum = puntaje_total //esto esta mal, es en la iteracion i +1 donde se resetea
        } else if ((i + 1) % (10 + 1) === 0) {
            puntaje_total_acum = puntaje_total;
        } else {
            nropartida = "-";
        }

        //if (i - 1 === "Fin Partida"){
        //    puntaje_total_acum = puntaje_total
        //}
        //console.log(random_1er_tirada, pinos_tirados_tirada1)

        randObj = {
            Ronda: i + 1,
            Partida: nropartida,
            Random1erTirada: rnd_tirada1,
            PinosTirados1erTirada: pinos_tirados_tirada1,
            Random2daTirada: rnd_tirada2,
            PinosTirados2daTirada: pinos_tirados_tirada2,
            TotalPinosTirados: total_pinos,
            PuntosTotal: puntaje_total,
            PuntosTotalAC: puntaje_total_acum,
        };

        vectoresEstado.push(randObj);
    }
    return vectoresEstado;
};

/**
 * Funcion principal que se encarga de llamar a las demas funciones y mostrar los resultados en la tabla
 * @returns {void}
 */
const simularMontecarlo = () => {
    let vectoresEstado = [];

    borrarTablaMontecarlo();

    const eGridDiv = document.querySelector("#gridVariable");
    let time_sim = parseFloat(document.getElementById("time-sim").value);
    let n = parseInt(document.getElementById("n").value);

    if (typeof time_sim === "undefined" || typeof n === "undefined")
        return alert("Por favor, ingrese todos los datos.");

    if (isNaN(time_sim) || isNaN(n))
        return alert("Por favor, ingrese números.");

    if (n < 1) return alert("El valor de 'n' debe ser mayor que 0");

    try {
        vectoresEstado = generacionMontecarlo(time_sim, n);
    } catch (error) {
        alert("Oops! Ha ocurrido un error");
        console.log(error);
    }

    let columnDefs = [
        { field: "Ronda" },
        { field: "Partida" },
        { field: "Random1erTirada", headerName: "RND (T1)" },
        { field: "PinosTirados1erTirada", headerName: "Pinos (T1)" },
        { field: "Random2daTirada", headerName: "RND (T2)" },
        { field: "PinosTirados2daTirada", headerName: "Pinos (T1)" },
        { field: "TotalPinosTirados", headerName: "Total pinos" },
        { field: "PuntosTotal", headerName: "Puntos" },
        { field: "PuntosTotalAC", headerName: "Total puntos" },
    ];

    let gridRandVarOptions = {
        columnDefs,
        rowData: [...vectoresEstado],
    };

    new agGrid.Grid(eGridDiv, gridRandVarOptions);

    // setea el tamaño de las columnas para que ocupen todo el ancho de la tabla
    gridRandVarOptions.api.sizeColumnsToFit();

    btnExportToExcelRandVar.removeAttribute("hidden");
};

/**
 * Funcion de soporte que se encarga de borrar la tabla
 */
const borrarTablaMontecarlo = () => {
    //btnExportToExcelRandVar.setAttribute("hidden", "hidden");
    //btnExportToExcelFrec.setAttribute("hidden", "hidden");
    const eGridDiv = document.querySelector("#gridVariable");

    let child = eGridDiv.lastElementChild;
    while (child) {
        eGridDiv.removeChild(child);
        child = eGridDiv.lastElementChild;
    }
};

// Agregar los eventos a los botones
btnSimDelete.addEventListener("click", borrarTablaMontecarlo);
btnSimular.addEventListener("click", simularMontecarlo);
