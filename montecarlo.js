const btnSimular = document.getElementById("btnSimular");
const btnSimDelete = document.getElementById("btnSimDel");

let gridRandVarOptions = {};

const truncateDecimals = (number, digits) => {
    const multiplier = Math.pow(10, digits);
    return Math.trunc(number * multiplier) / multiplier;
};

const tomarProbabilidadesPrimerTirada = () => {
    let probPrimerTirada = [];
    let probAcumPrimerTirada = [];
    let pinosTiradosPrimerTirada = [7, 8, 9, 10]
    let prob7_primer_tirada = parseFloat(document.getElementById("prob7-1tirada").value);
    let prob8_primer_tirada = parseFloat(document.getElementById("prob8-1tirada").value);
    let prob9_primer_tirada = parseFloat(document.getElementById("prob9-1tirada").value);
    let prob10_primer_tirada = parseFloat(document.getElementById("prob10-1tirada").value);

    probPrimerTirada.push(prob7_primer_tirada, prob8_primer_tirada, prob9_primer_tirada, prob10_primer_tirada);
    probAcumPrimerTirada.push(prob7_primer_tirada, prob7_primer_tirada + prob8_primer_tirada, prob7_primer_tirada + prob8_primer_tirada + prob9_primer_tirada, prob7_primer_tirada + prob8_primer_tirada + prob9_primer_tirada + prob10_primer_tirada)
    
    return [pinosTiradosPrimerTirada, probPrimerTirada, probAcumPrimerTirada];
};

const armarIntervalos = () => {
    const [pinosTiradosPrimerTirada, probPrimerTirada, probAcumPrimerTirada] = tomarProbabilidadesPrimerTirada()
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

const generarRnd = () => {
    let rnd = truncateDecimals(Math.random(), 4);

    return rnd;
};


const buscarRndEnIntervalo = () => {
    let rnd = generarRnd();
    let pinos_tirados = 0;

    const [pinosTiradosPrimerTirada, probPrimerTirada, probAcumPrimerTirada] = tomarProbabilidadesPrimerTirada();
    const [lim_inferiores, lim_superiores] = armarIntervalos();

    for (let i = 0; i < pinosTiradosPrimerTirada.length; i++){
        if (rnd > lim_inferiores[i] && rnd < lim_superiores[i]){
            pinos_tirados = pinosTiradosPrimerTirada[i];
        }
    }

    return [rnd, pinos_tirados];
};
const generacionMontecarlo = (time_sim, n) => {
    let vectoresEstado = [];

    

    let randObj = {};
    for (let i = 0; i < n; i++) {
        const [random_1er_tirada, pinos_tirados_1er_tirada] = buscarRndEnIntervalo()

        randObj = {
            Ronda: i,
            Random1erTirada: random_1er_tirada,
            PinosTirados1erTirada: pinos_tirados_1er_tirada,
            Random2daTirada: truncateDecimals(Math.random(), 4),
            PinosTirados2daTirada: i,
            TotalPinosTirados: i,
            PuntosTotal: i,
            PuntosTotalAC: i,
            
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

    let columnDefs = [{ field: "Ronda" }, { field: "Random1erTirada" }, { field: "PinosTirados1erTirada" }, 
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