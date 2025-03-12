fetch('immobili.json')
    .then(response => response.json())
    .then(data => {
        function visualizza_annunci(filtrati = data) {
            let cont_annunci = document.querySelector('#cont_annunci');
            cont_annunci.innerHTML = '';
            let altezza = 400;
            let larghezza = 400;

            filtrati.forEach(annuncio => {
                let prezzo = Math.floor(annuncio.prezzo).toLocaleString('it-IT');
                let div = document.createElement('div');
                div.classList.add('col-12', 'col-sm-3');

                div.innerHTML = 
                    `<div class="card mb-3">
                        <img src="https://picsum.photos/${larghezza}/${altezza}" class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">€${prezzo}</h5>
                            <p class="card-text">Regione: ${annuncio.regione}</p>
                            <p class="card-text">Superficie: ${annuncio.superficie} m²</p>
                            <p class="card-text">Camere: ${annuncio.n_camere}</p>
                            <p class="card-text">Piscina: ${annuncio.piscina ? "Sì" : "No"}</p>
                            <p class="card-text">Giardino: ${annuncio.giardino ? "Sì" : "No"}</p>
                        </div>
                    </div>`;
                
                cont_annunci.appendChild(div);
                altezza++;
                larghezza++;
            });
        }

        function set_regioni() {
            let filtri_regione = document.querySelector('#filtri_regione');
            filtri_regione.innerHTML = '';
            
            let tutteDiv = document.createElement('div');
            tutteDiv.classList.add('form-check');
            tutteDiv.innerHTML = 
                `<input type="radio" name="regioni" value="Tutte" id="tutte" class="me-1" checked />
                <label for="tutte">Tutte le regioni</label>`;
            filtri_regione.appendChild(tutteDiv);
            
            let uniche_regioni = [...new Set(data.map(annuncio => annuncio.regione))];
            
            uniche_regioni.forEach(regione => {
                let div = document.createElement('div');
                div.classList.add('form-check');
                div.innerHTML = 
                    `<input type="radio" name="regioni" value="${regione}" id="${regione}" class="me-1"/>
                    <label for="${regione}">${regione}</label>`;
                filtri_regione.appendChild(div);
            });
        }

        function filtra_annunci() {
            let regione_selezionata = document.querySelector('input[name="regioni"]:checked').value;
            let prezzo_massimo = document.querySelector('#inputPrezzo').value;
            let titolo = document.querySelector('#titolo');
            
            let annunci_filtrati = data.filter(annuncio => 
                (regione_selezionata === "Tutte" || annuncio.regione === regione_selezionata) &&
                annuncio.prezzo <= prezzo_massimo
            );
            
            if (regione_selezionata === "Tutte") {
                titolo.textContent = `Tutte le regioni fino a €${Number(prezzo_massimo).toLocaleString('it-IT')}`;
            } else {
                titolo.textContent = `${regione_selezionata} fino a €${Number(prezzo_massimo).toLocaleString('it-IT')}`;
            }
            
            visualizza_annunci(annunci_filtrati);
        }

        visualizza_annunci();
        set_regioni();

        document.querySelector('#filtri_regione').addEventListener('change', filtra_annunci);
        document.querySelector('#inputPrezzo').addEventListener('input', filtra_annunci);
    })
    .catch(error => console.error('Errore nel recupero dei dati:', error));
