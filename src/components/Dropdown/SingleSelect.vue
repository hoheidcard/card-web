<template>
  <div class="single-select">
    <input
      type="text"
      ref="inputField"
      v-model="computedValue"
      :placeholder="placeholder"
      @keydown.enter="selectSearch"
      @keyup="search($event)"
      @click="handleKeyDown"
    />
    <ul class="dropdown-options show-drop">
      <li
        v-for="option in options"
        :key="option.id"
        :class="{ 'hidden-option': !isOptionVisible(option) }"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  onBeforeUnmount,
  ref,
} from "vue";

defineEmits(["update:modelValue", "selected", "search"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
  options: {
    type: Array,
    required: true,
  },
  outside: {
    type: Boolean,
    default: true,
  },
});

let searchQuery = ref("");
let inputField = ref(null);
const instance = getCurrentInstance();

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    instance.emit("update:modelValue", value);
  },
});

const selectOption = (option) => {
  computedValue.value = option.name;
  instance.emit("update:modelValue", option.name);
  instance.emit("selected", option);
  focusNextInput();
};

const selectSearch = () => {
  instance.emit("update:modelValue", computedValue.value);
  instance.emit("selected", { id: null, name: computedValue.value });
  focusNextInput();
};

const search = (event) => {
  instance.emit("update:modelValue", computedValue.value);
  instance.emit("search", computedValue.value);
};

const isOptionVisible = (option) => {
  return option.name.toLowerCase().includes(computedValue.value ? computedValue.value.toLowerCase() : "");
};

const focusNextInput = () => {
  const inputs = document.querySelector("body").querySelectorAll("input");
  const currentIndex = Array.from(inputs).indexOf(inputField.value);
  inputs[currentIndex].parentNode.classList.remove("show-drop");
  if (currentIndex < inputs.length - 1) {
    inputs[currentIndex + 1].focus();
    inputs[currentIndex + 1].parentNode.classList.add("show-drop");
  }
};

const handleKeyDown = () => {
  const inputs = document.querySelector("body").querySelectorAll("input");
  const currentIndex = Array.from(inputs).indexOf(inputField.value);
  if (currentIndex >= 0) {
    inputs[currentIndex].parentNode.classList.add("show-drop");
  }
};

onBeforeMount(() => {
  if (props.outside) {
    window.addEventListener("click", handleClickOutside);
  }
});

onBeforeUnmount(() => {
  if (props.outside) {
    window.removeEventListener("click", handleClickOutside);
  }
});

const handleClickOutside = (event) => {
  const clickedElement = event.target;
  const parentClassList = inputField.value.parentNode;
  if (!parentClassList.contains(clickedElement)) {
    parentClassList.classList.remove("show-drop");
  }
};
</script>
