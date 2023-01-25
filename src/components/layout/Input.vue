<template>
  <v-text-field
    class="font-weight-black"
    :value="value"
    :type="type"
    :label="label"
    @input="$emit('update-value', $event)"
    :hint="hint"
    lazy-rules
    :append-icon="appendIcon"
    @click:append="$emit('random')"
    persistent-hint
    :rules="rules" />
</template>
<script>
  export default {
    props: {
      type: String,
      label: String,

      value: String,
      rules: {
        type: Array,
        required: false,
      },
      appendIcon: {
        type: String,
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
