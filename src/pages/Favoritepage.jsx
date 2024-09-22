import React from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

const Favoritepage = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div className="bg-[#faf9fb] flex-1 p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Favorite Recipes
        </h1>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {favorites.map((elem, index) => (
            <RecipeCard key={index} recipe={elem} {...getRandomColor()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favoritepage;
