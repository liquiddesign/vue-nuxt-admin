

export default {
root: true,
env: {
browser: true,
node: true,
es2022: true
},
extends: [
'eslint:recommended',
'plugin:vue/vue3-recommended',
'plugin:nuxt/recommended',
'prettier'
],
// Pro moderní syntaxi
parserOptions: {
ecmaVersion: 'latest',
sourceType: 'module'
},
// Vlastní pravidla
rules: {
'vue/multi-word-component-names': 'off'
}
}