var app = {
  init: async function () {
    await this.loadStates();
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
  handleStateChange: function () {
    const stateId = $('#states').val();
    if (stateId) {
      this.loadCities(stateId);
    } else {
      $('#cities').empty().append('<option value="">Selecione uma cidade</option>');
    }
  }
}

app.init();