Vue.component("v-autocompleter", {
  props: ['inputContent', 'count'],
  data: function () {
    return {
      animals: animals,
      isActive: false,
    }
  },
  template:
    `<ul v-bind:class="getClass">
      <li class="input-autocomplete-item" v-for="n in displayHints" v-on:click="updateInput">{{ n }}</li>
    </ul>`,
  computed: {
    displayHints: function () {
      let filtered = [];
      if (this.inputContent !== '') {
        filtered = this.animals.filter(
          (animal) =>
            animal
              .toLowerCase()
              .startsWith(this.inputContent.toLowerCase()));
      }
      if (filtered.length === 1 && filtered[0] === this.inputContent) {
        this.isActive = false;
      } else if (filtered.length > 0) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
      return filtered.slice(0, this.count);
    },
    getClass: function () {
      return this.isActive ? 'active' : '';
    }
  },
  methods: {
    updateInput: function (event) {
      console.log(event.target.innerHTML);
      this.$emit('update-input', event.target.innerHTML);
      this.isActive = false;
    }
  }
})

new Vue({
  el: '#app',
  data() {
    return {
      inputContent: "",

    }
  },
  methods: {
    changeInputContent: function (value) {
      this.inputContent = value;
    }
  }
})

