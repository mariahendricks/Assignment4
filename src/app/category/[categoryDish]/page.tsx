'use client'

import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import Link from "next/link";

const categoryDishPage = ({params}: {params: {categoryDish: string}}) => {
    const {categoryDish} = params;
    const [recipes, setRecipes] = useState<RecipeType[] | null>(null);
    const {user, setUser} = useUserContext() as UserContextType;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryDish}`);
                const data = await response.json();
                setRecipes(data.meals)
            } catch (error) {
                console.error("Error fetching categories", error);
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
        <section className="flex flex-col flex-1 text-center bg-gray-200 py-8">
            <h1 className="text-3xl font-bold">{categoryDish} dishes</h1>
            <h3 className="text-xl font-bold p-4 text-cyan-700">Save your favourite dish with a heart</h3>
            <div className="flex flex-wrap gap-6 p-8 justify-center">
                {recipes && recipes.map((meal: RecipeType) => (
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
                ))}
            </div>
        </section>
    );
}

export default categoryDishPage;