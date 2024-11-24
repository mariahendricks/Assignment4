'use client'

import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import Link from "next/link";

const profilePage = () => {
    const {user, setUser} = useUserContext() as UserContextType;
    const [recipes, setRecipes] = useState<RecipeType[] | null>(null)
    const savedRecipes = user?.savedRecipes || [];

    useEffect(() => {
        const fetchRecipes = async () => {
            if (savedRecipes.length > 0) {
                try {
                    const fetchedRecipes = await Promise.all(
                        savedRecipes.map(async (id) => {
                            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                            const data = await response.json();
                            return data.meals[0];
                        })
                    );
                        
                    setRecipes(fetchedRecipes);
                } catch (error) {
                    console.error("Error fetching recipe", error);
                }
            } else {
                setRecipes([]);
            }
        }
        fetchRecipes();
    }, [savedRecipes]);

    const handleClick = (id: string) => {
        if (user) {
            let updatedSavedRecipes: string[];

            if (user.savedRecipes.includes(id)) {
                updatedSavedRecipes = user.savedRecipes.filter(favId => favId !== id);
            } else {
                updatedSavedRecipes = [...user.savedRecipes, id]
            }
            
            setUser({...user, savedRecipes: updatedSavedRecipes})
        }
    };

    return (
        <section className="flex flex-col flex-1 text-center bg-gray-200 py-8">
            <h1 className="text-3xl font-bold">My Profile Page</h1>
            <h3 className="text-xl font-bold p-4 text-cyan-700">
                {user?.name}'s favorite food category is {user?.category}
            </h3>
            <h3 className="text-2xl pb-8">My saved recipes</h3>
            <div className="flex flex-wrap gap-6 px-8 justify-center">
                {recipes && recipes?.length > 0 ? (
                    recipes.map((meal => (
                        <div
                            className="flex flex-col items-center w-[250px] bg-gray-900 p-4 border border-gray-300 rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:translate-y-[-4px] transition-all duration-300 ease-in-out transform text-white relative"
                            key={meal.idMeal}
                        >
                            <div className="flex justify-between mb-2">
                                <button onClick={() => handleClick(meal.idMeal)}>
                                    {user && user.savedRecipes.includes(meal.idMeal) ? (
                                        <FaHeart className="text-red-600 text-2xl" />
                                    ) : (
                                        <FaHeartBroken className="text-gray-400 text-2xl" />
                                    )}
                                </button>
                            </div>
                            <Link href={`/recipe/${meal.idMeal}`} className="block">
                                <p className="text-white break-words mb-2">
                                    {meal.strMeal && meal.strMeal.length > 20
                                        ? meal.strMeal.slice(0, 20) + '...'
                                        : meal.strMeal || ''}
                                </p>
                                <img
                                    src={meal.strMealThumb || ''}
                                    className="rounded-lg"
                                    height="auto"
                                    width="200"
                                    alt={meal.strMeal || 'Meal image'}
                                />
                            </Link>
                        </div>
                    )))
                ) : (
                    <p className="text-red-600 p-8 italic">Sorry, at the moment you don't have any recipes saved. Go inside an Category and heart a dish to save it on your profile.</p>
                )}
            </div>
        </section>
    );
}

export default profilePage;