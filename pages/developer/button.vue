<template>
  <!-- Sekce: BaseButton -->
  <div id="base-button" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseButton <small class="ps-1">základní generické tlačítko</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázky -->
            <div class="col-md-6">
              <h6>Ukázky tlačítek</h6>
              <button class="btn btn-primary me-2">Primární tlačítko</button>
              <button class="btn btn-secondary btn-lg me-2">Velké tlačítko</button>
              <button class="btn btn-secondary btn-sm me-2">Malé tlačítko</button>
              <button class="btn btn-secondary me-2" disabled>
                <span class="spinner-border spinner-border-sm me-1" role="status" /> Načítám...
              </button>
              <button class="btn btn-outline-danger mx-3">Wrapované tlačítko</button>
              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="pb-2" style="display: block; width: 100%;">
                  <div class="code-example">
                    <BaseButton class="btn-light btn-xs" @click="select('button1')"><BaseIcon icon-name="Copy" /></BaseButton>
                    <code :ref="el => setRef('button1', el)">
                      {{ '<BaseButton>Velké tlačítko</BaseButton>' }}
                    </code>
                  </div>
                  <br>
                  <div class="code-example">
                    <BaseButton class="btn-light btn-xs" @click="select('button2')"><BaseIcon icon-name="Copy" /></BaseButton>
                    <code :ref="el => setRef('button2', el)">
                      {{ '<BaseButton class="btn-sm">Malé tlačítko</BaseButton>' }}
                    </code>
                  </div>
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
                    <td>Definuje wrapper pro tlačítko (např. <code>col-lg-6</code>).</td>
                  </tr>
                  <tr>
                    <td><code>loading</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Pokud je <code>true</code>, zobrazí spinner a disabluje tlačítko.</td>
                  </tr>
                </tbody>
              </table>
              <h6 class="mt-4">Eventy</h6>
              <p>Tlačítko přebírá všechny nativní eventy HTML tlačítka (<code>click</code>, <code>focus</code>, atd.).</p>
            </div>
          </div>
        </div>
        <div class="card-footer py-3">
          <i class="fa fa-lightbulb-o me-2" /> Odkaz na designy tlačítek:  <a href="https://demo.dashboardpack.com/architectui-html-pro/elements-buttons-standard.html" target="_blank">https://demo.dashboardpack.com/architectui-html-pro/elements-buttons-standard.html</a>
        </div>
      </div>
    </div>
  </div>

  <div id="base-back-button" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseBackButton <small>tlačítko pro návrat zpět</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka tlačítka</h6>
              <BaseButtonBack />
              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('button3')"><BaseIcon icon-name="Copy" /></BaseButton>
                  <code :ref="el => setRef('button3', el)">
                    {{ `<BaseButtonBack />` }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-close-button" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseButtonCancel <small class="ps-1">tlačítko pro zavření</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka tlačítka</h6>
              <BaseButtonCancel />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('closeButtonExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('closeButtonExample', el)">
                    {{ `<BaseButtonCancel>` }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-button-delete" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseButtonDelete <small class="ps-1">tlačítko pro smazání</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka tlačítka</h6>
              <!-- Jednoduché tlačítko -->
              <BaseButtonDelete />
              <BaseButtonDelete class="btn-light" />
              <BaseButtonDelete class="btn-danger" />
              <!-- Tlačítko s potvrzením -->
              <BaseButtonDelete class="btn-danger" confirmation confirmation-placement="right">Opravdu smazat?</BaseButtonDelete>
              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('deleteButtonExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('deleteButtonExample', el)">
                    {{ `<BaseButtonDelete confirmation>Opravdu smazat?</BaseButtonDelete>` }}
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
                    <td><code>confirmation</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Zobrazí potvrzovací dialog před akcí smazání.</td>
                  </tr>
                  <tr>
                    <td><code>confirmation-placement</code></td>
                    <td><code>string</code></td>
                    <td><code>left</code></td>
                    <td>Pozice zobrazení potrvrzovacího dialogu.</td>
                  </tr>
                  <tr>
                    <td><code>outline</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Změní vzhled tlačítka na outline verzi.</td>
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
                    <td><code>confirm</code></td>
                    <td>Vyvolá se při potvrzení akce v potvrzovacím dialogu.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-button-edit" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseButtonEdit <small class="ps-1">tlačítko pro úpravu</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka tlačítka</h6>
              <BaseButtonEdit />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('editButtonExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('editButtonExample', el)">
                    {{ `<BaseButtonEdit class="btn-primary" />` }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-button-export" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseButtonExport <small class="ps-1">tlačítko pro export dat</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka tlačítka</h6>
              <BaseButtonExport />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('exportButtonExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('exportButtonExample', el)">
                    {{ `<BaseButtonExport />` }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-button-external-link" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseButtonExternalLink <small class="ps-1">tlačítko pro externí odkaz</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka tlačítka</h6>
              <BaseButtonExternalLink />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('externalLinkExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('externalLinkExample', el)">
                    {{ `<BaseButtonExternalLink />` }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-button-new" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseButtonNew <small class="ps-1">tlačítko pro vytvoření nové položky</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka tlačítka</h6>
              <BaseButtonNew />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('newButtonExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('newButtonExample', el)">
                    {{ `<BaseButtonNew />` }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-button-refresh" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseButtonRefresh <small class="ps-1">tlačítko pro obnovu</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka tlačítka</h6>
              <BaseButtonRefresh />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('refreshButtonExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('refreshButtonExample', el)">
                    {{ `<BaseButtonRefresh />` }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="base-button-save" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseButtonSave <small class="ps-1">tlačítko pro uložení</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka tlačítka</h6>
              <BaseButtonSave />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('saveButtonExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('saveButtonExample', el)">
                    {{ `<BaseButtonSave />` }}
                  </code>
                </div>
              </div>
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