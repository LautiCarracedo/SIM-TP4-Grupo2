const btnSimular = document.getElementById("btnSimular");
const btnSimDelete = document.getElementById("btnSimDel");
const lblCasoExito = document.getElementById("casoExito");
const eGridDiv = document.getElementById("gridVariable");
const btnExportToExcelRandVar = document.getElementById(
    "btnExportToExcelRandVar"
);
let gridRandVarOptions = {};

// variables globales para determinar cantidad de pinos a tirar
const PINOS_TIRADA1 = [7, 8, 9, 10];
const PINOS_TIRADA2_TIRADA1_7 = [0, 1, 2, 3];
const PINOS_TIRADA2_TIRADA1_8 = [0, 1, 2];
const PINOS_TIRADA2_TIRADA1_9 = [0, 1];

/**
 * Funcion que se encarga de tomar los valores ingresados por el usuario, valida que sean correctos y retorna los valores que son necesarios para la funcion generacionMontecarlo()
 * @returns valores que son necesarios para la funcion generacionMontecarlo()
 */
const tomarInputs = () => {
    const x = parseFloat(document.getElementById("time-sim").value);
    const n = parseInt(document.getElementById("n").value);
    const desde = parseInt(document.getElementById("sim-desde").value);
    const hasta = parseInt(document.getElementById("sim-hasta").value);
    if (x < 1 || n < 1 || desde < 0 || hasta < 0)
        return alert("X, N, DESDE, HASTA: los valores deben ser mayores a 0.");
    if (isNaN(x) || isNaN(n) || isNaN(desde) || isNaN(hasta))
        return alert("X/N/DESDE/HASTA: por favor, ingrese todos los datos.");

    // probabilidades tirada 1
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
    if (
        isNaN(prob7_tirada1) ||
        isNaN(prob8_tirada1) ||
        isNaN(prob9_tirada1) ||
        isNaN(prob10_tirada1)
    )
        return alert("PROB T1: por favor, ingrese todos los datos.");
    if (
        prob7_tirada1 < 0 ||
        prob7_tirada1 >= 1 ||
        prob8_tirada1 < 0 ||
        prob8_tirada1 >= 1 ||
        prob9_tirada1 < 0 ||
        prob9_tirada1 >= 1 ||
        prob10_tirada1 < 0 ||
        prob10_tirada1 >= 1
    )
        return alert(
            "PROB T1: las probabilidades deben ser valores entre 0 y 1 (sin incluir el 1)."
        );
    if (
        +(
            prob7_tirada1 +
            prob8_tirada1 +
            prob9_tirada1 +
            prob10_tirada1
        ).toFixed(12) != 1
    )
        return alert(
            "PROB T1: la sumatoria de las probabilidades debe ser igual a 1."
        );
    const prob_acum_tirada1 = calcularProbabilidadAcumulada([
        prob7_tirada1,
        prob8_tirada1,
        prob9_tirada1,
        prob10_tirada1,
    ]);

    // probabilidades tirada 2, habiendo tirado 7 pinos en la tirada 1
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
    if (
        isNaN(prob0_tirada2_tirada1_7) ||
        isNaN(prob1_tirada2_tirada1_7) ||
        isNaN(prob2_tirada2_tirada1_7) ||
        isNaN(prob3_tirada2_tirada1_7)
    )
        return alert("PROB T2 (T1 = 7): por favor, ingrese todos los datos.");
    if (
        prob0_tirada2_tirada1_7 < 0 ||
        prob0_tirada2_tirada1_7 >= 1 ||
        prob1_tirada2_tirada1_7 < 0 ||
        prob1_tirada2_tirada1_7 >= 1 ||
        prob2_tirada2_tirada1_7 < 0 ||
        prob2_tirada2_tirada1_7 >= 1 ||
        prob3_tirada2_tirada1_7 < 0 ||
        prob3_tirada2_tirada1_7 >= 1
    )
        return alert(
            "PROB T2 (T1 = 7): las probabilidades deben ser valores entre 0 y 1 (sin incluir el 1)."
        );
    if (
        +(
            prob0_tirada2_tirada1_7 +
            prob1_tirada2_tirada1_7 +
            prob2_tirada2_tirada1_7 +
            prob3_tirada2_tirada1_7
        ).toFixed(12) != 1
    )
        return alert(
            "PROB T2 (T1 = 7): la sumatoria de las probabilidades debe ser igual a 1."
        );
    const prob_acum_tirada2_tirada1_7 = calcularProbabilidadAcumulada([
        prob0_tirada2_tirada1_7,
        prob1_tirada2_tirada1_7,
        prob2_tirada2_tirada1_7,
        prob3_tirada2_tirada1_7,
    ]);

    // probabilidades tirada 2, habiendo tirado 8 pinos en la tirada 1
    const prob0_tirada2_tirada1_8 = parseFloat(
        document.getElementById("prob0-8tirados-2tirada").value
    );
    const prob1_tirada2_tirada1_8 = parseFloat(
        document.getElementById("prob1-8tirados-2tirada").value
    );
    const prob2_tirada2_tirada1_8 = parseFloat(
        document.getElementById("prob2-8tirados-2tirada").value
    );
    if (
        isNaN(prob0_tirada2_tirada1_8) ||
        isNaN(prob1_tirada2_tirada1_8) ||
        isNaN(prob2_tirada2_tirada1_8)
    )
        return alert("PROB T2 (T1 = 8): por favor, ingrese todos los datos.");
    if (
        prob0_tirada2_tirada1_8 < 0 ||
        prob0_tirada2_tirada1_8 >= 1 ||
        prob1_tirada2_tirada1_8 < 0 ||
        prob1_tirada2_tirada1_8 >= 1 ||
        prob2_tirada2_tirada1_8 < 0 ||
        prob2_tirada2_tirada1_8 >= 1
    )
        return alert(
            "PROB T2 (T1 = 8): las probabilidades deben ser valores entre 0 y 1 (sin incluir el 1)."
        );
    if (
        +(
            prob0_tirada2_tirada1_8 +
            prob1_tirada2_tirada1_8 +
            prob2_tirada2_tirada1_8
        ).toFixed(12) != 1
    )
        return alert(
            "PROB T2 (T1 = 8): la sumatoria de las probabilidades debe ser igual a 1."
        );
    const prob_acum_tirada2_tirada1_8 = calcularProbabilidadAcumulada([
        prob0_tirada2_tirada1_8,
        prob1_tirada2_tirada1_8,
        prob2_tirada2_tirada1_8,
    ]);

    // probabilidades tirada 2, habiendo tirado 9 pinos en la tirada 1
    const prob0_tirada2_tirada1_9 = parseFloat(
        document.getElementById("prob0-9tirados-2tirada").value
    );
    const prob1_tirada2_tirada1_9 = parseFloat(
        document.getElementById("prob1-9tirados-2tirada").value
    );
    if (isNaN(prob0_tirada2_tirada1_9) || isNaN(prob1_tirada2_tirada1_9))
        return alert("PROB T2 (T1 = 9): por favor, ingrese todos los datos.");
    if (
        prob0_tirada2_tirada1_9 < 0 ||
        prob0_tirada2_tirada1_9 >= 1 ||
        prob1_tirada2_tirada1_9 < 0 ||
        prob1_tirada2_tirada1_9 >= 1
    )
        return alert(
            "PROB T2 (T1 = 9): las probabilidades deben ser valores entre 0 y 1 (sin incluir el 1)."
        );
    if (+(prob0_tirada2_tirada1_9 + prob1_tirada2_tirada1_9).toFixed(12) != 1)
        return alert(
            "PROB T2 (T1 = 9): la sumatoria de las probabilidades debe ser igual a 1."
        );
    const prob_acum_tirada2_tirada1_9 = calcularProbabilidadAcumulada([
        prob0_tirada2_tirada1_9,
        prob1_tirada2_tirada1_9,
    ]);

    // puntajes
    const puntaje_1tiro_10 = parseFloat(
        document.getElementById("puntaje-primertiro10").value
    );
    const puntaje_2tiros_10 = parseFloat(
        document.getElementById("puntaje-dostiros10").value
    );
    const puntaje_alcanzar = parseFloat(
        document.getElementById("puntaje-a-alcanzar").value
    );
    if (
        isNaN(puntaje_1tiro_10) ||
        isNaN(puntaje_2tiros_10) ||
        isNaN(puntaje_alcanzar)
    )
        return alert("PUNTAJES: por favor, ingrese todos los datos.");

    return [
        n,
        x,
        desde,
        hasta,
        prob_acum_tirada1,
        prob_acum_tirada2_tirada1_7,
        prob_acum_tirada2_tirada1_8,
        prob_acum_tirada2_tirada1_9,
        puntaje_1tiro_10,
        puntaje_2tiros_10,
        puntaje_alcanzar,
    ];
};

