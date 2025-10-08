//DOM
const inputItem = document.getElementById("item-input");
const form = document.getElementById("add-item-form");
const lista = document.getElementById("items-list");
const btnRemoverComprados = document.getElementById("clear-bought");
const btnSelecionartodos = document.getElementById("select-all");
const btnMostraComprados = document.getElementById("comprados");
const btnMostrarPendentes = document.getElementById("pendentes");
const btnTodos = document.getElementById("todos");


//[x] Pegar valor do input item
//[x] criar elemento li
//[x] adicionar conteudo no li
//[x] adicionar li a lista
//[x] limpar o campo de texto ao adicionar compra
// adicionar marcacao ao clique na tarefa
//[x] adicionar barra de rolagem ao ultrapassar certo limite
let compras = JSON.parse(localStorage.getItem("compras")) || [];

// garante id unico e tipo booleano correto
compras = compras.map(item => ({
    id: item.id ?? crypto.randomUUID(),
    nome : item.nome,
    comprado : !!item.comprado
}));

function atualizarUI(listaDeItens = compras) {
    lista.innerHTML = "";

    listaDeItens.forEach((compra) => {
    const li = document.createElement("li");
    li.textContent = compra.nome;
    li.style.cursor = "pointer";
    li.dataset.id = compra.id;

    if(compra.comprado)
        li.classList.add("checked");

    // ajustar
    li.addEventListener("click", () => {
        // compras = compras.map(item => ({ ...item, comprado: true }));
        compra.comprado = !compra.comprado;
        li.classList.toggle("checked", compra.comprado);
        // console.log("lista cliclado");
        localStorage.setItem("compras", JSON.stringify(compras));
        atualizarContador();
    });
    lista.appendChild(li);

    if (compras.length > 0) {
        return document.getElementById("empty-state").style.display = "none";
    };
        
    });
    
   atualizarContador(); 
//    localStorage.setItem("compras", JSON.stringify(compras));
}
// adicionar itens
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valor = inputItem.value.trim();
    if (!valor) return;
    
    compras.push({nome: valor, comprado: false});
    console.log(compras);
    inputItem.value= "";
    
    

    
    atualizarUI();
    // armazenar em LocalStorage
    localStorage.setItem("compras", JSON.stringify(compras));
    
    
});

//[x] adicionar opcaao de marcar todos
    btnSelecionartodos.addEventListener("click", () => {
        compras = compras.map(item => ({ ...item, comprado: true }));
        atualizarUI();
        localStorage.setItem("compras", JSON.stringify(compras));
        console.log("clicado selecionados");
});

// mostrar todos itens
btnTodos.addEventListener("click", () => {
    atualizarUI();
})

// filtrar por pendentes
btnMostrarPendentes.addEventListener("click", () => {
    const pendentes = compras.filter(item => !item.comprado);
    atualizarUI(pendentes);
    console.log("clicado pendentes");
        
    });
// filtrar por comprados
btnMostraComprados.addEventListener("click", () => {
    const comprados = compras.filter(item => item.comprado);
    atualizarUI(comprados);
    console.log("clicado comprados");
       
    });

//[x] adicionar remover comprados
btnRemoverComprados.addEventListener("click", () => {
    console.log("clicado remover");
    compras = compras.filter(item => !item.comprado);
    localStorage.setItem("compras", JSON.stringify(compras));
    atualizarUI();
    
});
//[x] mostrar quantidade de todos filtros
function atualizarContador() {
    const total = compras.length;
    const pendentes = compras.filter(item => !item.comprado).length;
    const comprados = compras.filter(item => item.comprado).length;
    document.getElementById("stats").textContent = `${total} itens • 
    ${pendentes} pendentes • ${comprados} comprados`;
}

atualizarUI();