<template>
  <v-container fluid>
    <v-row class="justify-center">
      <CardItem :opations="opations" />
    </v-row>
  </v-container>
</template>
<script>
  import CardItem from "../components/Cards/CardItem.vue";
  export default {
    components: { CardItem },
    data() {
      return {
        opations: [
          {
            title: "تحويل ملفات PDF",
            icon: "fa-file-pdf",
            color: "color: #CC0000",
            link: "pdf",
            class: true,
          },
          {
            title: "عرض ملفات",
            icon: "fa-folder-open",
            color: "color: #FFFF00",
            link: "get_archives",
            class: false,
          },

          {
            title: "ارشفة ملفات",
            icon: "fa-file-circle-plus",
            color: "color: #4a148c",
            link: "add_archives",
            class: true,
          },

          {
            title: "اعدادات الحساب",
            icon: "fa-gear",
            color: "color: #330000",
            link: "settings",
            class: false,
          },
        ],
      };
    },
  };
</script>
<style></style>
