const { createApp } = Vue;

createApp({
  data() {
    return {
      eventos: [] /* todos los eventos */,
      eventosPasados: [],
      /*       eventosMostrar:[],
       */ categorias: [] /* categorias */,
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
        let currentDate = data.currentDate;
        this.eventosPasados = this.eventos.filter(
          (evento) => evento.date < currentDate
        );
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
        let filtro = this.eventosPasados.filter(event => event.name.toLowerCase().includes(this.vModelSearch.toLowerCase().trim()))

        if(this.vModelCheck.length > 0){
          filtro = filtro.filter(event => this.vModelCheck.includes(event.category))
        }

        return filtro;
        
      },
  },
}).mount("#app");
