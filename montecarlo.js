const btnSimular = document.getElementById("btnSimular");
const btnSimDelete = document.getElementById("btnSimDel");

let gridRandVarOptions = {};
let pinos_tirados_1er_tirada = [7, 8, 9, 10];

let pinos_tirados_segtirada_1ertirada7 = [0, 1, 2, 3]
let pinos_tirados_segtirada_1ertirada8 = [0, 1, 2]
let pinos_tirados_segtirada_1ertirada9 = [0, 1]

const truncateDecimals = (number, digits) => {
    const multiplier = Math.pow(10, digits);
    return Math.trunc(number * multiplier) / multiplier;
};

const tomarProbabilidadesPrimerTirada = () => {
    let probPrimerTirada = [];
    let probAcumPrimerTirada = [];
    let pinosTiradosPrimerTirada = [7, 8, 9, 10];
    let prob7_primer_tirada = parseFloat(document.getElementById("prob7-1tirada").value);
    let prob8_primer_tirada = parseFloat(document.getElementById("prob8-1tirada").value);
    let prob9_primer_tirada = parseFloat(document.getElementById("prob9-1tirada").value);
    let prob10_primer_tirada = parseFloat(document.getElementById("prob10-1tirada").value);

    probPrimerTirada.push(prob7_primer_tirada, prob8_primer_tirada, prob9_primer_tirada, prob10_primer_tirada);
    probAcumPrimerTirada.push(prob7_primer_tirada, prob7_primer_tirada + prob8_primer_tirada, prob7_primer_tirada + prob8_primer_tirada + prob9_primer_tirada, prob7_primer_tirada + prob8_primer_tirada + prob9_primer_tirada + prob10_primer_tirada)
    
    return [pinosTiradosPrimerTirada, probAcumPrimerTirada];
};

const tomarProbabilidadesSegundaTirada = () => {
    let probabilidades_segunda_tirada_1ertirada7 = [];
    let probabilidades_segunda_tirada_1ertirada8 = [];
    let probabilidades_segunda_tirada_1ertirada9 = [];

    let prob_acum_segunda_tirada_1ertirada7 = [];
    let prob_acum_segunda_tirada_1ertirada8 = [];
    let prob_acum_segunda_tirada_1ertirada9 = [];

    let pinos_tirados_segtirada_1ertirada7 = [0, 1, 2, 3]
    let pinos_tirados_segtirada_1ertirada8 = [0, 1, 2]
    let pinos_tirados_segtirada_1ertirada9 = [0, 1]

    //probabilidades de que tire x pinos en la segunda tirada si en la primera se tiraron 7 pinos
    let prob0_seg_tirada_1ertirada7 = parseFloat(document.getElementById("prob0-7tirados-2tirada").value);
    let prob1_seg_tirada_1ertirada7 = parseFloat(document.getElementById("prob1-7tirados-2tirada").value);
    let prob2_seg_tirada_1ertirada7 = parseFloat(document.getElementById("prob2-7tirados-2tirada").value);
    let prob3_seg_tirada_1ertirada7 = parseFloat(document.getElementById("prob3-7tirados-2tirada").value);

    //probabilidades de que tire x pinos en la segunda tirada si en la primera se tiraron 8 pinos
    let prob0_seg_tirada_1ertirada8 = parseFloat(document.getElementById("prob0-8tirados-2tirada").value);
    let prob1_seg_tirada_1ertirada8 = parseFloat(document.getElementById("prob1-8tirados-2tirada").value);
    let prob2_seg_tirada_1ertirada8 = parseFloat(document.getElementById("prob2-8tirados-2tirada").value);

    //probabilidades de que tire x pinos en la segunda tirada si en la primera se tiraron 9 pinos
    let prob0_seg_tirada_1ertirada9 = parseFloat(document.getElementById("prob0-9tirados-2tirada").value);
    let prob1_seg_tirada_1ertirada9 = parseFloat(document.getElementById("prob1-9tirados-2tirada").value);

    probabilidades_segunda_tirada_1ertirada7.push(prob0_seg_tirada_1ertirada7, prob1_seg_tirada_1ertirada7, prob2_seg_tirada_1ertirada7, prob3_seg_tirada_1ertirada7)
    probabilidades_segunda_tirada_1ertirada8.push(prob0_seg_tirada_1ertirada8, prob1_seg_tirada_1ertirada8, prob2_seg_tirada_1ertirada8)
    probabilidades_segunda_tirada_1ertirada9.push(prob0_seg_tirada_1ertirada9, prob1_seg_tirada_1ertirada9)

    prob_acum_segunda_tirada_1ertirada7.push(prob0_seg_tirada_1ertirada7, prob0_seg_tirada_1ertirada7 + prob1_seg_tirada_1ertirada7, prob0_seg_tirada_1ertirada7 + prob1_seg_tirada_1ertirada7 + prob2_seg_tirada_1ertirada7, prob0_seg_tirada_1ertirada7 + prob1_seg_tirada_1ertirada7 + prob2_seg_tirada_1ertirada7 + prob3_seg_tirada_1ertirada7)
    prob_acum_segunda_tirada_1ertirada8.push(prob0_seg_tirada_1ertirada8, prob0_seg_tirada_1ertirada8 + prob1_seg_tirada_1ertirada8, prob0_seg_tirada_1ertirada8 + prob1_seg_tirada_1ertirada8 + prob2_seg_tirada_1ertirada8)
    prob_acum_segunda_tirada_1ertirada9.push(prob0_seg_tirada_1ertirada9, prob0_seg_tirada_1ertirada9 + prob1_seg_tirada_1ertirada9)
    
    return [pinos_tirados_segtirada_1ertirada7, pinos_tirados_segtirada_1ertirada8, pinos_tirados_segtirada_1ertirada9, prob_acum_segunda_tirada_1ertirada7, prob_acum_segunda_tirada_1ertirada8, prob_acum_segunda_tirada_1ertirada9];
};


