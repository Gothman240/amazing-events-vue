const { createApp } = Vue;

createApp({
  data() {
    return {
      eventos: [] /* todos los eventos */,
      eventosMostrar: [], /* copia de eventos */
      mayorAsistencia: "", /* tabla general */
      menorAsistencia: "", /* tabla general */
      mayorCapacidad: "", /* tabla general */
      arraysCategoriasFuturas: [],
      ObjetoCategoriaFuturas: {},
      arraysCategoriasPasadas: [],
      ObjetoCategoriaPasadas: {},
    };
  },
  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.eventos = data.events;
        const currentDate = data.currentDate;
        this.eventosMostrar = this.eventos;
        /* eventos pasados */
        this.filtroEventosPasados = this.eventos.filter(
          (evento) => evento.date < currentDate
        );
        /* eventos futuros */
        this.filtroEventosFuturos = this.eventos.filter(
          (evento) => evento.date > currentDate
        );
        /*  */
        let categoriasSinRepetir = Array.from(
          new Set(this.eventos.map((categoria) => categoria.category))
        );
        console.log(categoriasSinRepetir)
        /* primera tabla */
        this.mayorAsistencia = this.eventoMayorAsistencia(this.eventos);
        this.menorAsistencia = this.eventoMenorAsistencia(this.eventos);
        this.mayorCapacidad = this.eventoMasCapacidad(this.eventos)
        /* objeto de categorias pasadas */
        const categoriasPasadas = this.arrayEventos(categoriasSinRepetir, this.filtroEventosPasados);
        this.objetoGananciaPorcentaje(categoriasPasadas, this.ObjetoCategoriaPasadas)
        
        /* objeto de categorias futuras */
        const categoriasFuturas = this.arrayEventos(categoriasSinRepetir, this.filtroEventosFuturos);
        console.log(categoriasFuturas)
        this.objetoGananciaPorcentaje(categoriasFuturas, this.ObjetoCategoriaFuturas)
        console.log(this.ObjetoCategoriaFuturas)
      })
      .catch((error) => console.error(error));
  },
  methods: {
    eventoMayorAsistencia(data) {
      const array = data.slice();

      let porcentaje = (evento) => (evento.assistance / evento.capacity) * 100;

      array.sort((a, b) => {
        return porcentaje(b) - porcentaje(a);
      });

      return `${array[0].name} | ${porcentaje(array[0]).toFixed(2)}%`;
    },

    eventoMenorAsistencia(data) {
      const array = data.slice();

      let porcentaje = (evento) => (evento.assistance / evento.capacity) * 100;

      array.sort((a, b) => {
        return porcentaje(a) - porcentaje(b);
      });

      return `${array[0].name} | ${porcentaje(array[0]).toFixed(2)}%`;
    },

    eventoMasCapacidad(data) {
      const array = data.slice();

      array.sort((a, b) => {
        return b.capacity - a.capacity;
      });

      return `${array[0].name} | ${array[0].capacity}`;
    },

    /* crear objeto segun la tabla pasado o upcoming */
    arrayEventos(array, filtro){
      const arraysCategorias = array.reduce((acumulador, categoria) => {
        const objetosCategoria = filtro.filter(
          (objeto) => objeto.category === categoria
        );
        if(objetosCategoria.length != 0){
          acumulador[categoria] = objetosCategoria;
        }
        return acumulador;
      }, []);
      return arraysCategorias;
    },

    objetoGananciaPorcentaje(array, objetoAmodificar){
      for (const categoria in array) {
        const itemsCategoria = array[categoria];
  
        let gananciaTotal = 0;
        let porcentajeTotal = 0;
        for (let i = 0; i < itemsCategoria.length; i++) {
          const item = itemsCategoria[i];
          const gananciaItem = item.price * (item.assistance ? item.assistance : item.estimate);
          const porcentaje = (((item.assistance ? item.assistance : item.estimate) / item.capacity) * 100)/itemsCategoria.length
          gananciaTotal += gananciaItem;
          porcentajeTotal += porcentaje;
        }
  
         objetoAmodificar[categoria] = {
          nombre: categoria,
          ganancia: gananciaTotal.toLocaleString(),
          porcentaje: porcentajeTotal.toFixed(2),
        };
      }
    },
    

    
  },
  computed: {
    
  },
}).mount("#app");
