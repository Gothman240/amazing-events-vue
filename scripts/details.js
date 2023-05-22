const { createApp } = Vue;

createApp({
  data() {
    return {
      eventoDetails: [],
    };
  },
  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let param = new URLSearchParams(location.search);
        let getId = param.get('_id');
 
        this.eventoDetails = data.events.find(event => event._id == getId);  
        
      })
      .catch((error) => console.error(error));
  },
  methods: {
    
  },
}).mount("#app");