/**
 * Funcion que devuelve las probabilidades acumuladas de un arreglo de probabilidades pasado como parametro.
 * @param {Array} probs arreglo con las probabilidades
 * @returns un arreglo con las probabilidades acumuladas
 */
const calcularProbabilidadAcumulada = (probs) => {
    let acu = 0;
    let probs_acum = [];

    for (let i = 0; i < probs.length; i++) {
        acu += probs[i];
        probs_acum[i] = acu;
    }

    return probs_acum;
};

/**
 * Funcion que arma los intervalos que se utilizaran para determinar la cantidad de pinos tirados
 * @param {boolean} esTirada1 true si se esta calculando para la tirada 1, false si se esta calculando para la tirada 2
 * @param {number} cantPinosTirada1 en caso que se este calculando para la tirada 2, la cantidad de pinos que se tiraron en la tirada 1. Por defecto es null
 * @returns un arreglo que contiene dos arreglos, uno que contiene los limites inferiores y otro que contiene los limites superiores
 */
const armarIntervalos = (
    esTirada1,
    cantPinosTirada1,
    prob_acum_tirada1,
    prob_acum_tirada2_tirada1_7,
    prob_acum_tirada2_tirada1_8,
    prob_acum_tirada2_tirada1_9
) => {
    let lim_inf = 0;
    let lim_sup = 0;
    let lim_superiores = [];
    let lim_inferiores = [];
    let prob_acum = 0;
    let cant_pinos = 0;

    if (esTirada1) {
        prob_acum = prob_acum_tirada1;
        cant_pinos = PINOS_TIRADA1;
    } else {
        switch (cantPinosTirada1) {
            case 7:
                prob_acum = prob_acum_tirada2_tirada1_7;
                cant_pinos = PINOS_TIRADA2_TIRADA1_7;
                break;
            case 8:
                prob_acum = prob_acum_tirada2_tirada1_8;
                cant_pinos = PINOS_TIRADA2_TIRADA1_8;
                break;
            case 9:
                prob_acum = prob_acum_tirada2_tirada1_9;
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
                lim_sup = truncateDecimals(Number(prob_acum[i]), 4);
                // lim_sup = truncateDecimals(Number(prob_acum[i] - 0.0001), 4);
                lim_inferiores.push(lim_inf);
                lim_superiores.push(lim_sup);
            } else {
                lim_inf = Number(lim_sup) + 0.0001;
                // lim_sup = truncateDecimals(Number(prob_acum[i] - 0.0001), 4);
                lim_sup = truncateDecimals(Number(prob_acum[i]), 4);
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
        if (rnd >= lim_inferiores[k] && rnd <= lim_superiores[k]) {
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
 * @param {number} desde
 * @param {number} hasta
 * @param {Array} prob_acum_tirada1 arreglo con las probabilidades acumuladas de la tirada 1
 * @param {Array} prob_acum_tirada2_tirada1_7 arreglo con las probabilidades acumuladas de la tirada 2, en base a la tirada 1 con 7 pinos
 * @param {Array} prob_acum_tirada2_tirada1_8 arrglo con las probabilidades acumuladas de la tirada 2, en base a la tirada 1 con 8 pinos
 * @param {Array} prob_acum_tirada2_tirada1_9 arrglo con las probabilidades acumuladas de la tirada 2, en base a la tirada 1 con 9 pinos
 * @param {number} puntaje_1tiro_10 puntaje que se obtiene al tirar 10 pinos en el primer tiro
 * @param {number} puntaje_2tiros_10 puntaje que se obtiene al tirar 10 pinos en dos tiros
 * @param {number} puntaje_alcanzar puntaje a alcanzar
 * @returns
 */
const generacionMontecarlo = (
    x,
    n,
    desde,
    hasta,
    prob_acum_tirada1,
    prob_acum_tirada2_tirada1_7,
    prob_acum_tirada2_tirada1_8,
    prob_acum_tirada2_tirada1_9,
    puntaje_1tiro_10,
    puntaje_2tiros_10,
    puntaje_alcanzar
) => {
    let rnd_tirada1 = 0;
    let rnd_tirada2 = 0;
    let pinos_tirados_tirada1 = 0;
    let pinos_tirados_tirada2 = 0;
    let total_pinos = 0;
    let pinos_int_tirada2 = 0;
    let nropartida = 0;
    let puntaje_total = 0;
    let puntaje_total_acum = 0;
    let filas = [];
    let casos_exitosos = 0;
    let prob_casos_exitosos = 0;
    let posicion_fin_partida = 0;

    /*
     vectorEstado[0] = ronda
     vectorEstado[1] = partida
     vectorEstado[2] = rnd tirada 1
     vectorEstado[3] = pinos tirados tirada 1
     vectorEstado[4] = rnd tirada 2
     vectorEstado[5] = pinos tirados tirada 2
     vectorEstado[6] = total pinos tirados
     vectorEstado[7] = puntaje total
     vectorEstado[8] = puntaje total acumulado
     vectorEstado[9] = caso exitoso
    */
    const vectorEstado = new Array(10);

    // armar los intervalos para la tirada 1
    const [lim_inferiores, lim_superiores] = armarIntervalos(
        true,
        null,
        prob_acum_tirada1,
        null,
        null,
        null
    );

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
                pinos_tirados_tirada1,
                null,
                prob_acum_tirada2_tirada1_7,
                prob_acum_tirada2_tirada1_8,
                prob_acum_tirada2_tirada1_9
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

        if ((i + 1) % x === 0) {
            posicion_fin_partida = i + 1;
            if (puntaje_total_acum > puntaje_alcanzar) {
                casos_exitosos++;
            }
        }
        if (i === posicion_fin_partida) {
            nropartida++;
            puntaje_total_acum = puntaje_total;
        }

        vectorEstado[0] = i + 1;
        vectorEstado[1] = nropartida;
        vectorEstado[2] = rnd_tirada1;
        vectorEstado[3] = pinos_tirados_tirada1;
        vectorEstado[4] = rnd_tirada2;
        vectorEstado[5] = pinos_tirados_tirada2;
        vectorEstado[6] = total_pinos;
        vectorEstado[7] = puntaje_total;
        vectorEstado[8] = puntaje_total_acum;
        vectorEstado[9] = casos_exitosos;

        // agregar filas desdeHasta
        if (i + 1 >= desde && i + 1 <= hasta) {
            filas.push([...vectorEstado]);
        }
    }

    // agregar ultima fila en caso que 'hasta' sea menor que la cantidad de filas
    if (hasta < n) {
        filas.push([...vectorEstado]);
    }

    prob_casos_exitosos = truncateDecimals(casos_exitosos / (n / x), 4);
    lblCasoExito.innerHTML =
        "Probabilidad de casos exitosos: " + truncateDecimals(prob_casos_exitosos, 2) * 100 + "%";

    return filas;
};

/**
 * Funcion principal que se encarga de llamar a las demas funciones y mostrar los resultados en la tabla
 * @returns {void}
 */
const simularMontecarlo = () => {
    let tableData = [];

    borrarTablaMontecarlo();

    const [
        n,
        x,
        desde,
        hasta,
        prob_acum_tirada1,
        prob_acum_tirada2_tirada1_7,
        prob_acum_tirada2_tirada1_8,
        prob_acum_tirada2_tirada1_9,
        puntaje_1tiro_10,
        puntaje_2tiros_10,
        puntaje_alcanzar,
    ] = tomarInputs();

    try {
        const filas = generacionMontecarlo(
            x,
            n,
            desde,
            hasta,
            prob_acum_tirada1,
            prob_acum_tirada2_tirada1_7,
            prob_acum_tirada2_tirada1_8,
            prob_acum_tirada2_tirada1_9,
            puntaje_1tiro_10,
            puntaje_2tiros_10,
            puntaje_alcanzar
        );

        // transformar el arreglo de 'vectoresEstado' a objetos 'fila' para ser visualizados en la tabla
        filas.map((x) => tableData.push(crearFila(x)));
    } catch (error) {
        alert("Oops! Ha ocurrido un error");
        console.log(error);
    }

    let columnDefs = [
        { field: "ronda", headerName: "Ronda" },
        { field: "partida", headerName: "Partidas" },
        { field: "rnd_tirada1", headerName: "RND (T1)" },
        { field: "pinos_tirados_tirada1", headerName: "Pinos (T1)" },
        { field: "rnd_tirada2", headerName: "RND (T2)" },
        { field: "pinos_tirados_tirada2", headerName: "Pinos (T2)" },
        { field: "total_pinos", headerName: "Total pinos" },
        { field: "puntaje_total", headerName: "Puntos" },
        { field: "puntaje_total_acum", headerName: "Total puntos" },
        { field: "caso_exitoso", headerName: "Casos exitosos" },
    ];

    gridRandVarOptions = {
        columnDefs,
        rowData: tableData,
    };

    new agGrid.Grid(eGridDiv, gridRandVarOptions);

    // setea el tamaño de las columnas para que ocupen todo el ancho de la tabla
    gridRandVarOptions.api.sizeColumnsToFit();

    btnExportToExcelRandVar.removeAttribute("hidden");
};

/**
 * Funcion que se encarga de exportar la tabla a excel
 */
const exportarTablaExcel = () => {
    gridRandVarOptions.api.exportDataAsExcel();
};

/**
 * Funcion para truncar un numero a una cantidad de decimales, ambos pasados como parametros
 * @param {number} number numero a truncar
 * @param {number} digits cantidad de decimales a truncar
 * @returns
 */
const truncateDecimals = (number, digits) => {
    const multiplier = Math.pow(10, digits);
    return Math.trunc(number * multiplier) / multiplier;
};

/**
 * Funcion que se encarga de borrar la tabla
 */
const borrarTablaMontecarlo = () => {
    const eGridDiv = document.querySelector("#gridVariable");

    let child = eGridDiv.lastElementChild;
    while (child) {
        eGridDiv.removeChild(child);
        child = eGridDiv.lastElementChild;
    }
};

/**
 * Funcion que crea un objeto 'fila' a partir de un vectorEstado. Este objeto son los datos para la tabla
 * @param {Array} vectorEstado[] arreglo de 'vectorEstado'
 * @returns un objeto 'fila'
 */
const crearFila = (vectorEstado) => {
    return {
        ronda: vectorEstado[0],
        partida: vectorEstado[1],
        rnd_tirada1: vectorEstado[2],
        pinos_tirados_tirada1: vectorEstado[3],
        rnd_tirada2: vectorEstado[4],
        pinos_tirados_tirada2: vectorEstado[5],
        total_pinos: vectorEstado[6],
        puntaje_total: vectorEstado[7],
        puntaje_total_acum: vectorEstado[8],
        caso_exitoso: vectorEstado[9],
    };
};

// Agregar los eventos a los botones
btnSimDelete.addEventListener("click", borrarTablaMontecarlo);
btnSimular.addEventListener("click", simularMontecarlo);
btnExportToExcelRandVar.addEventListener("click", exportarTablaExcel);
