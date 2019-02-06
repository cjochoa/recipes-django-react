import React, { Component } from "react";
import Card from "./Card";
import Spacer from "./Spacer";
import Layout from "./Layout";
import Button from "./Button";
import Input from "./Input";
import Image from "./Image";

class Recipe extends Component {
  constructor(props) {
    super(props);
    const { recipe } = props;
    recipe.ingredients = this.jsonToString(recipe.ingredients);
    this.handleAction = props.handleAction;
    this.buttonImage = props.buttonImage;
    this.buttonLbl = props.buttonLbl;
    this.state = {
      recipe
    };
  }

  submitRecipe = evt => {
    console.log("submit recipe");
    const validRecipe = this.validateRecipe(this.state.recipe);
    if (validRecipe) {
      this.handleAction(validRecipe, this.buttonImage !== "tick");
    } else {
      alert("Please fill all fields");
    }
  };

  updateButton() {
    this.buttonImage = "tick";
    this.buttonLbl = "Save Recipe";
  }

  handleName = evt => {
    console.log("handle name");
    const name = evt.currentTarget.value;
    this.updateButton();
    this.setState(state => {
      const newRecipe = state.recipe;
      newRecipe.name = name;
      return { recipe: newRecipe };
    });
  };

  handleDescription = evt => {
    console.log("handle description");
    this.updateButton();
    const description = evt.currentTarget.value;

    this.setState(state => {
      const newRecipe = state.recipe;
      newRecipe.description = description;
      return { newRecipe };
    });
  };

  handleIngredients = evt => {
    console.log("handle ingredients");
    this.updateButton();
    const ingredients = evt.currentTarget.value;

    this.setState(state => {
      const newRecipe = state.recipe;
      newRecipe.ingredients = ingredients;
      return { newRecipe };
    });
  };

  stringToJson(names) {
    //console.log('called with ' + names)
    const result = names
      .replace(/,$/, "")
      .split(",")
      .map(function(name) {
        return { name: name };
      });
    //console.log('stringToJson returns ' + result)
    return result;
  }

  jsonToString(ingredients) {
    //console.log(`called with ${JSON.stringify(ingredients)}`);
    const result = ingredients
      .map(function(elem) {
        return elem["name"];
      })
      .join()
      .replace(/,/g, ", ");
    //console.log('jsonToString returns ' + result)
    return result;
  }

  validateRecipe = recipe => {
    if (
      recipe.name !== "" &&
      recipe.description !== "" &&
      recipe.ingredients !== ""
    ) {
      recipe.ingredients = this.stringToJson(recipe.ingredients);
      return recipe;
    }
    return null;
  };

  render() {
    const { recipe } = this.state;
    return (
      <Card>
        <Spacer top={2} right={0} bottom={0} left={0} />
        <Layout center="all">
          <form onSubmit={this.submitRecipe}>
            <Input
              placeholder="Recipe Name"
              value={recipe.name}
              onChange={this.handleName}
            />
            <Input
              placeholder="Recipe Description"
              value={recipe.description}
              onChange={this.handleDescription}
            />

            <Input
              placeholder="Ingredients"
              defaultValue={recipe.ingredients}
              onChange={this.handleIngredients}
            />
            <Button>
              <Image
                src={require(`../images/${this.buttonImage}.png`)}
                alt={"Search"}
              />
            </Button>
          </form>
        </Layout>

        <Spacer top={0} right={0} bottom={2} left={0} />
      </Card>
    );
  }
}

export default Recipe;