const tomarPuntajes = () => {
    let puntaje_primertiro10 = parseFloat(document.getElementById("puntaje-primertiro10").value);
    let puntaje_dostiros10 = parseFloat(document.getElementById("puntaje-dostiros10").value);
    let puntaje_a_alcanzar = parseFloat(document.getElementById("puntaje-a-alcanzar").value);

    return [puntaje_primertiro10, puntaje_dostiros10, puntaje_a_alcanzar]
}

const armarIntervalos = () => {
    const [pinosTiradosPrimerTirada, probAcumPrimerTirada] = tomarProbabilidadesPrimerTirada()

    let lim_inf = 0.00;
    let lim_sup = 0.00;
    let lim_superiores = [];
    let lim_inferiores = [];
    for (let i = 0; i < pinosTiradosPrimerTirada.length; i++) {
        if (i == 0) {
            lim_inf = lim_inf;
            lim_sup = truncateDecimals(Number(probAcumPrimerTirada[i] - 0.01), 2);
            lim_inferiores.push(lim_inf);
            lim_superiores.push(lim_sup);
        } else {
            lim_inf = Number(lim_sup) + 0.01;
            lim_sup = truncateDecimals(Number(probAcumPrimerTirada[i] - 0.01), 2);
            lim_inferiores.push(lim_inf);
            lim_superiores.push(lim_sup);
        }
    }

    return [lim_inferiores, lim_superiores];
};


const armarIntervalosSegundaTirada_1erTirada10 = () => {
    const [pinos_tirados_segtirada_1ertirada7, pinos_tirados_segtirada_1ertirada8, pinos_tirados_segtirada_1ertirada9, prob_acum_segunda_tirada_1ertirada7, prob_acum_segunda_tirada_1ertirada8, prob_acum_segunda_tirada_1ertirada9] = tomarProbabilidadesSegundaTirada();

    let lim_inf = 0.00;
    let lim_sup = 0.00;
    let lim_superiores = [];
    let lim_inferiores = [];

    lim_inf = 0.00
    lim_sup = 0.99
    lim_inferiores.push(lim_inf)
    lim_superiores.push(lim_sup)

    return [lim_inferiores, lim_superiores]
};


const armarIntervalosSegundaTirada_1erTirada9 = () => {
    const [pinos_tirados_segtirada_1ertirada7, pinos_tirados_segtirada_1ertirada8, pinos_tirados_segtirada_1ertirada9, prob_acum_segunda_tirada_1ertirada7, prob_acum_segunda_tirada_1ertirada8, prob_acum_segunda_tirada_1ertirada9] = tomarProbabilidadesSegundaTirada();

    let lim_inf = 0.00;
    let lim_sup = 0.00;
    let lim_superiores = [];
    let lim_inferiores = [];

    for (let i = 0; i < pinos_tirados_segtirada_1ertirada9.length; i++) {
        if (i == 0) {
            lim_inf = lim_inf;
            lim_sup = truncateDecimals(Number(prob_acum_segunda_tirada_1ertirada9[i] - 0.01), 2);
            lim_inferiores.push(lim_inf);
            lim_superiores.push(lim_sup);
        } else {
            lim_inf = Number(lim_sup) + 0.01;
            lim_sup = truncateDecimals(Number(prob_acum_segunda_tirada_1ertirada9[i] - 0.01), 2);
            lim_inferiores.push(lim_inf);
            lim_superiores.push(lim_sup);
        }
    }

    return [lim_inferiores, lim_superiores]
};


