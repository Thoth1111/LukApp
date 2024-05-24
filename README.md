<a name="readme-top"></a>

# 📗 Table of Contents

- [📗 Table of Contents](#-table-of-contents)
- [LukApp](#about-project)
  - [🚀 Live Demo](#live-demo)
  - [📄\[Project Documentation\] ](#project-documentation)
  - [🛠 Built With ](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Install](#install)
    - [Usage](#usage)
    - [Run tests](#run-tests)
  - [👥 Authors ](#authors)
  - [🤝 Contributing ](#contributing)
  - [⭐️ Show your support ](#️support)
  - [🙏 Acknowledgments ](#acknowledgements)
  - [📝 License ](#license)

<!-- PROJECT DESCRIPTION -->

# LukApp <a name="about-project"></a>

This project is a real time search box with analytics to display what users searched for based on IP address.


The main features of this website are:
- Queries are logged in real time 500ms after a user stops typing and resolved (merged into one query) when submitted.
- Incomplete queries, ie those saved before a submission are deleted if a user abandons the search and clears the input field.
- Queries are stored based on IP address, so each quary is linked to the user this way. To avoid duplicate records, each query has a count property which is updated if an identical query is made.
- Users can view a list of their previous queries listed in descending order from most popular to the least and the count for each query.
- As a user types in the search box, suggestions are displayed below the search box from their previous searches.
- The DOM is updated in real time when queries are made so the search history is updated immediately

## 🚀 Live Demo <a name="live-demo"></a>

- [Link to live demo](https://lukapp.onrender.com/)


## Project Documentation 📄 <a name="project-documentation"></a>

- GitHub repository [link](https://github.com/Thoth1111/LukApp)👈


## Built With 🛠️ <a name="built-with"></a>

- Programming Languages: Ruby, JavaScript.
- Frameworks: Rails.
- Database: PostgreSQL
- Version-Control: Github
- Code Editor: VS Code.

## Getting Started <a name="getting-started"></a>

To get a local copy up and running follow these simple steps.

### Prerequisites

- Rails version 6 or above.
- A code editor like Visual Studio Code.

### Setup

Clone the repository using the GitHub link provided below.

### Install

In the terminal, go to your file directory and run this command.

```
$ git clone https://Thoth1111/Fullstack-Capstone-Project.git
```

### Usage

### Run locally

Make your way to the correct directory by running this command:

```
$ cd LukApp
```

Install the required dependencies to run the project with this command:

```
$ bundle i
```

Then run it in your browser with this command:

```
rails s
```

Kindly modify the files as needed.

### Run tests

To run tests, please run this command

```
rspec
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authors <a name="authors"></a>

👤 **Alwyn Androvelle**

- Github: [@Thoth1111](https://github.com/Thoth1111)
- Twitter: [@androvelle](https://twitter.com/androvelle)
- LinkedIn: [@Alwyn](https://linkedin.com/in/alwyn-androvelle-simiyu)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Thoth1111/LukApp/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Show your support  <a name="️support"></a>

Give a ⭐️ if you like this project!

## Acknowledgments <a name="acknowledgements"></a>

- Ideogram.AI for logo design

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
