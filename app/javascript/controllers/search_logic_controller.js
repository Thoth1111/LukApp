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
      listItem.classList.add('text-stone-500', 'bg-white', 'p-2', 'w-80', 'cursor-pointer', 'hover:text-stone-800', 'transition', 'duration-300', 'ease-in-out');
      const suggestedQuery = document.createElement('p');
      suggestedQuery.textContent = suggestion;
      suggestedQuery.addEventListener('click', (e) => {
        this.resolveSearches(e, suggestion);
      });
      listItem.appendChild(suggestedQuery);
      this.suggestionsTarget.appendChild(listItem);
    });
  }

  // Resolve the search query and update the search history on submit
  resolveSearches = (e, suggestion = null) => {
    e.preventDefault()
    let query = suggestion ? suggestion.trim().toLowerCase() : this.inputTarget.value.trim().toLowerCase()
    if (query.length === 0) return;

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
        this.suggestionsTarget.innerHTML = '';
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
      countElement.textContent = `search count ${count + 1}`;
    } else {
      const listItem = document.createElement('li');
      listItem.classList.add('flex', 'justify-between', 'items-center', 'w-full', 'gap-14', 'text-stone-600');
      listItem.innerHTML = `
        <h5 class="text-lg">${newQuery.query}</h5>
        <p class="text-md">search count: ${newQuery.count}</p>
      `;
      this.historyTarget.appendChild(listItem);
    }
  }
}