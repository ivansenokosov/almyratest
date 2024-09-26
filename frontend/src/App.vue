<script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios';
  import Button from 'primevue/button';
  import InputMask from 'primevue/inputmask';
  import InputNumber from 'primevue/inputnumber';
  import FloatLabel from 'primevue/floatlabel';
  import InputText from 'primevue/inputtext';
  import type { IPayment } from './intefaces';

  const payment = ref<IPayment>({card: {cardNumber:'4000 0000 0000 0002', 
                                        cardholderName:'Harry Potter', 
                                        cardSecurityCode: 130,
                                        expiryMonth: 7, 
                                        expiryYear:2028},
                                  amount: 10,
                                  currency: 'EUR'})

  const status = ref<boolean>(false)
  const message = ref<string>('')
  const url = 'http://localhost:3000' 
  const payadmitData = {card: {cardNumber:'4000 0000 0000 0002', 
                               cardholderName:'Harry Potter', 
                               cardSecurityCode: '130',
                               expiryMonth: '7', 
                               expiryYear:'2028'},
                        amount: '10',
                        currency: 'EUR'}

  const submit = async () => {
    const res = await axios.post(url, payadmitData, {})
    console.log(res)

    message.value = res.data
    if (res.data.status == 200 || res.data.status ==201) {
          status.value=true
    }
  }

               
</script>

<template>
  {{ message }}
  <div class="grid" v-if="!status">
    <div class="col-4 col-offset-4">
       <div class="text-center p-3 border-round-xl font-bold ">
        <div class="field pt-5">
            <FloatLabel>
              <InputText type="text" v-model="payment.card.cardholderName" class="w-full"/>
              <label for="id">    Владелец карты     </label>
            </FloatLabel>
        </div>
        <div class="field pt-5">
            <FloatLabel>
              <InputMask v-model="payment.card.cardNumber" mask="9999 9999 9999 9999" placeholder="" class="w-full"/>
              <label for="id">    Номер карты     </label>
            </FloatLabel>
        </div>
        <div class="field pt-5">
            <FloatLabel>
              <InputMask v-model="payment.card.cardSecurityCode" mask="999" placeholder="" class="w-full"/>
              <label for="id">    CCV     </label>
            </FloatLabel>
        </div>
        <div class="field pt-5">

          <div class="formgrid grid">
              <div class="field col">
                <label for="expiryMonth" class="font-bold block mb-2">    Месяц    </label>
                <InputNumber v-model="payment.card.cardSecurityCode" inputId="expiryMonth" showButtons buttonLayout="horizontal" :step="1" :min="1" :max="12" fluid >
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
              </div> /
              <div class="field col">
                <label for="expiryYear" class="font-bold block mb-2">    Год    </label>
                <InputNumber v-model="payment.card.expiryYear" inputId="expiryYear" showButtons buttonLayout="horizontal" :step="1" :min="2000" :max="2050" fluid >
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
              </div>
          </div>
        </div>
        <div class="field pt-5">
          <label for="amount" class="font-bold block mb-2">   Сумма   </label>
                <InputNumber v-model="payment.amount" inputId="amount" showButtons buttonLayout="horizontal" mode="currency" currency="EUR" :step="1" :min="0" fluid >
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
        </div>

        <div class="field pt-5">
            <Button label="Оплатить" @click="submit"/>
        </div>
       </div>
    </div>
  </div>
  <div v-else>
    Платёж выполнен успешно!
  </div>
</template>

<style scoped>
</style>
