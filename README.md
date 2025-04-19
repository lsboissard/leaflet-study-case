# Leaflet Study Case

Este projeto é um estudo prático utilizando a biblioteca [Leaflet.js](https://leafletjs.com/) para exibição interativa de mapas, integrando dados geográficos e administrativos do [IBGE (Instituto Brasileiro de Geografia e Estatística)](https://servicodados.ibge.gov.br/api/docs/). A aplicação permite ao usuário selecionar um estado brasileiro e, em seguida, um município, o qual será destacado no mapa com base em dados GeoJSON oficiais.

## 📌 Funcionalidades

- Carregamento dinâmico de estados e municípios via API do IBGE
- Visualização de municípios com dados geográficos reais (GeoJSON)
- Zoom automático para ajuste da visualização do município selecionado
- Uso de Leaflet.js puro, sem frameworks
- Estrutura modular com JavaScript organizado em módulos

## 🗂️ Estrutura do Projeto

```plaintext
/index.html
/js/
  ├── app.js          # Arquivo principal (entrada)
  └── map.js          # Módulo com todas as funções do mapa e integração IBGE
/dist/
  └── style.css       # (opcional) Estilos personalizados
```

## 🛠️ Tecnologias Utilizadas

- [Leaflet.js](https://leafletjs.com/) — Biblioteca de mapas interativos
- [API de Localidades do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades)
- [API de Malhas Territoriais do IBGE](https://servicodados.ibge.gov.br/api/docs/malhas?versao=2)
- HTML5, CSS3 e JavaScript (ES Modules)
- (Opcional) Tailwind CSS ou CSS puro

## 🚀 Como executar localmente

1. Clone este repositório:

```bash
git clone https://github.com/lsboissard/leaflet-study-case.git
cd leaflet-study-case
```

2. Instale um servidor local simples, se ainda não tiver:

```bash
npm install -g serve
```

3. Inicie o servidor local:

```bash
serve .
# ou
npx serve
```

4. Acesse no navegador:

```
http://localhost:3000
```

⚠️ **Importante:** por se tratar de módulos ES (`import/export`), é necessário rodar com um servidor local — **não abra com `file://`**, ou verá erro de importação.

## 🧪 Exemplos de uso

- Selecionar **Bahia** → **Salvador** → o mapa se centraliza automaticamente na cidade.
- Mudar de estado ou município → a nova camada substitui a anterior no mapa.
- Funciona em qualquer navegador moderno, sem frameworks.

## 📌 APIs utilizadas

- [`/localidades/estados`](https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome)
- [`/localidades/estados/{UF}/municipios`](https://servicodados.ibge.gov.br/api/v1/localidades/estados/29/municipios)
- [`/malhas/{id}`](https://servicodados.ibge.gov.br/api/v2/malhas/{id}?formato=application/vnd.geo+json)

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para estudar, modificar e reutilizar.

---

Feito com 💚 por [Leonardo Boissard](https://github.com/lsboissard)
