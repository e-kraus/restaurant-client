<template>
  <div>
    <hero-bar>
      <span style="padding-right: 20px; padding-bottom: 2px;">
        Menu
      </span>
      <div v-if="$store.state.authentication.role !== 'Buyer'">
        <router-link
          :to="{ name: 'product.new' }"
          class="button is-small"
        >
          <b-icon
            icon="plus"
            size="is-small"
          />
        </router-link>
      </div>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="All Menu Items"
        icon="radio"
      >
        <products-table checkable />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ProductsTable from '@/components/datagrids/ProductsTable.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import HeroBar from '@/components/BaseHeroBar.vue'

export default defineComponent({
  name: 'Products',
  components: {
    HeroBar,
    CardComponent,
    ProductsTable
  },
  data () {
    return {
      titleStack: ['Products']
    }
  }
})
</script>
