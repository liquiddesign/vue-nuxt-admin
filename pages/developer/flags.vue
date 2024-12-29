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
              <BaseAvatar :userId="'user123'" />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('avatarExample')">
                    <i class="fa fa-copy" />
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
              <BaseFlag lang="cz" />
              <BaseFlag lang="gb" style="font-size: 20px;" />

              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('flagExample')">
                    <i class="fa fa-copy" />
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

  <div id="base-flag" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">Pe-7s <small class="ps-1">sada ikonek</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka</h6>
              <span style="font-size: 1.5rem"><i class="pe-7s-users " /></span>
              <span style="font-size: 1.5rem"><i class="pe-7s-users icon-gradient bg-ripe-malin" /></span>
              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('flagExample2')">
                    <i class="fa fa-copy" />
                  </BaseButton>
                  <code :ref="el => setRef('flagExample2', el)">
                    {{ `<i class="pe-7s-users " />` }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer py-3">
          <i class="fa fa-lightbulb-o me-2" /> Odkaz na ikony: &nbsp;<a target="_blank" href="https://themes-pixeden.com/font-demos/7-stroke">https://themes-pixeden.com/font-demos/7-stroke</a>
        </div>
      </div>
    </div>
  </div>

  <div id="base-flag" class="row mb-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">Font awesome 4 <small class="ps-1">sada ikonek</small></h5>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- Ukázka -->
            <div class="col-md-6">
              <h6>Ukázka</h6>
              <i class="fa fa-user" />
              <i class="fa fa-bookmark-o" />
              <!-- Použití -->
              <div id="pouziti" class="mt-4">
                <h6>Použití</h6>
                <div class="code-example">
                  <BaseButton class="btn-light btn-xs" @click="select('flagExample3')">
                    <i class="fa fa-copy" />
                  </BaseButton>
                  <code :ref="el => setRef('flagExample3', el)">
                    {{ `<i class="fa fa-user " />` }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer py-3">
          <i class="fa fa-lightbulb-o me-2" /> Odkaz na ikony: &nbsp;<a target="_blank" href="https://fontawesome.com/v4/icons/">https://fontawesome.com/v4/icons/</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const {select, setRef} = useCopyPaste();

</script>
