export var MapModule = {
  map: null,
  init: async function () {
    this.initMap();
    await this.loadStates();
    this.bindEvents();
  },
  initMap: function () {
    const brasilCenter = [-14.2350, -51.9253];
    const brasilBounds = [
      [-34.0, -74.0], // sudoeste
      [5.5, -32.0]    // nordeste
    ];

    this.map = L.map('map', {
      center: brasilCenter,
      zoom: 4,
      minZoom: 4,
      maxZoom: 19,
      // maxBounds: brasilBounds,
      // maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a>',
      attributionControl: true
    }).addTo(this.map);

    this.map.attributionControl.setPrefix('');
  },
  loadStates: async function () {
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');

      if (!response.ok) {
        throw new Error(`Erro ao carregar estados: ${response.status}`);
      }

      const data = await response.json();
      this.populateStates(data); // Chamando como método do próprio objeto
    } catch (error) {
      console.error('Erro ao carregar estados:', error);
    }
  },
  populateStates: function (states) {
    const select = $('#states');
    select.empty();
    select.append('<option value="">Selecione um estado</option>');

    states.forEach(state => {
      select.append(`<option value="${state.id}">${state.nome} (${state.sigla})</option>`);
    });
  },
  loadCities: async function (stateId) {
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);

      if (!response.ok) {
        throw new Error(`Erro ao carregar cidades: ${response.status}`);
      }

      const data = await response.json();
      this.populateCities(data);
    } catch (error) {
      console.error('Erro ao carregar cidades:', error);
    }
  },
  populateCities: function (cities) {
    const select = $('#cities');
    select.empty();
    select.append('<option value="">Selecione uma cidade</option>');

    cities.forEach(city => {
      select.append(`<option value="${city.id}">${city.nome}</option>`);
    });
  },
  loadCityGeoJson: async function (cityId) {
    try {
      const url = `https://servicodados.ibge.gov.br/api/v2/malhas/${cityId}?formato=application/vnd.geo+json`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao carregar GeoJSON');

      const geoJson = await response.json();

      // Remove camada anterior se existir
      if (this.geoLayer) {
        this.map.removeLayer(this.geoLayer);
      }

      // Adiciona novo GeoJSON
      this.geoLayer = L.geoJSON(geoJson, {
        style: {
          color: '#007bff',
          weight: 2,
          fillOpacity: 0.3
        }
      }).addTo(this.map);

      // Ajusta zoom para o município
      this.map.fitBounds(this.geoLayer.getBounds());

    } catch (error) {
      console.error('Erro ao carregar município no mapa:', error);
    }
  },
  bindEvents: function () {
    $('#states').on('change', (e) => {
      const stateId = e.target.value;
      if (stateId) {
        this.loadCities(stateId);
        $('#cities, #cities-container').removeClass('hidden');
      }
    });
    $('#cities').on('change', (e) => {
      const cityId = e.target.value;
      if (cityId) {
        this.loadCityGeoJson(cityId);
      }
    });
  }
}