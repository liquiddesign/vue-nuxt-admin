<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack @click="navigateTo({name: 'customers'})" />
    </template>
    <template #headerRight>
      <BaseButtonSave :disabled="$refs.form?.disabled || $refs.form?.pending" @click="goBack=false; $refs.form.submit();"/>
    </template>
    <template #body>
      <BaseForm ref="form" url="customer" :input="input" :rules="rules" @success="success">
        <div class="row">
          <div class="col-lg-6">
            <h5 class="card-title">Zákazník</h5>

          <BaseCheckbox label="Označit zákazníka jako firmu" v-model="isCompany" />

          <div class="row mt-2">
            <BaseFormInput v-if="!isCompany" name="fullname" wrap="col-lg-6" label="Jméno a příjmení" type="text" />
            <BaseFormInput v-if="isCompany" name="company" wrap="col-lg-6" label="Společnost" type="text" />
          </div>
          <div v-if="isCompany" class="row mt-2">
            <BaseFormInput name="ic" wrap="col-lg-6" label="IC" type="text" />
            <BaseFormInput name="dic" wrap="col-lg-6" label="DIČ" type="text" />
          </div>
          <div class="row mt-2">
            <BaseFormInput name="email" wrap="col-lg-6" label="E-mail" type="text" />
            <BaseFormInput name="ccEmails" wrap="col-lg-6" label="E-mail (kopie)" type="text" />
          </div>
          <div class="row mt-2">
            <BaseFormInput name="phone" wrap="col-lg-6" label="Telefon" type="text" />
          </div>
          <div class="row mt-2">
            <!--<BaseFormInput name="parentCustomer" wrap="col-lg-6" label="Nadřazený zákazník / centrála" type="text" />-->
            <div class="col-lg-6">
              <label>Nadřazený zákazník / centrála</label>
              <div style="max-height:29.4px;">
              <VueMultiselect v-model="input.parent" :options-limit="50" :options="options" placeholder="Zvolte položku ..."  selectLabel="" deselectLabel="odstranit" selectedLabel="Zvolena">
                <template #option="{option}">Zákazník ič|{{ option }}|aaaa</template>
              </VueMultiselect>
              </div>
            </div>
            <div class="col-lg-6">
              <label>Přiřazení obchodníci</label>
              <div style="max-height:29.4px;">
              <VueMultiselect v-model="input.parent3" :options-limit="50" :options="options" :multiple="true" placeholder="Zvolte položku ..." selectLabel="" deselectLabel="odstranit" selectedLabel="Zvolena">
                <template #option="{option}">Zákazník ič|{{ option }}|aaaa</template>
              </VueMultiselect>
              </div>
            </div>
          </div>
          <div class="form-wrapper-blue mt-3">
            <div class="row">
              <div class="col-lg-6">
                <h5 class="card-title">Fakturační adresa</h5>
              </div>
              <div class="col-lg-6">
                <h5 class="card-title">Doručovací adresa</h5>
              </div>
            </div>
            <div class="row mt-2">
              <BaseFormInput name="billAddress.street" wrap="col-lg-6" label="Ulice" type="text" />
              <BaseFormInput name="deliveryAddress.street" wrap="col-lg-6" label="Ulice" type="text" />
            </div>
            <div class="row mt-2">
              <BaseFormInput name="billAddress.city" wrap="col-lg-4" label="Město" type="text" />
              <BaseFormInput name="billAddress.zipcode" wrap="col-lg-2" label="PSČ" type="text" />
              <BaseFormInput name="deliveryAddress.street" wrap="col-lg-4" label="Město" type="text" />
              <BaseFormInput name="deliveryAddress.zipcode" wrap="col-lg-2" label="PSČ" type="text" />
            </div>
            <div class="row mt-2">
              <BaseFormInput name="billAddress.state" wrap="col-lg-6" label="Stát" type="text" />
              <BaseFormInput name="deliveryAddress.state" wrap="col-lg-6" label="Stát" type="text" />
            </div>
            <div class="row mt-2">
              <BaseFormInput name="billAddress.note" wrap="col-lg-6" label="Poznámka" type="text" />
              <BaseFormInput name="deliveryAddress.note" wrap="col-lg-6" label="Poznámka" type="text" />
            </div>
          </div>

            <h5 class="card-title">Ceny a slevy</h5>
            <div class="row">
              <BaseFormInput name="phone" wrap="col-lg-6" label="Telefon" type="text" />
              <BaseFormInput name="email" wrap="col-lg-6" label="E-mail" type="text" />
            </div>

      <div class="form-wrapper-blue mt-3">
          <h5 class="card-title mt-3">Nákup</h5>
          <div class="row">
            <BaseFormInput name="phone" wrap="col-lg-6" label="Telefon" type="text" />
            <BaseFormInput name="email" wrap="col-lg-6" label="E-mail" type="text" />
          </div>

          <div class="row">
            <BaseFormInput name="phone" wrap="col-lg-6" label="Telefon" type="text" />
            <BaseFormInput name="email" wrap="col-lg-6" label="E-mail" type="text" />
          </div>
      </div>
            <h5 class="card-title">Exporty</h5>
            <div class="row">
              <BaseFormInput name="phone" wrap="col-lg-6" label="Telefon" type="text" />
              <BaseFormInput name="email" wrap="col-lg-6" label="E-mail" type="text" />
            </div>
          <div class="row mt-3">
            <div class="col-lg-6">
              <BaseFormButton class="btn-success me-1" @click="goBack=true;">Uložit</BaseFormButton>
              <BaseFormButton class="btn-outline-primary" @click="goBack=false;">Uložit a pokračovat</BaseFormButton>
            </div>
          </div>
          </div>
        <div class="col-lg-6 ps-5">

          <div class="row">
            <div class="col-md-6 col-xl-4">
              <div class="mb-3 widget-content bg-secondary">
                <div class="widget-content-wrapper text-white">
                  <div class="widget-content-left">
                    <div class="widget-heading">Total Orders</div>
                    <div class="widget-subheading">Last year expenses</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers text-white"><span>1896</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-4">
              <div class="mb-3 widget-content bg-night-sky">
                <div class="widget-content-wrapper text-white">
                  <div class="widget-content-left">
                    <div class="widget-heading">Clients</div>
                    <div class="widget-subheading">Total Clients Profit</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers text-white"><span>$ 568</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-4">
              <div class="mb-3 widget-content bg-light">
                <div class="widget-content-wrapper text-black">
                  <div class="widget-content-left">
                    <div class="widget-heading">Followers</div>
                    <div class="widget-subheading">People Interested</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers text-black"><span>46%</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-xl-none d-lg-block col-md-6 col-xl-4">
              <div class="mb-3 widget-content bg-premium-dark">
                <div class="widget-content-wrapper text-black">
                  <div class="widget-content-left">
                    <div class="widget-heading">Products Sold</div>
                    <div class="widget-subheading">Revenue streams</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers text-warning"><span>$14M</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h5 class="card-title">Poslední objednávky</h5>
          <table class="mb-2 table table-sm table-striped">
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Petr Marek</td>
              <td>marek@lqd.cz</td>
              <td>   <button class="btn btn-xs btn-outline-success me-1"><i class="fa fa-pencil"></i></button><button class="btn btn-xs btn-outline-primary"><i class="fa fa-sign-in"></i></button></td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Petr Marek</td>
              <td>marek@lqd.cz</td>
              <td>   <button class="btn btn-xs btn-outline-success me-1"><i class="fa fa-pencil"></i></button><button class="btn btn-xs btn-outline-primary"><i class="fa fa-sign-in"></i></button></td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Petr Marek</td>
              <td>marek@lqd.cz</td>
              <td>   <button class="btn btn-xs btn-outline-success me-1"><i class="fa fa-pencil"></i></button><button class="btn btn-xs btn-outline-primary"><i class="fa fa-sign-in"></i></button></td>
            </tr>
            </tbody>
          </table>
          <br />
          <h5 class="card-title">Účty</h5>
          <div class="form-wrapper-light mt-3">
            <h5 class=" card-title-lower">1) petr@lqd.cz    <button class="btn btn-xs btn-outline-secondary me-2"><i class="fa fa-trash-o"></i></button></h5>
            <div class="row">
              <BaseFormInput name="phone" wrap="col-lg-6" label="Telefon" type="text" />
              <BaseFormInput name="email" wrap="col-lg-6" label="E-mail" type="text" />
            </div>
            <div class="row">
              <BaseFormInput name="phone" wrap="col-lg-6" label="Telefon" type="text" />
              <BaseFormInput name="email" wrap="col-lg-6" label="E-mail" type="text" />
            </div>
            <hr class="pt-1" style="color: white">
            <div class="row">
              <BaseFormInput name="phone" wrap="col-lg-6" label="Telefon" type="text" />
              <BaseFormInput name="email" wrap="col-lg-6" label="E-mail" type="text" />
            </div>
            <div class="row">
              <BaseFormInput name="phone" wrap="col-lg-6" label="Telefon" type="text" />
              <BaseFormInput name="email" wrap="col-lg-6" label="E-mail" type="text" />
            </div>

          </div>
          <div class="mt-2">

            <button class="btn btn-sm btn-outline-secondary me-2"><i class="fa fa-plus"></i></button>
            <button class="btn btn-sm btn-outline-secondary"><i class="fa fa-minus"></i></button>


          </div>


        </div>
       </div>
        </BaseForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">
import {required} from "@vuelidate/validators";
import VueMultiselect from 'vue-multiselect'

const input:any = reactive({});
const goBack:Ref<boolean> = ref(false);
const isCompany:Ref<boolean> = ref(false);
const value:Ref<string[]> = ref(['pes']);
const options:Ref<string[]> = ref(['pes','ves','kes']);

const rules = {
  company: { required },
};

function onSelect() {
  alert('aaa');
}

function addItem() {
  return options.value.push('tru');
}

function success(result:any) {
  Object.keys(input).forEach((key:string) => delete input[key]);
  Object.assign(input, {});

  if (!goBack.value) {
    navigateTo({name: 'customers-id', params: {id: result.result}})
  } else {
    navigateTo({name: 'customers'})
  }

}

</script>