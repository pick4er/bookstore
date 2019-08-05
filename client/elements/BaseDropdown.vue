<template>
  <span :class="$style.dropdown">
    <template v-if="Boolean(labelText)">
      <div :class="labelClasses">
        {{ labelText }}
      </div>
    </template>
    <div :class="$style.buttonWrap">
      <button 
        ref="button"
        type="button"
        :class="$style.selectionButton" 
        @click="isOpen = !isOpen"
      >
        <template v-if="selectionedItemValue">
          <span :class="[$style.selection, selectionClass]">
            {{ selectionedItemValue }}
          </span>
        </template>
        <template v-else>
          <span :class="[
            $style.selection,
            $style.selectionMessage
          ]">{{ selectionMessage }}</span>
        </template>
        <span :class="$style.triangle">
          {{ triangle }}
        </span>
      </button>
      <template v-if="isOpen">
        <ul 
          :class="[$style.list, listClass]"
          :style="listPosition"
        >
          <li 
            v-for="(value, i) in values"
            :key="pickKey(value)"
            :class="selectionedItemKey === pickKey(value) && 
              $style.selected"
          >
            <button 
              type="button"
              @mouseover="selectionedItemKey = pickKey(value)"
              @focus="selectionedItemKey = pickKey(value)"
              @click="onItemSelect"
              :class="buttonClass"
            >{{ pickValue(value) }}</button>
          </li>
        </ul>
      </template> 
    </div>
  </span>
</template>

<script>

  export default {
    name: 'base-dropdown',
    data() {
      return {
        isOpen: false,
        listPosition: {},
        selectionedItemKey: null,
        // to prevent trembling
        prevSelectionedItemValue: null,
      }
    },
    props: {
      values: {
        type: Array,
        required: true,
      },
      titleKey: {
        type: [String, Number],
      },
      selectionKey: {
        type: [String, Number],
      },
      onOpen: {
        type: Function,
        default: () => {},
      },
      onClose: {
        type: Function,
        default: () => {},
      },
      onSelect: {
        type: Function,
        default: () => {},
      },
      labelText: {
        type: String,
        default: '',
      },
      labelClass: {
        type: String,
        default: '',
      },
      listClass: {
        type: String,
        default: '',
      },
      buttonClass: {
        type: String,
        default: '',
      },
      selectionClass: {
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
      direction: {
        validator(value) {
          const directions = [
            'top',
            'right',
            'bottom',
            'left',
          ];
          return directions
            .indexOf(value) !== -1
        },
        default: 'right',
      },
    },
    mounted() {
      this.$nextTick(
        this.updateListPosition
      );
    },
    updates() {
      const self = this;
    },
    watch: {
      isOpen(nextIsOpen) {
        if (nextIsOpen === true) {
          return this.onOpen();
        }

        if (nextIsOpen === false) {
          this.selectionedItemKey = null;
          return this.onClose();
        }
      }
    },
    computed: {
      labelClasses() {
        return [
          this.$style.label,
          this.required && this.$style.required,        
          this.labelClass,
        ]
      },
      triangle() {
        return this.isOpen ?
          '\u25B2' :
          '\u25BC';
      },
      selectionMessage() {
        if (this.values.length === 0) {
          return 'Список пуст';
        }

        if (this.isOpen === false) {
          return 'Нажмите, чтобы выбрать';
        }

        if (this.isOpen === true && !this.selectionedItemKey) {
          return 'Выбирайте';
        }
      },
      selectionedItemValue() {
        const selectionedItem = this.values.find(
          v => this.selectionedItemKey === this.pickKey(v)
        );

        if (this.isOpen === false) {
          return;
        }

        if (typeof selectionedItem === 'undefined') {
          if (this.isOpen && this.values.length > 0 && this.selectionedItemKey) {
            return this.prevSelectionedItemValue;
          }

          return;
        }

        this.prevSelectionedItemValue = this.pickValue(selectionedItem);
        return this.prevSelectionedItemValue;
      },
    },
    methods: {
      changeOpenState(nextIsOpen) {
        this.isOpen = nextIsOpen;
      },
      updateListPosition() {
        const button = this.$refs.button.getBoundingClientRect();
        let listPosition = {
          top: '0px',
          left: '0px',
        };

        if (this.direction === 'top') {
          listPosition = {
            ...listPosition,
            width: button.width + 'px',
            top: -(32 * 5) - // $itemHeight * $itemCount
              10 + // just a gap between list and button
              'px',
          }
        } else if (this.direction === 'right') {
          listPosition = {
            ...listPosition,
            left: button.width + 
              10 + // just a gap
              'px',
          }
        } else if (this.direction === 'bottom') {
          listPosition = {
            ...listPosition,
            width: button.width + 'px',
            top: button.height +
              10 + // a gap
              'px',
          }
        }

        this.listPosition = listPosition;
      },
      onItemSelect() {
        this.onSelect(this.selectionedItemKey);
      },
      pickKey(item) {
        if (typeof item[this.selectionKey] !== 'undefined') {
          return item[this.selectionKey];
        }

        if (typeof item[this.titleKey] !== 'undefined') {
          return item[this.titleKey];
        }

        if (typeof item !== 'Object') {
          return item
        }

        return;
      },
      pickValue(item) {
        if (typeof item[this.titleKey] !== 'undefined') {
          return item[this.titleKey];
        }

        if (typeof item !== 'Object') {
          return item
        }

        return;
      },
    },
  }
</script>

<style lang="stylus" module>
  html[data-layout="mobile"]
    $itemHeight = x(27)
    $itemCount = 6

    .dropdown
      .label
        font-size x(14)
        margin-bottom x(5)

      .selectionButton
        height x(25)
        font-size x(12)
        
        .selection
          line-height x(20)

        .triangle
          line-height x(18)

      .list
        font-size x(14)
        height $itemHeight * $itemCount + x(2)

  $itemHeight = x(32)
  $itemCount = 5

  .dropdown
    display block

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

  .buttonWrap
    position relative

  .selectionButton
    display flex
    flex-flow row nowrap
    border x(1) solid $border
    background-color $white
    width 100%
    height x(30)
    color $black
    font-size x(16)
    font-family $robotoLight

    .selection
      text-align left
      flex-grow 1
      margin-right x(5)
      line-height x(26)

      &.selectionMessage
        font-style italic

    .triangle
      color $charleston
      line-height x(24)
      margin-right x(5)

  .list
    clearList()
    position absolute
    border x(1) solid $border
    width x(214)
    height $itemHeight * $itemCount + x(2)
    background-color $white
    font-size x(16)
    font-family $robotoLight
    overflow auto

    .selected
      background-color $hover

    li
      button
        width 100%
        text-align left
        height $itemHeight
        background-color transparent
        border none
</style>
