<template>
  <div id="base-card" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseCard <small class="ps-1">komponenta pro zobrazení obsahu v kartě</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka karty</h6>
              <!-- Jednoduchá karta -->
              <BaseCard>
                <template #header>Hlavička karty</template>
                <template #body>Obsah těla karty</template>
                <template #footer>Patička karty</template>
              </BaseCard>

              <!-- Karta s rozdělenou hlavičkou -->
              <BaseCard>
                <template #header>
                  <div class="btn-actions-pane-left">Levý obsah hlavičky</div>
                  <div class="btn-actions-pane-right">Pravý obsah hlavičky</div>
                </template>
                <template #body>Obsah těla karty</template>
              </BaseCard>

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('cardExample1')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('cardExample1', el)">
                    {{ `<BaseCard>
                    <template #header>Hlavička karty</template>
                    <template #body>Obsah těla karty</template>
                    <template #footer>Patička karty</template>
                  </BaseCard>` }}
                  </code>
                </div>
                <br>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('cardExample2')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('cardExample2', el)">
                    {{ `<BaseCard>
                    <template #header>
                      <div class="btn-actions-pane-left">Levý obsah hlavičky</div>
                      <div class="btn-actions-pane-right">Pravý obsah hlavičky</div>
                    </template>
                    <template #body>Obsah těla karty</template>
                  </BaseCard>` }}
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
                    <td><code>wrap</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Definuje wrapper pro kartu, např. <code>col-lg-6</code>.</td>
                  </tr>
                </tbody>
              </table>

              <h6 class="mt-4">Sloty</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Název slotu</th>
                    <th>Popis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>header</code></td>
                    <td>Obsah hlavičky karty</td>
                  </tr>
                  <tr>
                    <td><code>headerLeft</code></td>
                    <td>Levý obsah hlavičky</td>
                  </tr>
                  <tr>
                    <td><code>headerRight</code></td>
                    <td>Pravý obsah hlavičky</td>
                  </tr>
                  <tr>
                    <td><code>body</code></td>
                    <td>Hlavní obsah těla karty</td>
                  </tr>
                  <tr>
                    <td><code>footer</code></td>
                    <td>Obsah patičky karty</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div id="base-alert" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseAlert <small class="ps-1">komponenta pro zobrazování upozornění</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka upozornění</h6>
              <!-- Ukázka alertu bez ikony -->
              <BaseAlert type="primary">Toto je základní upozornění.</BaseAlert>
              <!-- Ukázka alertu s ikonou -->
              <BaseAlert type="success" icon="fa-check-circle">
                Úspěšně uloženo!
              </BaseAlert>
              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('alertExample1')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('alertExample1', el)">
                    {{ `<BaseAlert type="primary">Toto je základní upozornění.</BaseAlert>` }}
                  </code>
                </div>
                <br>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('alertExample2')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('alertExample2', el)">
                    {{ `<BaseAlert type="success" icon="fa-check-circle">Úspěšně uloženo!</BaseAlert>` }}
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
                    <td><code>wrap</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Umožňuje obalit alert do wrapperu (např. <code>col-lg-6</code>).</td>
                  </tr>
                  <tr>
                    <td><code>type</code></td>
                    <td><code>string</code></td>
                    <td><code>-</code></td>
                    <td>Určuje typ alertu, např. <code>primary</code>, <code>success</code>, <code>danger</code>.</td>
                  </tr>
                  <tr>
                    <td><code>icon</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Přidá ikonu k alertu, např. <code>fa-user</code>, <code>fa-check-circle</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-highlight" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseHighlight <small class="ps-1">komponenta pro zvýraznění dat</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka zvýraznění</h6>
              <!-- Základní zvýraznění -->
              <BaseHighlight class="bg-light-subtle" heading="Počet uživatelů" subheading="Aktivních" icon="pe-7s-users">
                120
              </BaseHighlight>

              <!-- Zvýraznění bez ikony -->
              <BaseHighlight class="bg-light" heading="Obrat" subheading="v milionech">
                3,2
              </BaseHighlight>

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('highlightExample1')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('highlightExample1', el)">
                    {{ `<BaseHighlight class="bg-warning" heading="Počet uživatelů" subheading="Aktivních" icon="pe-7s-users">
                    120
                  </BaseHighlight>` }}
                  </code>
                </div>
                <br>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('highlightExample2')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('highlightExample2', el)">
                    {{ `<BaseHighlight class="bg-light"  heading="Obrat" subheading="v milionech">
                    3,2
                  </BaseHighlight>` }}
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
                    <td><code>wrap</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Definuje wrapper pro zvýraznění, např. <code>col-lg-6</code>.</td>
                  </tr>
                  <tr>
                    <td><code>heading</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Nadpis zvýraznění.</td>
                  </tr>
                  <tr>
                    <td><code>subheading</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Podnadpis zvýraznění.</td>
                  </tr>
                  <tr>
                    <td><code>icon</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Ikona pro zvýraznění, např. <code>pe-7s-users</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-tab" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseTab <small class="ps-1">komponenta pro zobrazení záložek</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka záložek</h6>
              <BaseTabs :tabs="{'administrators': 'Administratoři', 'roles': 'Role', 'groups': 'Skupiny'}" active="administrators">
                <template #administrators>
                  Obsah záložky 1
                </template>
                <template #roles>
                  Obsah záložky 2
                </template>
                <template #groups>
                  Obsah záložky 3
                </template>
              </BaseTabs>



              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('tabExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('tabExample', el)">
                    {{ `<BaseTabs :active="activeTab" :tabs="{'accepted': 'Přijaté', 'sent': 'Odeslané', 'canceled': 'Stornované'}" @select="activeTab=$event">
  <i>||activeTab|| Tohle se zobrazi nad obsahem, dokumentace k dynamickym slotum: https://vuejs.org/guide/components/slots.html#dynamic-slot-names</i><br>
  <template #accepted>Obsah tabu Přijaté</template>
  <template #sent>Obsah tabu Odeslané</template>
  <template #canceled>Obsah tabu Stornované</template>
</BaseTabs>` }}
                  </code>
                </div>

                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('tabExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('tabExample', el)">
                    {{ `<BaseTabs :active="activeTab" :tabs="{'accepted': 'Přijaté', 'sent': 'Odeslané', 'canceled': 'Stornované'}" @select="activeTab=$event">
                    <i>||activeTab|| Tohle se zobrazi nad obsahem, dokumentace k dynamickym slotum: https://vuejs.org/guide/components/slots.html#dynamic-slot-names</i><br>
                    &lt;template #[activeTab]&gt;Obsah tabu &lt;/template&gt;
                  </BaseTabs>` }}
                  </code>
                </div>

                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('tabExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('tabExample', el)">
                    {{ `  <BaseTabs :active="$route.name" :tabs="{'customers': 'Zakaznici', 'producers': 'Výrobci', 'developer': 'Developer'}" @select="navigateTo($event)" />
                    Taby jako navigace</BaseTabs>` }}
                  </code>
                </div>
              </div>
            </div>

            <!-- Props a Eventy -->
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
                    <td><code>wrap</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Definuje wrapper pro záložky, např. <code>col-lg-6</code>.</td>
                  </tr>
                  <tr>
                    <td><code>active</code></td>
                    <td><code>string</code></td>
                    <td><code>-</code></td>
                    <td>Určuje index aktivní záložky.</td>
                  </tr>
                  <tr>
                    <td><code>loading</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Pokud je aktivní, záložky zobrazují stav načítání.</td>
                  </tr>
                  <tr>
                    <td><code>tabs</code></td>
                    <td><code>object</code></td>
                    <td><code>-</code></td>
                    <td>Seznam názvů záložek.</td>
                  </tr>
                </tbody>
              </table>

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
                    <td><code>select</code></td>
                    <td>Vyvolá se při výběru záložky. Vrací index vybrané záložky.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Sekce: BaseModal -->
  <div id="base-modal" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseModal <small class="ps-1">komponenta pro modalní okno</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka modalu</h6>
              <BaseButton class="btn-outline-secondary" @click="$refs.modal2.open();">Modal 2</BaseButton>

              <BaseModal ref="modal2" title="Ukázka modalu" :display-footer="true">
                <template #header>
                  <h5 class="modal-title">Vlastní hlavička</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Zavřít" />
                </template>
                <template #body>
                  <p>Obsah modalního okna.</p>
                </template>
                <template #footer>
                  <button type="button" class="btn btn-primary">Uložit</button>
                </template>
              </BaseModal>

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('modalExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('modalExample', el)" class="html">
                    {{ `<BaseModal title="My Modal" :displayFooter="true">
  <template #header>
    <h5 class="modal-title">Header Content</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
  </template>
  <template #body>
    <p>Modal body content.</p>
  </template>
  <template #footer>
    <button type="button" class="btn btn-primary">Save</button>
  </template>
</BaseModal>` }}
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
                    <td><code>title</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Titulek modalního okna.</td>
                  </tr>
                  <tr>
                    <td><code>displayFooter</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Zobrazuje nebo skryje patičku modalního okna.</td>
                  </tr>
                </tbody>
              </table>

              <!-- Sloty -->
              <h6 class="mt-4">Sloty</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Název</th>
                    <th>Popis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>header</code></td>
                    <td>Vlastní obsah hlavičky modalu.</td>
                  </tr>
                  <tr>
                    <td><code>body</code></td>
                    <td>Hlavní obsah těla modalu.</td>
                  </tr>
                  <tr>
                    <td><code>footer</code></td>
                    <td>Vlastní obsah patičky modalu.</td>
                  </tr>
                </tbody>
              </table>

              <!-- Eventy -->
              <h6 class="mt-4">Eventy</h6>
              <p>Komponenta podporuje nativní eventy modalu Bootstrap (např. <code>shown.bs.modal</code>, <code>hidden.bs.modal</code>).</p>
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

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css');
</style>