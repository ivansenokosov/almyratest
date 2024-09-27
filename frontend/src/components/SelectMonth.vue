<script setup lang="ts">
    import { ref, watch } from 'vue'
    import Select from 'primevue/select';

    interface IMonth {
        name: string
        id: string
    }

    const model  = defineModel()
    const month  = ref<IMonth>({name: 'Январь',   id: '01'})

    const months = [{name: 'Январь',   id: '01'},
                    {name: 'Февраль',  id: '02'},
                    {name: 'Март',     id: '03'},
                    {name: 'Апрель',   id: '04'},
                    {name: 'Май',      id: '05'},
                    {name: 'Июнь',     id: '06'},
                    {name: 'Июль',     id: '07'},
                    {name: 'Август',   id: '08'},
                    {name: 'Сентябрь', id: '09'},
                    {name: 'Октябрь',  id: '10'},
                    {name: 'Ноябрь',   id: '11'},
                    {name: 'Декабрь',  id: '12'}]
    
    watch(month, ()=>{
       model.value = month.value.id
    })


</script>

<template>
    <label for="month" class="font-bold block mb-2">    Месяц    </label>
    <Select :options="months" v-model="month" optionLabel="name" class="w-full"/>
</template>