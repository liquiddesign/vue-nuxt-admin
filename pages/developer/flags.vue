<template>
  <div id="base-avatar" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseAvatar <small class="ps-1">komponenta pro zobrazení uživatelských avatarů</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka avataru</h6>
              <BaseAvatar :user-id="'user123'" />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('avatarExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('avatarExample', el)">
                    {{ `<BaseAvatar :userId="'user123'" />` }}
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
                    <td><code>userId</code></td>
                    <td><code>string|null</code></td>
                    <td><code>null</code></td>
                    <td>ID uživatele, jehož avatar má být zobrazen.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Sekce: BaseFlag -->
  <div id="base-flag" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">BaseFlag <small class="ps-1">komponenta pro zobrazení vlajek</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka vlajky</h6>
              <BaseFlag lang="cs" />
              <BaseFlag lang="gb" style="font-size: 20px;" />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('flagExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('flagExample', el)">
                    {{ `<BaseFlag lang="cs" />` }}
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
                    <td><code>lang</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Jazykový kód (např. <code>cs</code> nebo <code>en</code>), který se převede na odpovídající kód ISO vlajky.</td>
                  </tr>
                </tbody>
              </table>
              <p>Velikost vlajky se určuje velikostí fontu. Tedy např. font-size: 14px.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="lucide-icons" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">Lucide <small class="ps-1">sada ikonek</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka</h6>
              <span style="font-size: 1.5rem"><IconAirplay /></span>
              <span style="font-size: 1.5rem"><IconAirplay size="15" stroke-width="1" /></span>
              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('iconExample')">
                    <BaseIcon icon-name="Copy" />
                  </BaseButton>
                  <code :ref="el => setRef('iconExample', el)">
                    {{ `<IconAirplay />` }}
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
                    <td><code>size</code></td>
                    <td><code>number</code></td>
                    <td><code>24</code></td>
                    <td>Velikost ikony (v pixelech).</td>
                  </tr>
                  <tr>
                    <td><code>stroke-width</code></td>
                    <td><code>number</code></td>
                    <td><code>2</code></td>
                    <td>Tloušťka čáry ikony.</td>
                  </tr>
                  <tr>
                    <td><code>color</code></td>
                    <td><code>string</code></td>
                    <td><code>currentColor</code></td>
                    <td>Barva ikony (např. <code>red</code>).</td>
                  </tr>
                  <tr>
                    <td><code>absoluteStrokeWidth</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Normalizuje tloušťku čáry na konstantní velikost.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="card-footer py-3">
          <BaseIcon icon-name="Lightbulb" class="me-2" /> Odkaz na ikony: &nbsp;<a target="_blank" href="https://lucide.dev/">Lucide Ikony</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const {select, setRef} = useCopyPaste();

</script>
