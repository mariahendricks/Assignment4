export type UserType = {
    name: string,
    category: string,
    savedRecipes: string[]
}

export type UserContextType = {
    user: UserType | null,
    setUser: (user:UserType) => void
    logout: () => void;
    login: (userInput: string | null) => void;
    error: string | null;
}

export type RecipeType = {
    strMeal: string,
    idMeal: string,
    strMealThumb: string,
    strArea?: string,
    strInstructions?: string,
    strCategory: string
}

export type CategoryType = {
    idCategory: string,
    strCategory: string,
    strCategoryThumb: string,
    strCategoryDescription: string
}