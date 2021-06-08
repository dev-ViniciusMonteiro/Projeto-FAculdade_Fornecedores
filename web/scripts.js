const carregar = async () => {
    const response = await fetch('http://127.0.0.1:3000/api/fornecedores/');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson)
    // do something with myJson
}

const cadastrar = async () => {
    var xhttp = new XMLHttpRequest();
    let $ = document.querySelector.bind(document);//precisa do bind pra manter o document
    empresa = document.getElementById('empresa').value
    email = document.getElementById('email').value
    categoria = document.getElementById('categoria').value
    valor = document.getElementById('valor').value
    let fornecedor = {
        empresa: empresa,
        email: email,
        categoria: categoria,
        valor: valor
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    await xhttp.open("POST", "http://127.0.0.1:3000/api/fornecedores/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(`${fornecedor}`);
}