class AppPatientsCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    static get observedAttributes(){
        return ["name", "species", "date", "symptoms", "state"]
    }
    connectedCallback(){
        this.remder();
    }
    attributeChangedCallback(propname, oldValue, newValue){
        this.render();
        if(oldValue !== newValue){
            this[propname] = propname === "state" ? newValue === "true" : newValue;
            this.render();
        }
    }
    togglePatient(){
        this.state = !this.state;
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./src/components/PatientCard/PatientCard.css">
            <li class=${this.state ? "atendido" : "patient"}>
                <h3>${this.name}</h3>
                <h4>${this.species}</h4>
                <h4>${this.symptoms}</h4>
                <p>${this.date}</p>
                <p>${this.state ? "atendido":"pendiente"}</p>
                    <input type="checkbox" ${this.state ? "checked" : ""} class="patient-checkbox">
            </li>
        `
        const checkbox = this.shadowRoot.querySelector(".patient-checkbox")
        checkbox.addEventListener("change", () => this.togglePatient());
    }
}
customElements.define("app-card", AppPatientsCard);
export default AppPatientsCard;