<script setup lang="ts">
  import { ref, watch } from 'vue'
  import Button from 'primevue/button';
  import InputMask from 'primevue/inputmask';
  import InputNumber from 'primevue/inputnumber';
  import FloatLabel from 'primevue/floatlabel';
  import InputText from 'primevue/inputtext';
  import SelectButton from 'primevue/selectbutton';
  import Select from 'primevue/select';
  import SelectMonth from './SelectMonth.vue';
  import SelectYear from './SelectYear.vue';
  import { sendData } from './../api/sendData'
  import type { IPayment } from '@/intefaces';

  const payment = ref<IPayment>({card: {cardNumber:'4000 0000 0000 0002', 
                                        cardholderName:'Harry Potter', 
                                        cardSecurityCode: '130',
                                        expiryMonth: '07', 
                                        expiryYear:'2028'},
                                 paymentType: 'DEPOSIT',
                                 paymentMethod: "BASIC_CARD",
                                 amount: 10,
                                 currency: 'EUR'})


  const mode = ref<string>('Оплата');
  const modes = ref<string[]>(['Проверка карты', 'Оплата']);               
 
  const currencies = ['RUB','USD','EUR']

  const status = ref<boolean>(false)
  const message = ref<string>('')

  const buttonLabel = ref<string>('Оплатить')

  watch(mode, () => {
    if (mode.value === 'Оплата') {
         payment.value.paymentType = 'DEPOSIT'
         buttonLabel.value = 'Оплатить'
    } else {
        payment.value.paymentType = 'CARDVERIFY'
        payment.value.amount = 0
        buttonLabel.value = 'Проверить'
    } 
  })

</script>

<template>
  <h2>Отправка</h2>
  {{ payment }}
  <h2>Результат</h2>
  {{ message }}
 
  <div class="grid" v-if="!status">
    <div class="col-4 col-offset-4">
       <div class="text-center p-3 border-round-xl font-bold ">
        
        <div class="card flex justify-center">
            <SelectButton v-model="mode" :options="modes" aria-labelledby="basic" />
        </div>

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
                <SelectMonth v-model="payment.card.expiryMonth"/>
              </div> /
              <div class="field col">
                <SelectYear v-model="payment.card.expiryYear"/>
              </div>
          </div>
        </div>


        <div class="field pt-5" v-if="mode === 'Оплата'">
            <div class="formgrid grid">
              <div class="field col">
                <label for="amount" class="font-bold block mb-2">   Сумма   </label>
                <InputNumber v-model="payment.amount" inputId="amount" showButtons buttonLayout="horizontal" :step="1" :min="0" fluid >
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
              </div>
              <div class="field col">
                <label for="amount" class="font-bold block mb-2">   Валюта   </label>
                <Select :options="currencies" v-model="payment.currency" class="w-full"/>
              </div>
            </div>
        </div>


        <div class="field pt-5">
            <Button :label="buttonLabel" @click="() => {sendData(payment).then((res)=> message = res)}"/>
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
