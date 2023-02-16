<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="value"
        :rules="rules"
        clearable
        :label="label"
        :prepend-icon="icon"
        readonly
        :color="color"
        class="font-weight-black"
        v-bind="attrs"
        v-on="on"></v-text-field>
    </template>
    <v-date-picker
      :value="value"
      :color="color"
      @input="$emit('update-value', $event)"
      @change="menu = false"></v-date-picker>
  </v-menu>
</template>
<script>
  export default {
    props: {
      color: String,
      label: String,
      icon: String,
      value: {
        type: String,
        required: true,
      },
      rules: {
        type: Array,
        required: false,
      },
    },
    data() {
      return {
        menu: false,
      };
    },
  };
</script>
