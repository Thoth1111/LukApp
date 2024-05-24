import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="search-logic"
export default class extends Controller {
  static targets = ["input", "submit_button", "history", "suggestions"]

  connect() {
    this.inputTarget.addEventListener('input', this.handleInputChange.bind(this))
    this.submit_buttonTarget.addEventListener('click', this.resolveSearches.bind(this))
  }

  search() {
    const query = this.inputTarget.value.trim().toLowerCase()

    // Reset suggestions if query is empty or cleared
    if (query.length === 0) {
      this.suggestionsTarget.innerHTML = '';
      return;
    }

    // Post incomplete query to the server and return suggestions
    fetch('/searches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({ query: query, completed: false })
    })
      .then(response => response.json())
      .then(data => {
        this.showSuggestions(data.suggestions)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Delete incomplete queries if user clears the input field without submission
  deleteIncompleteQueries() {
    fetch('/searches/delete_incomplete_queries', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.status);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // handler to submit the query 500ms after the user stops typing
  handleInputChange = (e) => {
    e.preventDefault()
    clearTimeout(this.timer)
    if (this.inputTarget.value.length < 1) {      
      this.deleteIncompleteQueries();
      this.suggestionsTarget.innerHTML = '';
      return;
    }      
    this.timer = setTimeout(() => {
      this.search();
    }, 500);
  }

  // Display suggestions to the user
  showSuggestions(suggestions) {
    this.suggestionsTarget.innerHTML = '';
    suggestions.forEach(suggestion => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <p>${suggestion}</p>
      `;
      this.suggestionsTarget.appendChild(listItem);
    });
  }

  // Resolve the search query and update the search history on submit
  resolveSearches = (e) => {
    e.preventDefault()
    const query = this.inputTarget.value.trim().toLowerCase()

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
        this.updateSearchHistory(data.new_query)
        this.inputTarget.value = '';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Update the search history in the DOM
  updateSearchHistory(newQuery) {
    const existingQuery = Array.from(this.historyTarget.children).find(item => {
      const queryHead = item.querySelector('h5');
      return queryHead && queryHead.textContent.trim() === newQuery.query;
    });

    if (existingQuery) {
      const countElement = existingQuery.querySelector('p');
      const count = parseInt(countElement.textContent.split(':')[1].trim());
      countElement.textContent = `Searched: ${count + 1} times`;
    } else {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h5>${newQuery.query}</h5>
        <p>Searched: ${newQuery.count} times</p>
      `;
      this.historyTarget.appendChild(listItem);
    }
  }
}