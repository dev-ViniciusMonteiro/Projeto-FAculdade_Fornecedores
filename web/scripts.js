const carregar = async () => {
  const response = await fetch('http://127.0.0.1:3000/api/fornecedores/');
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson)
  // do something with myJson
}

const cadastrar = async () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    await xhttp.open("POST", "http://127.0.0.1:3000/api/fornecedores/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(`{
    "empresa":"teste",
    "email":"email@teste.com",
    "categoria":"testeee",
    "valor":"20"
}`);
}