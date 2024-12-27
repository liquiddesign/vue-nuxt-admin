<template>
    <!-- Sekce: BaseTextBox -->
    <div id="base-textbox" class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">BaseTextBox <small class="ps-1">vstupní pole s validací</small></h5>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Ukázka -->
              <div class="col-md-6">
                <h6>Ukázka vstupního pole</h6>
                <BaseTextBox
                    label="Jméno"
                    name="username"
                    :modelValue="''"
                    :lang="'cs'"
                    :locale="true"
                    :validation="{ required: true }"
                />

                <!-- Použití -->
                <div id="pouziti" class="mt-4">
                  <h6>Použití</h6>
                  <div class="code-example">
                    <BaseButton class="btn-light btn-xs" @click="select('textboxExample')">
                      <i class="fa fa-copy" />
                    </BaseButton>
                    <code :ref="el => setRef('textboxExample', el)">
                      {{ `<BaseTextBox
                        label="Jméno"
                        name="username"
                        :modelValue="''"
                        :lang="'cs'"
                        :locale="true"
                        :validation="{ required: true }"
                    />` }}
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
                    <td><code>label</code></td>
                    <td><code>string|null</code></td>
                    <td><code>null</code></td>
                    <td>Název pole (popisek).</td>
                  </tr>
                  <tr>
                    <td><code>lang</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Jazyk pro lokalizaci.</td>
                  </tr>
                  <tr>
                    <td><code>locale</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Zobrazí vlajku odpovídající jazyku.</td>
                  </tr>
                  <tr>
                    <td><code>wrap</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>CSS třída obalu pole.</td>
                  </tr>
                  <tr>
                    <td><code>type</code></td>
                    <td><code>string</code></td>
                    <td><code>'text'</code></td>
                    <td>Typ vstupního pole (např. <code>text</code>, <code>number</code>, <code>float</code>).</td>
                  </tr>
                  <tr>
                    <td><code>nullable</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Umožňuje nastavit prázdnou hodnotu jako <code>null</code>.</td>
                  </tr>
                  <tr>
                    <td><code>name</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Název pole, použitý pro validaci.</td>
                  </tr>
                  <tr>
                    <td><code>modelValue</code></td>
                    <td><code>string|number|null</code></td>
                    <td><code>undefined</code></td>
                    <td>Hodnota vstupního pole.</td>
                  </tr>
                  <tr>
                    <td><code>validation</code></td>
                    <td><code>object</code></td>
                    <td><code>undefined</code></td>
                    <td>Pravidla pro validaci pole.</td>
                  </tr>
                  <tr>
                    <td><code>validationErrors</code></td>
                    <td><code>array</code></td>
                    <td><code>undefined</code></td>
                    <td>Seznam chybových zpráv pro validaci.</td>
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
                    <td><code>update:modelValue</code></td>
                    <td>Vyvoláno při změně hodnoty pole.</td>
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

    const {select, setRef} = useCopyPaste();

  </script>