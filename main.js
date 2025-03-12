let num1= document.querySelector('#num1');
let num2= document.querySelector('#num2');
let num3= document.querySelector('#num3');

fetch('immobili.json')
    .then(response => response.json())
    .then(data => {
        let annunci_home = document.querySelector('#annunci_home');

        function visualizza_annunci_home() {
            let arr_home = data.filter(annuncio => annuncio.home === true);
            let cont = 1;
            let altezza = 400;
            let larghezza = 400;

            
            arr_home.forEach(annuncio => {
                if (cont <= 3) {
                    let prezzo = Math.floor(annuncio.prezzo).toLocaleString('it-IT');
                    
                    

                    let div = document.createElement('div');
                    div.classList.add('col-3'); // Per 3 colonne responsive

                    div.innerHTML = `
                        <div class="card mb-3">
                            <img src="https://picsum.photos/${larghezza}/${altezza}" class="card-img-top" alt="Immagine annuncio">
                            <div class="card-body">
                                <h5 class="card-title">€${prezzo}</h5>
                                <p class="card-text">Regione: ${annuncio.regione}</p>
                                <p class="card-text">Superficie: ${annuncio.superficie} m²</p>
                            </div>
                        </div>
                    `;

                    annunci_home.appendChild(div);
                    cont++;
                    larghezza++;
                    altezza++;
                }
            });
        }

        // Chiamata alla funzione per mostrare gli annunci
        visualizza_annunci_home();
    })
    .catch(error => console.error("Errore nel caricamento dei dati:", error));




function intervallo(elemento, maxNum, tempo){
    let counter=0;
    let interval1= setInterval(()=>{
        if(counter<=maxNum){
            elemento.innerHTML=counter;
            counter++;
            
        }else{
            clearInterval(interval1);
            return;
        }
    },tempo);
}
 
let controllo=0;

let osserva= new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{


        if(entry.isIntersecting && controllo==0){
        intervallo(num1, 1000, 100);
        intervallo(num2, 351, 35);
        intervallo(num3, 110, 70);
        controllo=1
        }
    }
    );
});

osserva.observe(num3)