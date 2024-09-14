import "../PatientCard/PatientCard.js"

class AppPatientsBoard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.patients = [];
    }
    connectedCallback(){
        this.render();

        const form = this.shadowRoot.querySelector(".patient-form")
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = this.shadowRoot.querySelector(".input-name").value
            const species = this.shadowRoot.querySelector(".input-species").value
            const date = this.shadowRoot.querySelector(".input-date").value
            const symptoms = this.shadowRoot.querySelector(".input-symptoms").value

            this.patients.push({name, species, date, symptoms, state: false});
            this.AddPatient({name, species, date, symptoms, state: false});
            form.reset();
        })
    }
    render(){
        this.shadowRoot.innerHTML = `
            <h1>Añadir paciente</h1>
            <form class="patient-form">
                <h3>Nombre:</h3>
                <input type="text" placeholder="Nombre" class="input-name" required>
                <h3>Especie:</h3>
                <input type="text" placeholder="Especie" class="input-species" required>
                <h3>Fecha de ingreso:</h3>
                <input type="date" name="Fecha" class="input-date">
                <h3>Síntomas:</h3>
                <input type="text" placeholder="Síntomas" class="input-symptoms" required>
                <button>Añadir</button>
            </form>

            <ul class="patients-container">
            </ul>

            <ul class="patients-pendients">
                <h1>Pacientes pendientes:</h1>
            </ul>

            <ul class="patients-history">
                <h1>Historial de pacientes:</h1>
            </ul>
        `
    }

    AddPatient({name, species, date, symptoms, state}){
        const patientsContainer = this.shadowRoot.querySelector(".patients-container")
        if(state !== false){
            patientsContainer.innerHTML += `
                <patients-history></patients-history>
            `
        }
        patientsContainer.innerHTML = `
            <app-card name="${name}" species="${species}" date="${date}" symptoms="${symptoms}" state="${state}"></app-card>
        `
    }
}
customElements.define("app-board", AppPatientsBoard);
export default AppPatientsBoard;