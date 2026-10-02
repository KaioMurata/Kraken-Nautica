// ========================================================
// ARRAY DE EMBARCAÇÕES: Adicione quantos barcos quiser aqui.
// ========================================================
const barcos = [
    {
        id: 1,
        nome: "Lancha Kraken 300 Special",
        tipo: "lancha",      // lancha, iate, veleiro, jetski
        modalidade: "venda", // venda ou aluguel
        preco: 280000,
        precoFormatado: "R$ 280.000",
        especificacoes: "30 Pés • Cap. 10 Pessoas • Motor 300HP",
        imagem: "./styles/img/Barco.jpg"
    },
    {
        id: 2,
        nome: "Veleiro Sea Breeze 45",
        tipo: "veleiro",
        modalidade: "aluguel",
        preco: 4500,
        precoFormatado: "R$ 4.500 <span>/ diária</span>",
        especificacoes: "45 Pés • Cap. 14 Pessoas • Cabinado",
        imagem: "./styles/img/Barco2.png"
    },
    {
        id: 3,
        nome: "Iate Sea Luxury 45",
        tipo: "Iate",
        modalidade: "venda",
        preco: 420000,
        precoFormatado: "R$ 420.000",
        especificacoes: "38 Pés • Cap. 8 Pessoas • Ano 2021",
        imagem: "./styles/img/Barco3.png"
    },
    {
        id: 4,
        nome: "Iate de luxoRXT 300",
        tipo: "Iate",
        modalidade: "aluguel",
        preco: 1200,
        precoFormatado: "R$ 1.200 <span>/ diária</span>",
        especificacoes: "3 LUGARES • 300HP • Bluetooth",
        imagem: "./styles/img/barco4.png"
    },
    {
        id: 5,
        nome: "veleiro 99",
        tipo: "veleiro",
        modalidade: "venda",
        preco: 195000,
        precoFormatado: "R$ 195.000",
        especificacoes: "29 Pés • Cap. 9 Pessoas • Parede Dupla",
        imagem: "./styles/img/barco5.png"
    },
    {
        id: 6,
        nome: "Barco Vinks",
        tipo: "Vinks",
        modalidade: "venda",
        preco: 1200000,
        precoFormatado: "R$ 1.200.000",
        especificacoes: "60 Pés • 3 Suítes • Flybridge Gigante",
        imagem: "./styles/img/barco6.png"
    },
    {
        id: 7,
        nome: "Navio de guerra 77",
        tipo: "Navio de guerra",
        modalidade: "aluguel",
        preco: 2500,
        precoFormatado: "R$ 10.000 <span>/ diária</span>",
        especificacoes: "26 Pés • Cap. 33 Pessoas • Churrasqueira",
        imagem: "./styles/img/barco7.jpg"
    },
    {
        id: 8,
        nome: "Titanic triton",
        tipo: "Titanic",
        modalidade: "aluguel",
        preco: 50.000,
        precoFormatado: "R$ 3.800 <span>/ diária</span>",
        especificacoes: "41 Pés • Cap. 1.500 Pessoas • Piloto Automático",
        imagem: "./styles/img/barco8.png"
    },
    {
        id: 9,
        nome: "Iate Yamaha FX Cruiser",
        tipo: "iate",
        modalidade: "venda",
        preco: 98000,
        precoFormatado: "R$ 98.000",
        especificacoes: "7 LUGARES • Motor 1.8L • Escada de Reembarque",
        imagem: "./styles/img/barco9.jpg"
    },
    {
        id: 10,
        nome: "Jet ski triton 350",
        tipo: "jetski",
        modalidade: "venda",
        preco: 340000,
        precoFormatado: "R$ 340.000",
        especificacoes: "30 Pés • Cap. 2 Pessoas • Banheiro Fechado",
        imagem: "./styles/img/barco10.png"
    }
];

// Elementos da Interface
const gridContainer = document.getElementById("cards-grid");
const intentFilter = document.getElementById("intent");
const typeFilter = document.getElementById("type");
const priceFilter = document.getElementById("price");
const btnReset = document.getElementById("btn-reset");

// Função para exibir os cards na tela
function renderizarBarcos(lista) {
    gridContainer.innerHTML = "";

    if (lista.length === 0) {
        gridContainer.innerHTML = `<p class="no-results">Nenhuma embarcação encontrada com os filtros selecionados.</p>`;
        return;
    }

    lista.forEach(barco => {
        const badgeClass = barco.modalidade === "venda" ? "badge-sale" : "badge-rent";
        const badgeText = barco.modalidade === "venda" ? "Venda" : "Aluguel";

        const cardHTML = `
            <article class="card">
                <div class="card-image">
                    <span class="badge ${badgeClass}">${badgeText}</span>
                    <img src="${barco.imagem}" alt="${barco.nome}" onerror="this.src='./styles/img/barco11.png'">
                </div>
                <div class="card-body">
                    <h3>${barco.nome}</h3>
                    <p class="specs">${barco.especificacoes}</p>
                    <p class="price">${barco.precoFormatado}</p>
                    <a href="https://wa.me/5511999999999?text=Olá!%20Tenho%20interesse%20no%20${encodeURIComponent(barco.nome)}" target="_blank" class="btn btn-card">Tenho Interesse</a>
                </div>
            </article>
        `;
        gridContainer.innerHTML += cardHTML;
    });
}

// Lógica de Filtragem
function aplicarFiltros() {
    const intent = intentFilter.value;
    const type = typeFilter.value;
    const price = priceFilter.value;

    const filtrados = barcos.filter(barco => {
        const matchIntent = intent === "todos" || barco.modalidade === intent;
        const matchType = type === "todos" || barco.tipo === type;

        let matchPrice = true;
        if (price === "1") {
            matchPrice = barco.modalidade === "venda" ? barco.preco <= 200000 : barco.preco <= 2000;
        } else if (price === "2") {
            matchPrice = barco.modalidade === "venda" ? (barco.preco > 200000 && barco.preco <= 500000) : (barco.preco > 2000 && barco.preco <= 5000);
        } else if (price === "3") {
            matchPrice = barco.modalidade === "venda" ? barco.preco > 500000 : barco.preco > 5000;
        }

        return matchIntent && matchType && matchPrice;
    });

    renderizarBarcos(filtrados);
}

// Event Listeners (Filtra instantaneamente ao mudar qualquer campo)
intentFilter.addEventListener("change", aplicarFiltros);
typeFilter.addEventListener("change", aplicarFiltros);
priceFilter.addEventListener("change", aplicarFiltros);

btnReset.addEventListener("click", () => {
    intentFilter.value = "todos";
    typeFilter.value = "todos";
    priceFilter.value = "todos";
    renderizarBarcos(barcos);
});

// Controle do header com verificação de direção de scroll
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        header.classList.add('shrunk');
    } else if (currentScrollY < 30) {
        header.classList.remove('shrunk');
    }

    lastScrollY = currentScrollY;
}, { passive: true });



// Inicializa o catálogo ao carregar a página
renderizarBarcos(barcos);