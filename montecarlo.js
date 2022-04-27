const btnSimular = document.getElementById("btnSimular");
const btnSimDelete = document.getElementById("btnSimDel");

let gridRandVarOptions = {};

const truncateDecimals = (number, digits) => {
    const multiplier = Math.pow(10, digits);
    return Math.trunc(number * multiplier) / multiplier;
};

const generacionMontecarlo = (time_sim, n) => {
    let vectoresEstado = [];

    let randObj = {};
    for (let i = 0; i < n; i++) {
        randObj = {
            Ronda: i,
            Random1erTirada: truncateDecimals(Math.random(), 4),
            PinosTirados1erTirada: i,
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