const armarIntervalosSegundaTirada_1erTirada8 = () => {
    const [pinos_tirados_segtirada_1ertirada7, pinos_tirados_segtirada_1ertirada8, pinos_tirados_segtirada_1ertirada9, prob_acum_segunda_tirada_1ertirada7, prob_acum_segunda_tirada_1ertirada8, prob_acum_segunda_tirada_1ertirada9] = tomarProbabilidadesSegundaTirada();

    let lim_inf = 0.00;
    let lim_sup = 0.00;
    let lim_superiores = [];
    let lim_inferiores = [];

    for (let i = 0; i < pinos_tirados_segtirada_1ertirada8.length; i++) {
        if (i == 0) {
            lim_inf = lim_inf;
            lim_sup = truncateDecimals(Number(prob_acum_segunda_tirada_1ertirada8[i] - 0.01), 2);
            lim_inferiores.push(lim_inf);
            lim_superiores.push(lim_sup);
        } else {
            lim_inf = Number(lim_sup) + 0.01;
            lim_sup = truncateDecimals(Number(prob_acum_segunda_tirada_1ertirada8[i] - 0.01), 2);
            lim_inferiores.push(lim_inf);
            lim_superiores.push(lim_sup);
        }
    }

    return [lim_inferiores, lim_superiores]
};


const armarIntervalosSegundaTirada_1erTirada7 = () => {
    const [pinos_tirados_segtirada_1ertirada7, pinos_tirados_segtirada_1ertirada8, pinos_tirados_segtirada_1ertirada9, prob_acum_segunda_tirada_1ertirada7, prob_acum_segunda_tirada_1ertirada8, prob_acum_segunda_tirada_1ertirada9] = tomarProbabilidadesSegundaTirada();

    let lim_inf = 0.00;
    let lim_sup = 0.00;
    let lim_superiores = [];
    let lim_inferiores = [];

    for (let i = 0; i < pinos_tirados_segtirada_1ertirada7.length; i++) {
        if (i == 0) {
            lim_inf = lim_inf;
            lim_sup = truncateDecimals(Number(prob_acum_segunda_tirada_1ertirada7[i] - 0.01), 2);
            lim_inferiores.push(lim_inf);
            lim_superiores.push(lim_sup);
        } else {
            lim_inf = Number(lim_sup) + 0.01;
            lim_sup = truncateDecimals(Number(prob_acum_segunda_tirada_1ertirada7[i] - 0.01), 2);
            lim_inferiores.push(lim_inf);
            lim_superiores.push(lim_sup);
        }
    }

    return [lim_inferiores, lim_superiores]
};


