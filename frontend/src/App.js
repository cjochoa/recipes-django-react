import React, { Component } from "react";
import "./App.css";
import Recipe from "./components/Recipe";
import Title from "./components/Title";
import Text from "./components/Text";
import Spacer from "./components/Spacer";
import Button from "./components/Button";
import Input from "./components/Input";
import Image from "./components/Image";
import Layout from "./components/Layout";

class App extends Component {
  state = { recipes: [] };
  serverUrl = "http://127.0.0.1:8000/recipes/";
  nameFilter = "";
  ingredientsFilter = "";

  async updateRecipes() {
    let serverUrl = this.nameFilter
      ? `${this.serverUrl}?name=${this.nameFilter}`
      : this.serverUrl;
    const joinOp = this.nameFilter ? "&" : "?";
    if (this.ingredientsFilter) {
      serverUrl += `${joinOp}ingredient=${this.ingredientsFilter
        .replace(/\s+/g, "")
        .replace(",", "&ingredient=")}`;
    }
    //console.log(`refreshing recipes from ${serverUrl}`);

    try {
      const res = await fetch(serverUrl);
      const recipes = await res.json();
      this.setState({
        recipes
      });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    this.updateRecipes();
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name + " " + e.target.value);
  };

  addRecipe = recipe => {
    console.log(`adding ${JSON.stringify(recipe)}`);

    fetch(this.serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    });
    this.updateRecipes();
  };

  editRecipe = (recipe, shouldDelete) => {
    // const serverurl = `${this.serverUrl}${recipe.id}/`
    const serverurl = `${this.serverUrl}${recipe.id}/`;
    const method = shouldDelete ? "DELETE" : "PATCH";
    console.log(`${method} ${serverurl} ${JSON.stringify(recipe)}`);
    fetch(serverurl, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    });
    this.updateRecipes();
  };

  handleNameFilter = evt => {
    evt.preventDefault();
    this.nameFilter = evt.currentTarget.value;
    this.updateRecipes();
    //console.log(`new filter ${this.nameFilter}`);
  };

  handleIngredientsFilter = evt => {
    evt.preventDefault();
    this.ingredientsFilter = evt.currentTarget.value;
    this.updateRecipes();
    //console.log(`new filter ${this.ingredientsFilter}`);
  };

  searchWithFilter = evt => {
    evt.preventDefault();
    this.updateRecipes();
  };

  render() {
    const emptyRecipe = { name: "", description: "", ingredients: [] };
    return (
      <React.Fragment>
        <Title>Add a new recipe</Title>
        <Recipe
          recipe={emptyRecipe}
          handleAction={this.addRecipe}
          buttonImage="add"
          buttonLbl="add recipe"
        />
        <Spacer top={1} right={2} bottom={0} left={2} />

        <Title>Current recipes</Title>
        <Layout center="all">
          <form onSubmit={this.searchWithFilter}>
            <Text>filter by </Text>
            <Input placeholder="name" onChange={this.handleNameFilter} />

            <Input
              placeholder="ingredients (comma separated)"
              onChange={this.handleIngredientsFilter}
            />
            <Button>
              <Image
                src={require(`./images/search.png`)}
                alt={this.buttonLbl}
              />
            </Button>
          </form>
        </Layout>

        {this.state.recipes.map(recipe => (
          <Recipe
            recipe={recipe}
            key={recipe.id}
            handleAction={this.editRecipe}
            buttonImage="delete"
            buttonLbl="delete recipe"
          />
        ))}
      </React.Fragment>
    );
  }
}

export default App;
