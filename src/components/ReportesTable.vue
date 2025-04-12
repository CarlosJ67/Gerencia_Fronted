<template>
    <div class="data-table">
      <input type="text" v-model="searchQuery" placeholder="Buscar..." class="search-input" />
  
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index" @click="sortTable(index)">
              {{ header }}
              <span v-if="sortKey === index">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td>{{ item.sucursal }}</td>
            <td>{{ item.mes }}</td>
            <td>{{ item.ingresos }}</td>
            <td>{{ item.egresos }}</td>
            <td>{{ item.beneficio_neto }}</td>
            <td>{{ item.actividad }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="pagination">
        <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: Array,
      headers: Array,
    },
    data() {
      return {
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 5,
        sortKey: null,
        sortOrder: 'asc',
      };
    },
    computed: {
      filteredData() {
        return this.data.filter(item => {
          return Object.values(item).some(value =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      },
      sortedData() {
        if (this.sortKey === null) {
          return this.filteredData;
        }
        const clonedData = [...this.filteredData];
        return clonedData.sort((a, b) => {
          let result = 0;
          const aValue = Object.values(a)[this.sortKey];
          const bValue = Object.values(b)[this.sortKey];
          if (aValue < bValue) {
            result = -1;
          } else if (aValue > bValue) {
            result = 1;
          }
          return this.sortOrder === 'asc' ? result : -result;
        });
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.sortedData.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.sortedData.length / this.itemsPerPage);
      },
    },
    methods: {
      sortTable(index) {
        if (this.sortKey === index) {
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortKey = index;
          this.sortOrder = 'asc';
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .data-table {
    width: 100%;
    margin: 20px 0;
  }
  
  .search-input {
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    cursor: pointer;
    background-color: #f4f4f4;
  }
  
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  
  button {
    padding: 8px 12px;
    cursor: pointer;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .pagination-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .pagination-button:hover {
    background-color: #0056b3;
  }
  
  .pagination-button:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
  </style>