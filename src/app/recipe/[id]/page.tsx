'use client'

import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const recipePage = ({params}: {params: {id:string}}) => {
    const { id } = params
    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const { user, setUser } = useUserContext() as UserContextType;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                if (id) {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    const data = await response.json();
                    setRecipe(data.meals[0])
                }
            } catch (error) {
                console.error("Error fetching recipe", error);
            }
        }
        fetchRecipes();
    }, []);

    const handleClick = ((id: string) => {
        if (user) {
            let updatedSavedRecipes;

            if (user.savedRecipes.includes(id)) {
                updatedSavedRecipes = user.savedRecipes.filter(favId => favId !== id);
            } else {
                updatedSavedRecipes = [...user.savedRecipes, id]
            }
            setUser({...user, savedRecipes: updatedSavedRecipes})
        }
    })

    return (
        <div className="flex flex-col flex-1 text-center bg-zinc-300 py-8 items-center">
            {recipe ? (
            <>
                <h1 className="text-3xl p-4 font-bold">{recipe.strMeal}</h1>
                <button onClick={() => handleClick(id)}>
                    {user && user.savedRecipes.includes(id) ? (
                        <FaHeart className="text-red-600 text-2xl" />
                    ) : (
                        <FaHeartBroken className="text-gray-400 text-2xl" />
                    )}
                </button>
                <h3 className="p-4">{recipe.strArea} | {recipe.strCategory}</h3>
                <div className="flex flex-col sm:flex-row justify-evenly px-8 items-center sm:items-start">
                    <img 
                        src={recipe.strMealThumb} 
                        alt={recipe.strMealThumb}
                        className="w-72 h-72 object-cover rounded-lg sm:pt-[68px]"
                    />
                    <div>
                        <h3 className="text-xl font-bold p-4">How it's made!</h3>
                        <p className="w-78 sm:px-8">{recipe.strInstructions}</p>
                    </div>
                </div>
            </>
        ) : (
            <p>Loading recipe...</p>
            )}
        </div>
    );
}

export default recipePage;