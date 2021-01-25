import {API_URL} from '../config'
export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const data = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const result = await data.json();
            this.title = result.recipe.title;
            this.author = result.recipe.publisher;
            this.img = result.recipe.image_url;
            this.url = result.recipe.source_url;
            this.ingredients = result.recipe.ingredients;
        }
        catch(error){
            alert(error);
        }
    }

    calculateTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;
    }

    calculateServings(){
        this.servings = 4; 
    }

    parseIngredients(){
        const unitsLong = ['tablespoons' , 'tablespoon' , 'ounces' , 'ounce' , 'teaspoons' , 'teaspoon' , 'cups' , 'pounds' ];
        const unitShort = ['tbsp' , 'tbsp' ,'oz' , 'oz','tsp','tsp','cup','pound' , 'kg' , 'g' ]
        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit , index) => {
                ingredient.replace(unit , unitShort[index]);
            })
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(element => unitShort.includes(element));
            let objIng;
            if(unitIndex > -1){
                //There is unit
                let count;
                const arrCount = arrIng.slice(0,unitIndex);
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-' , '+'));
                }
                else{
                    count = eval(arrCount.join('+'));
                }
                objIng = {
                    count ,
                    unit: arrIng[unitIndex] ,
                    ingredient : arrIng.slice(unitIndex+1).join(' ')
                }
            }            
            else if(parseInt(arrIng[0] , 10)){
                // no unit but first element is a number
                let count = parseInt(arrIng[0] , 10);
                let ingredient = arrIng.slice(1).join(' ');
                try {
                    count = eval(`${count} + ${arrIng[1]}`);
                    ingredient = arrIng.slice(2).join(' ');
                }
                catch(error){}
                objIng = {
                    count ,
                    unit : '' ,
                    ingredient
                };
            }
            else if(unitIndex === -1){
                objIng = {
                    count : 1 ,
                    unit : '' ,
                    ingredient
                };
            }
            return objIng;
        })
        this.ingredients = newIngredients;
    }
     
} 