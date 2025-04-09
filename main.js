//Snack 1
//Ottieni il titolo di un post con una Promise.

//Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera
//il titolo di un post dal link https://dummyjson.com/posts/{id}
//Bonus: Ottieni l'intero post con l'autore
//Crea una funzione getPost(id) che recupera l'intero post.
//Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore,
//recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

function getPostTitle(id) {
  const promessa = new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => response.json())
      .then((obj) => resolve(obj.title))
      .catch(reject);
  });
  return promessa;
}

getPostTitle(2)
  .then((obj) => console.log(obj))
  .catch((error) => console.error(error));

function getPost(id) {
  const promessa = new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => response.json())
      .then((post) => {
        fetch(`https://dummyjson.com/users/${post.userId}`)
          .then((response) => response.json())
          .then((author) => resolve({ ...post, author }))
          .catch(reject);
      })
      .catch(reject);
  });
  return promessa;
}

getPost(1)
  .then((post) => console.log(post))
  .catch((error) => console.error(error));

//Snack 2
//Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6.
//Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
//Bonus: HOF con closure per memorizzare l'ultimo lancio
//Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato.
//Se il numero esce due volte di fila, stampa "Incredibile!".

function lanciaDado() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject("il dado si è incastrato");
      } else {
        const risultato = Math.floor(Math.random() * 6) + 1;
        resolve(risultato);
      }
    }, 3000);
  });
}

lanciaDado()
  .then((risultato) => console.log("Il numero è:", risultato))
  .catch((error) => console.error(error));

function crealanciaDado() {
  let primoLancio = null;

  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.2) {
          primoLancio = null;
          reject("il dado si è incastrato");
        } else {
          const risultato = Math.floor(Math.random() * 6) + 1;
          if (risultato === primoLancio) {
            console.log("incredibile");
          }
          primoLancio = risultato;
          resolve(risultato);
        }
      }, 3000);
    });
  };
}

const lanciaDadoConMemoria = crealanciaDado();

lanciaDadoConMemoria()
  .then((risultato) => console.log("Il numero è:", risultato))
  .catch((error) => console.error(error));
lanciaDadoConMemoria()
  .then((risultato) => console.log("Il numero è:", risultato))
  .catch((error) => console.error(error));
