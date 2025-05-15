<template>
  <div class="entries">
    Showing <span>{{ getShow().displayStart }}</span> to
    <span>{{ getShow().displayEnd }}</span> of
    <span>{{ totalItem }}</span> entries
  </div>
  <div class="pagination">
    <div class="nav-btn-deactive" v-if="currentPage === 1">Prev</div>
    <span class="nav-btn" @click="goToPage(currentPage - 1)" v-else>
      Prev
    </span>

    <div class="page-name flex" v-for="page in visiblePages" :key="page">
      <button
        v-if="page !== '....'"
        class="page"
        type="button"
        :disabled="page.isDisabled"
        @click="goToPage(page)"
        :class="{ active: isPageActive(page) }"
      >
        {{ page }}
      </button>
      <div v-else class="page-dought">
        {{ page }}
      </div>
    </div>

    <div class="nav-btn-deactive" v-if="currentPage === totalPages">Next</div>
    <span class="nav-btn" @click="goToPage(currentPage + 1)" v-else>
      Next
    </span>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, ref, watch } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalItem: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  visiblePageCount: {
    type: Number,
    default: 3, // Number of visible page buttons
  },
  showEllipsisAfter: {
    type: Boolean,
    default: true, // Whether to show ellipsis after the visible pages
  },
});

let totalPages = ref(Math.ceil(props.totalItem / props.itemsPerPage));
const instance = getCurrentInstance();

const goToPage = (page) => {
  if (page != "..") {
    if (page < 1 || page > props.totalItem) return;
    instance.emit("update:currentPage", page);
  }
};
function isPageActive(page) {
  return props.currentPage === page;
}
const getShow = () => {
  const displayStart =
    props.totalItem > 0 ? (props.currentPage - 1) * props.itemsPerPage + 1 : 0;
  const displayEnd = Math.min(
    (props.currentPage - 1) * props.itemsPerPage + props.itemsPerPage,
    props.totalItem
  );

  return { displayStart, displayEnd };
};

const visiblePages = computed(() => {
  totalPages = Math.ceil(props.totalItem / props.itemsPerPage);
  const currentPage = props.currentPage;
  const visiblePageCount = props.visiblePageCount;
  const showEllipsisAfter = props.showEllipsisAfter;

  if (totalPages <= visiblePageCount) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const visiblePages = [];

  if (currentPage <= Math.ceil(visiblePageCount / 2)) {
    for (let i = 1; i <= visiblePageCount; i++) {
      visiblePages.push(i);
    }
  } else if (currentPage >= totalPages - Math.floor(visiblePageCount / 2)) {
    for (let i = totalPages - visiblePageCount + 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    const start = currentPage - Math.floor(visiblePageCount / 2);
    const end = currentPage + Math.floor(visiblePageCount / 2);
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }
  }

  if (showEllipsisAfter && currentPage > 1) {
    visiblePages.unshift("....");
  }

  if (showEllipsisAfter && currentPage + 1 < totalPages) {
    visiblePages.push("....");
  }

  return visiblePages;
});

watch(
  () => props.currentPage,
  () => {
    totalPages = Math.ceil(props.totalItem / props.itemsPerPage);
    if (!visiblePages.value.includes(props.currentPage)) {
      goToPage(visiblePages.value[0]);
    }
  }
);
</script>
<style lang="scss">
.page-name-button {
  border-radius: 50%;
  border: 1px solid var(--blue);
  height: 1.9rem;
  width: 1.9rem;
}

.active {
  background-color: var(--blue);
  color: #ffffff;
}

button {
  width: 1.8rem;
  height: 1.8rem;
  border: none;
  cursor: pointer;
  border-radius: 50%;
}

.right-arr {
  opacity: 0.5;
  cursor: not-allowed;
  width: 1.9rem;
  height: 1.9rem;

  #icon {
    cursor: not-allowed;
  }
}

.left-arr {
  opacity: 0.5;
  cursor: not-allowed;
  width: 1.9rem;
  height: 1.9rem;

  #icon {
    cursor: not-allowed;
  }
}
</style>
