<script setup lang="ts">
    import { ref, watch } from 'vue'
    import Select from 'primevue/select';

    const model  = defineModel()
    const year  = ref<number>(2024)
    const years = [...Array(50)].map((v, i) => 2000 + i);
    
    watch(year, ()=>{
       model.value = year.value.toString()
    })


</script>

<template>
    <label for="month" class="font-bold block mb-2">    Год    </label>
    <Select :options="years" v-model="year" class="w-full"/>
</template>