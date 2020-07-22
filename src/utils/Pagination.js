class Pagination {
  constructor(collection) {
    this.collection = collection;
    this.pageSize = 5;
    this.totalPages = Math.ceil(this.collection.length / this.pageSize);
    this.currPage = 1;
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage() {
    if (this.currPage < this.totalPages) {
      this.currPage += 1;
    }
  }

  prevPage() {
    if (this.currPage > 1) {
      this.currPage -= 1;
    }
  }
}

export default Pagination;
