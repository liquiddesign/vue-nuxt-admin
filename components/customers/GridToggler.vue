<template>
  <td colspan="10" class="p-0" style="background-color: white !important;"><div class="px-4 py-2 bg-white" style="border: 10px solid #f8f8f8;">
    <div class="row">
      <div class="col-lg-6">
        <table class="mb-2 table table-sm">
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Petr Marek</td>
            <td>marek@lqd.cz</td>
            <td>   <button class="btn btn-xs btn-outline-success me-1"><i class="fa fa-pencil"></i></button><button class="btn btn-xs btn-outline-primary"><i class="fa fa-sign-in"></i></button></td>
          </tr>

          <tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
            <td><button class="btn btn-xs btn-outline-success"><i class="fa fa-plus"></i></button></td>
          </tr>
          </tbody>
        </table></div>
      <div class="col-lg-6">
        <ul v-if="0" class="list-group list-group-flush" >
          <li class="bg-transparent list-group-item pt-0">
            <div class="widget-content p-0">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left">
                    <div class="widget-heading">Total Orders</div>
                    <div class="widget-subheading">Last year expenses</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers text-success" style="font-size: 1.2rem;">1896</div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="bg-transparent list-group-item">
            <div class="widget-content p-0">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left">
                    <div class="widget-heading">Clients</div>
                    <div class="widget-subheading">Total Clients Profit</div>
                  </div>
                  <div class="widget-content-right" >
                    <div class="widget-numbers text-primary" style="font-size: 1.3rem;">$12.6k</div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div v-if="1" class="pt-0 pb-0">
          <ul class="list-group list-group-flush">
            <li class="list-group-item pt-0">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">

                      <div class="widget-heading">Objednávka: <a href="">E2324324 <i class="fa fa-external-link"></i></a></div>
                      <div class="widget-subheading">18.12 2022 22:11</div>
                    </div>

                    <div class="widget-content-right">

                      <div class="widget-numbers text-lqd"  style="font-size: 1.4rem;">1896 Kč</div>
                    </div>
                  </div>
                  <div class="widget-progress-wrapper">
                    <div class="progress-bar-sm progress-bar-animated-alt progress" style="height: 4px;">
                      <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                      </div>
                    </div>
                    <div class="progress-sub-label">
                      <div class="sub-label-left">marek@lqd.cz</div>
                      <div class="sub-label-right">Expedováno</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div></td>
</template>