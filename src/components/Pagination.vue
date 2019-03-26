<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="{disabled: isFirstPage }"
      >
        <button class="page-link" @click="onLinkClicked(1)" aria-label="First">
          <span aria-hidden="true">First</span>
        </button>
      </li>
      <li
        class="page-item"
        :class="{disabled: isFirstPage }"
      >
        <button class="page-link" @click="onLinkClicked(previousPage)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li
        class="page-item"
        v-for="i in pagesToBeShown"
        :key="i"
        :class="{active: i === pagination.current_page}"
      >
        <button class="page-link" @click="onLinkClicked(i)">{{ i }}</button>
      </li>
      <li
        class="page-item"
        :class="{disabled: isLastPage }"
      >
        <button class="page-link" @click="onLinkClicked(nextPage)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
      <li
        class="page-item"
        :class="{disabled: isLastPage }"
      >
        <button class="page-link" @click="onLinkClicked(pagination.total_pages)" aria-label="Last">
          <span aria-hidden="true">Last</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    },
    maxNumberOfLinksBeforeCurrentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    maxNumberOfLinksToBeShown () {
      if (this.maxNumberOfLinksBeforeCurrentPage <= 1) {
        return this.maxNumberOfLinksBeforeCurrentPage * 2 + 1 // force a minimum of 3 links to be shown
      }

      return this.maxNumberOfLinksBeforeCurrentPage * 2
    },
    pagesToBeShown () {
      if (this.pagination.total_pages <= this.maxNumberOfLinksToBeShown) {
        return this.getPages(1, this.pagination.total_pages)
      }

      return this.getPages(this.getFirstLink(), this.getLastLink())
    },
    isFirstPage () {
      return this.pagination.current_page === 1
    },
    isLastPage () {
      return this.pagination.current_page === this.pagination.total_pages
    },
    previousPage () {
      if (this.isFirstPage) {
        return 1
      }

      return this.pagination.current_page - 1
    },
    nextPage () {
      if (this.isLastPage) {
        return this.pagination.total_pages
      }

      return this.pagination.current_page + 1
    }
  },
  methods: {
    getPages (start, end) {
      const pages = []

      for (var i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages
    },
    getFirstLink () {
      let start = (this.pagination.current_page - this.maxNumberOfLinksBeforeCurrentPage)

      while ((start + (this.maxNumberOfLinksToBeShown - 1)) > this.pagination.total_pages) {
        start--
      }

      return (start < 1) ? 1 : start
    },
    getLastLink () {
      const end = ((this.getFirstLink() + this.maxNumberOfLinksToBeShown) - 1)

      return (end > this.pagination.total_pages) ? this.pagination.total_pages : end
    },
    onLinkClicked (page) {
      this.$emit('onLinkClicked', page)
    }
  }
}
</script>
