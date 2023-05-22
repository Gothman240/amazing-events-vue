const { createApp } = Vue;

createApp({
  data() {
    return {
      eventos: [] /* todos los eventos */,
      eventosMostrar:[],
      categorias: [] /* categorias */,
      vModelSearch: "" /* buscador */,
      vModelCheck: [] /* categorias seleccionadas */,
    };
  },
  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.eventos = data.events;
        this.eventosMostrar = this.eventos
        this.getCategorias(this.eventos);
      })
      .catch((error) => console.error(error));
  },
  methods: {
    getCategorias(array) {
      this.categorias = [...new Set(array.map((item) => item.category))];
    },
  },
  computed: {
    filtrado() {
      let filtro = this.eventos.filter((value) =>
        value.name
          .toLowerCase()
          .includes(this.vModelSearch.toLowerCase().trim())
      );
 
      if(!this.vModelCheck.length){
        this.eventosMostrar = filtro
      }else this.eventosMostrar = filtro.filter(event => this.vModelCheck.includes(event.category)) 

    },
  },
}).mount("#app");
