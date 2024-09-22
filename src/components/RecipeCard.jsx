import React, { useState } from "react";
import { Soup, Heart, HeartPulse } from "lucide-react";

const RecipeCard = ({ recipe, bg, badge }) => {
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // current favorites
    const isAlreadyInFavorites = favorites.some(
      (fav) => fav.label === recipe.label // if current recipe is in favorite, return True
    );

    if (!isAlreadyInFavorites) {
      favorites.push(recipe);
      setIsFavorite(true);
    } else {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div
      className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
    >
      <a
        href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
        target="_blank"
        className="relative h-32"
      >
        <img
          src={recipe.image}
          alt="recipe img"
          className="rounded-md w-full h-full object-cover cursor-pointer"
        />
        <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center">
          <Soup size={"16"} /> {recipe.yield} Servings
        </div>

        <div
          className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavorites();
          }}
        >
          {!isFavorite && (
            <Heart
              size={"16"}
              className="hover:fill-red-500 hover:text-red-500"
            />
          )}
          {isFavorite && (
            <Heart size={"16"} className="fill-red-500 text-red-500" />
          )}
        </div>
      </a>
      {/* additional info of the food */}
      <div className="flex mt-1">
        <p className="font-bold tracking-wide">{recipe.label}</p>
      </div>
      <p className="my-2">
        {/* capitalize the 1st letter */}
        {recipe.cuisineType[0].charAt(0).toUpperCase() +
          recipe.cuisineType[0].slice(1)}{" "}
        Kitchen
      </p>

      <div className="flex gap-2 mt-auto">
        {recipe.healthLabels.slice(0, 2).map((elem, index) => {
          return (
            <div
              className={`flex gap-1 ${badge} items-center p-1 rounded-md`}
              key={index}
            >
              <HeartPulse size={16} />
              <span className="text-sm tracking-tighter font-semibold">
                {elem}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeCard;