const generacionMontecarlo = (time_sim, n) => {
    let vectoresEstado = [];

    let random_1er_tirada = 0;
    let random_2da_tirada = 0;
    let pinos_tirados_tirada1 = 0;
    let pinos_tirados_tirada2 = 0;
    let total_pinos_tirados = 0;
    let pinos_int_tirada2 = 0;
    let nropartida = 0;
    let puntaje_total = 0;
    let puntaje_total_acum = 0;

    const [lim_inferiores, lim_superiores] = armarIntervalos();
    const [puntaje_primertiro10, puntaje_dostiros10, puntaje_a_alcanzar] = tomarPuntajes()
    

    let randObj = {};
    for (let i = 0; i < n; i++) {

        //primer random
        random_1er_tirada = truncateDecimals(Math.random(), 4);

        //nropartida
        if (i % 10 === 0){
            nropartida = "Fin Partida"
        }
        else{
            nropartida = "-"
        }

        for (let j = 0; j < pinos_tirados_1er_tirada.length; j++){
            if (random_1er_tirada >= lim_inferiores[j] && random_1er_tirada < lim_superiores[j]){

                //pinos tirados tirada 1segun random
                pinos_tirados_tirada1 = pinos_tirados_1er_tirada[j];

                if (pinos_tirados_tirada1 === 10){
                    //segundo random y pinos tirados segun random
                    const [lim_inferiores, lim_superiores] = armarIntervalosSegundaTirada_1erTirada10();
                    random_2da_tirada = "-";
                    pinos_tirados_tirada2 = "-"
                    pinos_int_tirada2 = pinos_tirados_tirada2.replace("-", 0);
                    total_pinos_tirados = pinos_tirados_tirada1 + Number(pinos_int_tirada2);
                    puntaje_total = puntaje_primertiro10;
                    puntaje_total_acum = puntaje_total_acum + puntaje_total

                }
                else{
                    if (pinos_tirados_tirada1 === 9){
                        const [lim_inferiores, lim_superiores] = armarIntervalosSegundaTirada_1erTirada9();
                        random_2da_tirada = truncateDecimals(Math.random(), 4);

                        for (let k = 0; k < pinos_tirados_segtirada_1ertirada9.length; k++){
                            if (random_2da_tirada > lim_inferiores[k] && random_2da_tirada < lim_superiores[k]){
                                pinos_tirados_tirada2 = pinos_tirados_segtirada_1ertirada9[k];
                                total_pinos_tirados = pinos_tirados_tirada1 + pinos_tirados_tirada2;
                                
                                if (total_pinos_tirados === 10){
                                    puntaje_total = puntaje_dostiros10;
                                    puntaje_total_acum = puntaje_total_acum + puntaje_total
                                }
                                else{
                                    puntaje_total = total_pinos_tirados;
                                    puntaje_total_acum = puntaje_total_acum + puntaje_total
                                }
                            }
                        }
                    }
                    else{
                        if (pinos_tirados_tirada1 === 8){
                            const [lim_inferiores, lim_superiores] = armarIntervalosSegundaTirada_1erTirada8();
                            random_2da_tirada = truncateDecimals(Math.random(), 4);

                            for (let k = 0; k < pinos_tirados_segtirada_1ertirada8.length; k++){
                                if (random_2da_tirada > lim_inferiores[k] && random_2da_tirada < lim_superiores[k]){
                                    pinos_tirados_tirada2 = pinos_tirados_segtirada_1ertirada8[k];
                                    total_pinos_tirados = pinos_tirados_tirada1 + pinos_tirados_tirada2;


                                    if (total_pinos_tirados === 10){
                                        puntaje_total = puntaje_dostiros10;
                                        puntaje_total_acum = puntaje_total_acum + puntaje_total
                                    }
                                    else{
                                        puntaje_total = total_pinos_tirados;
                                        puntaje_total_acum = puntaje_total_acum + puntaje_total
                                    }
                                }
                            }

                        }
                        else{
                            if (pinos_tirados_tirada1 === 7){
                                const [lim_inferiores, lim_superiores] = armarIntervalosSegundaTirada_1erTirada7();
                                random_2da_tirada = truncateDecimals(Math.random(), 4);

                                for (let k = 0; k < pinos_tirados_segtirada_1ertirada7.length; k++){
                                    if (random_2da_tirada > lim_inferiores[k] && random_2da_tirada < lim_superiores[k]){
                                        pinos_tirados_tirada2 = pinos_tirados_segtirada_1ertirada7[k];
                                        total_pinos_tirados = pinos_tirados_tirada1 + pinos_tirados_tirada2;

                                        if (total_pinos_tirados === 10){
                                            puntaje_total = puntaje_dostiros10;
                                            puntaje_total_acum = puntaje_total_acum + puntaje_total
                                        }
                                        else{
                                            puntaje_total = total_pinos_tirados;
                                            puntaje_total_acum = puntaje_total_acum + puntaje_total
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        //console.log(random_1er_tirada, pinos_tirados_tirada1)

        randObj = {
            Ronda: i,
            Partida: nropartida,
            Random1erTirada: random_1er_tirada,
            PinosTirados1erTirada: pinos_tirados_tirada1,
            Random2daTirada: random_2da_tirada,
            PinosTirados2daTirada: pinos_tirados_tirada2,
            TotalPinosTirados: total_pinos_tirados,
            PuntosTotal: puntaje_total,
            PuntosTotalAC: puntaje_total_acum,
            
        };
    
        vectoresEstado.push(randObj);
        
            
    }
    return vectoresEstado;
};

const simularMontecarlo = () => {
    let vectoresEstado = [];

    borrarTablaMontecarlo();

    const eGridDiv = document.querySelector("#gridVariable");
    let time_sim = parseFloat(document.getElementById("time-sim").value);
    let n = parseInt(document.getElementById("n").value);

    if (
        typeof time_sim === "undefined" ||
        typeof n === "undefined"
    )
        return alert("Por favor, ingrese todos los datos.");
    if (isNaN(time_sim) || isNaN(n))
        return alert("Por favor, ingrese números.");

    if (n < 1) return alert("El valor de 'n' debe ser mayor que 0");

    try {
        vectoresEstado = generacionMontecarlo(time_sim, n);
        //rndUnif = [...vectoresEstado];

    } catch (error) {
        alert("Oops! Ha ocurrido un error");
        console.log(error)
    }

    let columnDefs = [{ field: "Ronda" }, { field: "Partida" }, { field: "Random1erTirada" }, { field: "PinosTirados1erTirada" }, 
                    { field: "Random2daTirada" }, { field: "PinosTirados2daTirada" }
                    , { field: "TotalPinosTirados" }, { field: "PuntosTotal" }, { field: "PuntosTotalAC" }];

    gridRandVarOptions = {
        columnDefs,
        rowData: [...vectoresEstado],
    };

    new agGrid.Grid(eGridDiv, gridRandVarOptions);
    btnExportToExcelRandVar.removeAttribute("hidden");
};

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


btnSimDelete.addEventListener("click", borrarTablaMontecarlo);
btnSimular.addEventListener("click", simularMontecarlo);