<template>
  <v-textarea
    class="font-weight-black"
    :value="value"
    :type="type"
    :label="label"
    rows="1"
    lazy-rules
    clearable
    :prepend-icon="icon"
    :color="color"
    @input="$emit('update-value', $event)"
    :hint="hint"
    persistent-hint
    :rules="rules"></v-textarea>
</template>
<script>
  export default {
    props: {
      type: String,
      label: String,
      icon: String,
      color: String,
      value: String,
      rules: {
        type: Array,
        required: false,
      },
      hint: {
        type: String,
        required: false,
      },
    },
    methods: {},
  };
</script>
