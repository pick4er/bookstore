<template>
  <span :class="$style.wrap">
    <template v-if="Boolean(labelText)">
      <label :for="id" :class="labelClasses">
        {{ labelText }}
      </label>
    </template>
    <input 
      ref="input"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :required="required"
      :id="id"
      :class="inputClasses"
      :aria-label="labelText"
    />
  </span>
</template>

<script>
  export default {
    name: 'base-input',
    inheritAttrs: false,
    props: {
      value: {
        type: [Number, String],
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      labelText: {
        type: String,
        default: '',
      },
      labelClass: {
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
      modes: {
        validator(values) {
          const modes = [
            'black', 
            'white', 
            'transparent',
            'textLeft',
            'textCenter',
          ];
          return !values.find(
            value => !modes.includes(value),
          )
        },
        default() {
          return [
            'transparent',
            'textCenter',
          ]
        },
      },
    },
    computed: {
      inputClasses() {
        let modeMappings = [];
        this.modes.forEach(mode => {
          modeMappings = modeMappings.concat(this.$style[mode])
        })

        return [
          this.$style.input,
          modeMappings,
        ];
      },
      labelClasses() {
        return [
          this.$style.label,
          this.required && this.$style.required,
        ]
      },
    },
  };
</script>

<style lang="stylus" module>
  .wrap
    display block

  .input
    border none
    background-color $white
    width 100%
    height x(30)
    color $black
    text-align center
    font-size x(16)
    font-family $robotoLight

    &.white
      border x(1) solid $border

    &.black
      background-color $charleston
      border x(1) solid $white
      color $white

    &.textLeft
      text-align left
      padding-left x(5)
      padding-right x(5)

  .label
    display block
    font-size x(16)
    font-family $robotoRegular
    font-weight normal
    margin-bottom x(7)

    &.required
      &:after
        content '*'
        color $required
</style>
