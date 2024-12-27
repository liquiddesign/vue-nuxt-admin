<template>
  <!-- Sekce: BaseForm -->
  <div id="base-form" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseForm <small class="ps-1">komponenta pro obal formulářů</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka formuláře</h6>
              <BaseForm :name="'exampleForm'" :rules="{ field: { required: true } }" :data="data" @submit.stop="toast.info('Odesilam.')">
                {{ data }}

                <label for="field" class="form-label">Pole</label>
                <input v-model="data.field" type="text" class="form-control">

                <button type="submit" class="btn btn-primary">Odeslat</button>
              </BaseForm>

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('formExample')">
                    <i class="fa fa-copy" />
                  </BaseButton>
                  <code :ref="el => setRef('formExample', el)">
                    {{ `<BaseForm :name="'myForm'" :rules="{ field: { required: true } }" :data="{ field: '' }">
                    <template>
                      <div class="mb-3">
                        <label for="field" class="form-label">Pole</label>
                        <input id="field" type="text" v-model="field" class="form-control" />
                      </div>
                      <button type="submit" class="btn btn-primary">Odeslat</button>
                    </template>
                  </BaseForm>` }}
                  </code>
                </div>
              </div>
            </div>

            <!-- Props -->
            <div class="col-md-6">
              <h6>Props</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Název</th>
                    <th>Typ</th>
                    <th>Výchozí hodnota</th>
                    <th>Popis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>name</code></td>
                    <td><code>string</code></td>
                    <td><code>'frm'</code></td>
                    <td>Název formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>rules</code></td>
                    <td><code>object</code></td>
                    <td><code>{}</code></td>
                    <td>Pravidla pro validaci formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>data</code></td>
                    <td><code>any</code></td>
                    <td><code>null</code></td>
                    <td>Vstupní data formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>wrap</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>CSS třída obalu formuláře.</td>
                  </tr>
                </tbody>
              </table>

              <!-- Eventy -->
              <h6 class="mt-4">Eventy</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Název</th>
                    <th>Popis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>success</code></td>
                    <td>Vyvoláno při úspěšném odeslání formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>error</code></td>
                    <td>Vyvoláno při chybě při odesílání formuláře.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Sekce: BaseForm -->
  <div id="base-form" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseForm <small class="ps-1">komponenta pro obal formulářů</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka formuláře</h6>
              <BaseForm :name="'exampleForm'" :rules="{ field: { required: true } }" :data="{ field: '' }">
                <div class="mb-3">
                  <label for="field" class="form-label">Pole</label>
                  <input id="field" v-model="field" type="text" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">Odeslat</button>
              </BaseForm>

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('formExample')">
                    <i class="fa fa-copy" />
                  </BaseButton>
                  <code :ref="el => setRef('formExample', el)">
                    {{ `<BaseForm :name="'myForm'" :rules="{ field: { required: true } }" :data="{ field: '' }">
                      <template>
                        <div class="mb-3">
                          <label for="field" class="form-label">Pole</label>
                          <input id="field" type="text" v-model="field" class="form-control" />
                        </div>
                        <button type="submit" class="btn btn-primary">Odeslat</button>
                      </template>
                    </BaseForm>` }}
                  </code>
                </div>
              </div>
            </div>

            <!-- Props -->
            <div class="col-md-6">
              <h6>Props</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Název</th>
                    <th>Typ</th>
                    <th>Výchozí hodnota</th>
                    <th>Popis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>name</code></td>
                    <td><code>string</code></td>
                    <td><code>'frm'</code></td>
                    <td>Název formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>lang</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Jazyk formuláře (např. <code>cs</code>).</td>
                  </tr>
                  <tr>
                    <td><code>url</code></td>
                    <td><code>string|null</code></td>
                    <td><code>null</code></td>
                    <td>URL adresa pro odeslání dat formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>method</code></td>
                    <td><code>string</code></td>
                    <td><code>POST</code> nebo <code>PATCH</code></td>
                    <td>HTTP metoda pro odeslání formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>rules</code></td>
                    <td><code>object</code></td>
                    <td><code>{}</code></td>
                    <td>Pravidla pro validaci formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>data</code></td>
                    <td><code>any</code></td>
                    <td><code>null</code></td>
                    <td>Vstupní data formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>omit</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>Seznam polí, která mají být vyloučena při odesílání dat.</td>
                  </tr>
                  <tr>
                    <td><code>wrap</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>CSS třída obalu formuláře.</td>
                  </tr>
                </tbody>
              </table>

              <!-- Eventy -->
              <h6 class="mt-4">Eventy</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Název</th>
                    <th>Popis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>success</code></td>
                    <td>Vyvoláno při úspěšném odeslání formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>error</code></td>
                    <td>Vyvoláno při chybě při odesílání formuláře.</td>
                  </tr>
                </tbody>
              </table>

              <!-- Metody -->
              <h6 class="mt-4">Metody</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Název</th>
                    <th>Popis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>submit</code></td>
                    <td>Odešle formulář po validaci.</td>
                  </tr>
                  <tr>
                    <td><code>getDynamicErrors</code></td>
                    <td>Získá chyby dynamických polí.</td>
                  </tr>
                </tbody>
              </table>
              <!-- Provide -->
              <h6 class="mt-4">Provide</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Název</th>
                    <th>Popis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>name</code></td>
                    <td>Název formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>lang</code></td>
                    <td>Jazyk formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td>Stav deaktivace formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>loading</code></td>
                    <td>Stav načítání formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>pending</code></td>
                    <td>Stav čekání na odpověď serveru.</td>
                  </tr>
                  <tr>
                    <td><code>dirty</code></td>
                    <td>Informace o tom, zda byl formulář upraven.</td>
                  </tr>
                  <tr>
                    <td><code>data</code></td>
                    <td>Aktuální data formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>validation</code></td>
                    <td>Objekt pro validaci formuláře.</td>
                  </tr>
                  <tr>
                    <td><code>updateInput</code></td>
                    <td>Funkce pro aktualizaci hodnot vstupních polí formuláře.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {ToastPluginApi, useToast} from 'vue-toast-notification';

const {select, setRef} = useCopyPaste();
const toast: ToastPluginApi = inject('toast', useToast());

const defaultFormData = { field: 'default hodnota'};
const data:any = ref(Object.assign({}, defaultFormData));

</script>
