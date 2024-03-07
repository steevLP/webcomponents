class MeineKomponente extends HTMLElement {
    constructor() {
        super();
        // erstellt ein Shadow DOM für die Komponente
        this.attachShadow({ mode: 'open' });

        // Definiert das Template der Komponente
        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" type="text/css" href="components/alert/style.css" />
            <h1><slot name="header"></slot></h1>
            <slot></slot>
            <br>
            <hr>
            <button id="button">Klick mich!</button>
        `;

        const templateInhalt = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateInhalt);

        // Fügen Sie einen Eventlistener hinzu, um auf Klicks auf den Button zu reagieren
        this.shadowRoot.getElementById('button').addEventListener('click', this.handleClick.bind(this));
    }

    // Methode, die aufgerufen wird, wenn der Button geklickt wird
    handleClick() {
        // Ereignis erstellen
        const event = new Event("build", {
            bubbles: true, // Das Ereignis kann durch die DOM-Hierarchie aufsteigen
            composed: true // Das Ereignis kann durch Shadow DOM-Grenzen hindurch gelangen
        });
        
        // Ereignis auslösen
        this.dispatchEvent(event);
    }
}

// Registriert die Webkomponente
customElements.define('meine-komponente', MeineKomponente);