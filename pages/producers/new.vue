<template>
  <BasePageCard>
    <template #header>
      <BaseButtonBack wrap="btn-actions-pane-left" @click="$router.push({name: 'administratorsRoles'})" />
      <BaseButtonSave wrap="btn-actions-pane-right" @click="$refs.form.submit()" />
    </template>
    <ProducersForm />
  </BasePageCard>
</template>