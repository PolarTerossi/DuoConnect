/**
 * @file Gerencia o mapa interativo e a exibição de informações das lojas.
 * @author DuoConnect
 * @version 1.0.0
 */

// Módulo principal da página de Localização
const LocationPage = {
    /**
     * Elementos do DOM.
     * @property {HTMLElement} mapContainer - O container onde o mapa será renderizado.
     * @property {HTMLElement} storeInfoPanel - O painel que exibe as informações da loja.
     */
    elements: {},

    /**
     * Dados das lojas a serem exibidas no mapa.
     * @type {Array<Object>}
     */
    storesData: [
        { nome: "Lojas Telex - Barra da Tijuca - Rio de Janeiro", lat: -23.004275, lng: -43.317095, endereco: "Avenida das Américas, 500, bloco 2, loja 105, Shopping Downtown, Barra da Tijuca, Rio de Janeiro/RJ, CEP 22640-904", imagem: "Imagens/LojasTelex/Barra.png", tipo: "telex" },
        { nome: "Lojas Telex - Botafogo - Rio de Janeiro", lat: -22.95563, lng: -43.19620, endereco: "Rua Voluntários da Pátria, 445, loja 103, Botafogo, Rio de Janeiro/RJ, CEP 22270-005", imagem: "Imagens/LojasTelex/Botafogo.png", tipo: "telex" },
        { nome: "Lojas Telex - Campos dos Goytacazes", lat: -21.763614, lng: -41.323889, endereco: "Rua Treze de Maio, 262, loja 03, Centro, Campos dos Goytacazes/RJ, CEP 28010-260", imagem: "Imagens/LojasTelex/CdG.png", tipo: "telex" },
        { nome: "Loja Telex - Centro - Rio de Janeiro", lat: -22.912362, lng: -43.174580, endereco: "Avenida Rio Branco, 156, loja B, Edifício Avenida Central, Centro, Rio de Janeiro/RJ, CEP 20040-901.", imagem: "Imagens/LojasTelex/Centro.png", tipo: "telex" },
        { nome: "Loja Telex - Copacabana - Rio de Janeiro", lat: -22.976542, lng: -43.190083, endereco: "Avenida Nossa Senhora de Copacabana, 959, loja A, Copacabana, Rio de Janeiro/RJ, CEP 22060-001", imagem: "Imagens/LojasTelex/Copa.png", tipo: "telex" },
        { nome: "Loja Telex - Icaraí - Niterói", lat: -22.904284, lng: -43.110510, endereco: "Travessa Capitão Zeferino, 27, loja 101, Icaraí, Niterói/RJ, CEP 24220-230", imagem: "Imagens/LojasTelex/Icarai.png", tipo: "telex" },
        { nome: "Loja Telex - Ipanema - Rio de Janeiro", lat: -22.984172, lng: -43.205976, endereco: "Rua Visconde de Pirajá, 351, loja 220, Edifício Fórum de Ipanema (Galeria Fórum), Ipanema, Rio de Janeiro/RJ, CEP 22410-906", imagem: "Imagens/LojasTelex/Ipa.png", tipo: "telex" },
        { nome: "Loja Telex - Madureira - Rio de Janeiro", lat: -22.873259, lng: -43.339157, endereco: "Estrada do Portela, 99, loja 276, Condomínio do Edifício Polo 1, Madureira, Rio de Janeiro/RJ, CEP 21351-901", imagem: "Imagens/LojasTelex/Madu.png", tipo: "telex" },
        { nome: "Telex - Méier - Rio de Janeiro", lat: -22.902875, lng: -43.282604, endereco: "Rua Dias da Cruz, 188, loja 143 H, Centro Comercial Méier (Galeria Oxford), Méier, Rio de Janeiro/RJ, CEP 20720-900", imagem: "Imagens/LojasTelex/Meier.png", tipo: "telex" },
        { nome: "Telex - Centro - Niterói", lat: -22.893111, lng: -43.121344, endereco: "Rua Maestro Felício Toledo, 500, loja 103, Centro, Niterói/RJ, CEP 24030-107", imagem: "Imagens/LojasTelex/nit.png", tipo: "telex" },
        { nome: "Telex - Tijuca", lat: -22.924854, lng: -43.232169, endereco: "Praça Saenz Pena, 45, loja 323, Shopping 45, Tijuca, Rio de Janeiro/RJ, CEP 20520-900", imagem: "Imagens/LojasTelex/tijuca.png", tipo: "telex" },
        { nome: "Phillips - Ipanema", lat: -22.984508, lng: -43.205713, endereco: "Rua Visconde de Pirajá, 351, loja 207, Ipanema, Rio de Janeiro/RJ, CEP 22410-003.", imagem: "Imagens/Lojasphillips/ipa.png", tipo: "philips" },
        { nome: "Phillips - Tijuca", lat: -22.924928, lng: -43.231985, endereco: "Praça Saenz Peña, 45, loja 235, Tijuca, Rio de Janeiro/RJ, CEP 20520-090", imagem: "Imagens/LojasPhillips/tijuca.png", tipo: "philips" },
        { nome: "Phillips - Barra da Tijuca", lat: -23.004274, lng: -43.317102, endereco: "Avenida das Américas, 500, bloco 9, loja 105, Barra da Tijuca, Rio de Janeiro/RJ, CEP 22640-904", imagem: "Imagens/LojasPhillips/barra.png", tipo: "philips" },
        { nome: "Phillips - Icaraí - Niterói", lat: -22.906024, lng: -43.112158, endereco: "Rua Ator Paulo Gustavo, 160, loja 108, Icaraí, Niterói/RJ, CEP 24230-062", imagem: "Imagens/LojasPhillips/icarai.png", tipo: "philips" },
        { nome: "Phillips - Centro - Itaperuna", lat: -21.203488, lng: -41.889752, endereco: "Rua Dez de Maio, 500, sala 1215, Centro, Itaperuna/RJ, CEP 28300-000", imagem: "Imagens/LojasPhillips/ita.png", tipo: "philips" },
        { nome: "Phillips - Copacabana", lat: -22.970728, lng: -43.186757, endereco: "Avenida Nossa Senhora de Copacabana, 680, loja SS F, Copacabana, Rio de Janeiro/RJ, CEP 22050-900", imagem: "Imagens/LojasPhillips/copa.png", tipo: "philips" },
        { nome: "Phillips - Madureira", lat: -22.872898, lng: -43.338909, endereco: "Estrada do Portela, 99, loja 279, Madureira, Rio de Janeiro/RJ, CEP 21351-901", imagem: "Imagens/LojasPhillips/madu.png", tipo: "philips" },
        { nome: "Phillips - Centro - São Gonçalo", lat: -22.822901, lng: -43.043359, endereco: "Rua Doutor Nilo Peçanha, 100, loja 03, Centro, São Gonçalo/RJ, CEP 24445-360", imagem: "Imagens/LojasPhillips/sg.png", tipo: "philips" },
    ],

    /**
     * Inicializa o módulo.
     */
    init() {
        this.elements.mapContainer = document.getElementById('map');
        this.elements.storeInfoPanel = document.getElementById('storeInfo');

        if (this.elements.mapContainer) {
            this.setupMap();
        }
    },

    /**
     * Configura e renderiza o mapa Leaflet e seus marcadores.
     */
    setupMap() {
        const map = L.map(this.elements.mapContainer).setView([-22.20, -42.65], 8);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const blueIcon = this.createMarkerIcon('blue');
        const goldIcon = this.createMarkerIcon('gold');

        this.storesData.forEach((store, index) => {
            const icon = store.tipo === "philips" ? goldIcon : blueIcon;

            // Pequeno deslocamento para evitar sobreposição
            const offsetLat = (Math.random() - 0.5) * 0.001;  // ~100m de variação
            const offsetLng = (Math.random() - 0.5) * 0.001;

            const marker = L.marker([store.lat + offsetLat, store.lng + offsetLng], { icon });
            
            marker.bindPopup(`<b>${store.nome}</b>`);
            marker.on("click", () => this.displayStoreInfo(store));
            marker.addTo(map);
        });

        // Exibe a primeira loja da lista por padrão
        if (this.storesData.length > 0) {
            this.displayStoreInfo(this.storesData[0]);
        }
    },

    /**
     * Exibe as informações da loja selecionada no painel lateral.
     * @param {object} store - O objeto da loja contendo nome, imagem, endereço, etc.
     */
    displayStoreInfo(store) {
        if (!this.elements.storeInfoPanel || !store) return;
        
        const encodedAddress = encodeURIComponent(store.endereco);
        this.elements.storeInfoPanel.innerHTML = `
            <h2 class="text-2xl font-bold mb-4" style="color: #2b3b94;">${store.nome}</h2>
            <img src="${store.imagem}" alt="Foto da loja ${store.nome}" class="w-full h-72 object-cover rounded mb-6" />
            <p class="text-gray-700 mt-4">${store.endereco}</p>
            <a href="https://maps.google.com/?q=${encodedAddress}"
               target="_blank"
               rel="noopener noreferrer"
               class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
               Ver no Google Maps
            </a>`;
    },

    /**
     * Cria um ícone de marcador customizado para o Leaflet.
     * @param {string} color - A cor do marcador (ex: 'blue', 'gold').
     * @returns {L.Icon} - Uma instância do ícone Leaflet.
     */
    createMarkerIcon(color) {
        return L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }
};

// Inicializa o módulo quando o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', () => LocationPage.init());