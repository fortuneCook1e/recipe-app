import { Search } from "lucide-react";
import React from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

const Homepage = () => {
  const APP_ID = import.meta.env.VITE_APP_ID;
  const APP_KEY = import.meta.env.VITE_APP_KEY;
  // save the data obtained from the API in a useState
  const [recipes, setRecipes] = React.useState([]);

  // a loading state while fetching the data from the API
  const [isLoading, setIsLoading] = React.useState(true);

  // function to fetch the data from the API
  const fetchData = async (searchQuery) => {
    try {
      setIsLoading(true);
      setRecipes([]);
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await res.json();
      console.log(data);
      setRecipes(data.hits);
    } catch (error) {
      console.log("Error fetching data" + error.message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  // use useEffect to fetch the data when the web page loads
  React.useEffect(() => {
    fetchData("chicken");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault(); // submitting form will trigger a page refresh by default, therefore we need to prevent it.
    fetchData(e.target[0].value);
    console.log("handleSearchRecipe: " + e.target);
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Recommended Recipe
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular Choices
        </p>

        {/* RecipeCard */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {/* show the skeleton when isLoading==true */}
          {isLoading &&
            [...Array(9)].map((elem, index) => {
              return (
                <div className="flex w-52 flex-col gap-4" key={index}>
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              );
            })}

          {/* show data when loading is done */}
          {!isLoading &&
            recipes.map(({ recipe }, index) => (
              <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
