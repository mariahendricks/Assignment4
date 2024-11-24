'use client'

import { useUserContext } from "@/utils/contexts";
import { CategoryType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Link from "next/link";

const categoryPage = () => {
    const [categories, setCategories] = useState<CategoryType[] | null>(null);
    const {user, setUser} = useUserContext() as UserContextType;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
                const data = await response.json();
                setCategories(data.categories)
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        }
        fetchCategories();
    }, []);
    
    const handleClick = ((strCategory: string) => {
        if (user) {
            setUser({...user, category: strCategory})
        }
    })

    return (
        <section className="flex flex-col flex-1 text-center bg-gray-200 py-8">
            <h1 className="text-3xl font-bold">Categories</h1>
            <h3 className="text-xl font-bold p-4 text-cyan-700">Your favorite food category is {user?.category}</h3>
            <div className="flex flex-wrap gap-6 p-8 justify-center">
            {categories && categories.map((category: CategoryType) => (
            <div
                className="flex flex-col items-center w-[250px] bg-gray-900 p-4 border border-gray-300 rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:translate-y-[-4px] transition-all duration-300 ease-in-out transform text-white relative"
                key={category.idCategory}
            >
                <button onClick={() => handleClick(category.strCategory)}>
                            {user && user.category.includes(category.strCategory) ? (
                                <FaStar className="text-yellow-500 text-2xl" />
                            ) : (
                                <FaRegStar className="text-gray-400 text-2xl" />
                            )}
                        </button>
                <div className="flex justify-center">
                    <h3 className="text-white mb-4 text-2xl font-bold">{category.strCategory}</h3>
                </div>
                <Link href={`/category/${category.strCategory}`}>
                    <img
                        className="rounded-lg"
                        src={category.strCategoryThumb}
                        alt={category.strCategory}
                        height="auto"
                        width="100%"
                    />
                </Link>
                </div>
                ))}
            </div>
        </section>
    );
}

export default categoryPage;