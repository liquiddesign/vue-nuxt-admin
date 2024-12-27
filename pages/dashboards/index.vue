<template>
  <BaseAlert type="success" icon="fa-user">Tohle je zakladni alert</BaseAlert>

  <select v-model="locale">
    <option value="en">en</option>
    <option value="cs">cs</option>
  </select>

  {{ $t('backHome2', { name: 'vue-i18n' }) }}

  <div class="notifications-box">
    <div class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--one-column">
      <div class="vertical-timeline-item dot-danger vertical-timeline-element">
        <div>
          <span class="vertical-timeline-element-icon bounce-in" />
          <div class="vertical-timeline-element-content bounce-in">
            <h4 class="timeline-title">
              Smazán záznam 12312321321 v administratos
              <div class="avatar-wrapper mt-2 avatar-wrapper-overlap">
                <div class="avatar-icon-wrapper avatar-icon-sm">
                  <div class="avatar-icon user-avatar bg-warning" style="display: inline-flex">
                    <span class="initials">AB</span>
                  </div>
                  <div class="avatar-icon user-avatar bg-warning" style="display: inline-flex; left: -10px; position: relative;">
                    <span class="initials">?</span>
                  </div>
                  <div class="avatar-icon user-avatar bg-warning" style="display: inline-flex; left: -20px; position: relative;">
                    <span class="initials">AB</span>
                  </div>
                  <div class="avatar-icon user-avatar bg-warning" style="display: inline-flex; left: -30px; position: relative;">
                    <span class="initials">AB</span>
                  </div>
                </div>
              </div>
            </h4>
            <span class="vertical-timeline-element-date" />
          </div>
        </div>
      </div>
      <div class="vertical-timeline-item dot-warning vertical-timeline-element">
        <div>
          <span class="vertical-timeline-element-icon bounce-in" />
          <div class="vertical-timeline-element-content bounce-in">
            <p>Yet another one, at <span class="text-success">15:00 PM</span></p>
            <span class="vertical-timeline-element-date" />
          </div>
        </div>
      </div>
      <div class="vertical-timeline-item dot-success vertical-timeline-element">
        <div>
          <span class="vertical-timeline-element-icon bounce-in" />
          <div class="vertical-timeline-element-content bounce-in">
            <h4 class="timeline-title">
              Build the production release
              <span class="badge badge-danger ml-2">NEW</span>
            </h4>
            <span class="vertical-timeline-element-date" />
          </div>
        </div>
      </div>
      <div class="vertical-timeline-item dot-primary vertical-timeline-element">
        <div>
          <span class="vertical-timeline-element-icon bounce-in" />
          <div class="vertical-timeline-element-content bounce-in">
            <h4 class="timeline-title">
              Something not important
              <div class="avatar-wrapper mt-2 avatar-wrapper-overlap">
                <div class="avatar-icon-wrapper avatar-icon-sm">
                  <div class="avatar-icon" />
                </div>
                <div class="avatar-icon-wrapper avatar-icon-sm">
                  <div class="avatar-icon" />
                </div>
                <div class="avatar-icon-wrapper avatar-icon-sm">
                  <div class="avatar-icon" />
                </div>
                <div class="avatar-icon-wrapper avatar-icon-sm">
                  <div class="avatar-icon" />
                </div>
                <div class="avatar-icon-wrapper avatar-icon-sm">
                  <div class="avatar-icon" />
                </div>
                <div class="avatar-icon-wrapper avatar-icon-sm">
                  <div class="avatar-icon" />
                </div>
                <div class="avatar-icon-wrapper avatar-icon-sm">
                  <div class="avatar-icon" />
                </div>
                <div class="avatar-icon-wrapper avatar-icon-sm">
                  <div class="avatar-icon" />
                </div>
                <div class="avatar-icon-wrapper avatar-icon-sm avatar-icon-add">
                  <div class="avatar-icon"><i>+</i></div>
                </div>
              </div>
            </h4>
            <span class="vertical-timeline-element-date" />
          </div>
        </div>
      </div>
      <div class="vertical-timeline-item dot-info vertical-timeline-element">
        <div>
          <span class="vertical-timeline-element-icon bounce-in" />
          <div class="vertical-timeline-element-content bounce-in">
            <h4 class="timeline-title">This dot has an info state</h4>
            <span class="vertical-timeline-element-date" />
          </div>
        </div>
      </div>
      <div class="vertical-timeline-item dot-danger vertical-timeline-element">
        <div>
          <span class="vertical-timeline-element-icon bounce-in" />
          <div class="vertical-timeline-element-content bounce-in">
            <h4 class="timeline-title">All Hands Meeting</h4>
            <span class="vertical-timeline-element-date" />
          </div>
        </div>
      </div>
      <div class="vertical-timeline-item dot-warning vertical-timeline-element">
        <div>
          <span class="vertical-timeline-element-icon bounce-in" />
          <div class="vertical-timeline-element-content bounce-in">
            <p>
              Yet another one, at <span class="text-success">15:00 PM</span>
            </p><span class="vertical-timeline-element-date" />
          </div>
        </div>
      </div>
      <div class="vertical-timeline-item dot-success vertical-timeline-element">
        <div>
          <span class="vertical-timeline-element-icon bounce-in" />
          <div class="vertical-timeline-element-content bounce-in">
            <h4 class="timeline-title">
              Build the production release
              <span class="badge badge-danger ml-2">NEW</span>
            </h4>
            <span class="vertical-timeline-element-date" />
          </div>
        </div>
      </div>
      <div class="vertical-timeline-item dot-dark vertical-timeline-element">
        <div>
          <span class="vertical-timeline-element-icon bounce-in" />
          <div class="vertical-timeline-element-content bounce-in">
            <h4 class="timeline-title">This dot has a dark state</h4>
            <span class="vertical-timeline-element-date" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import {useI18n} from 'vue-i18n';

const { locale } = useI18n();


</script>