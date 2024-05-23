import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="search-logic"
export default class extends Controller {
  static targets = ["input", "submit_button", "suggestions"]

  connect() {
    this.inputTarget.addEventListener('input', this.handleInputChange.bind(this))
    this.submit_buttonTarget.addEventListener('click', this.resolveSearches.bind(this))
  }

  search() {
    const query = this.inputTarget.value

    fetch('/searches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({ query: query, completed: false})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.status)
        // this.resultsTarget.innerHTML = data.results
      })
  }

  handleInputChange = (e) => {
    e.preventDefault()
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.search();
    }, 500);
  }

  resolveSearches = (e) => {
    e.preventDefault()
    const query = this.inputTarget.value

    fetch('/searches/resolve_queries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({ query: query })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.status)
        this.inputTarget.value = '';
        // this.resultsTarget.innerHTML = data.results         
      })
  }
}