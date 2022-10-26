require('dotenv').config({path: '../../.env'});

const mongoose = require('mongoose');
const {mongoURI: db} = require('../../config/keys.js');
const Ingredient = require('../Ingredient');
const Recipe = require('../Recipe');
const recipeArr = require('./recipeArr');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then (() => {
      console.log("Connected to mongoDB successfully")
      })
  .catch (err => {
      console.log(err)
  }) 

const nestedRecipes = recipeArr;

// EACH ENTRY IS A KEY VALUE PAIR
// { "recipe": recipeObj }
// must key into "recipe" to get the recipeObj

const seedRecipes = [];
let seedIngredientsHash = {};

const capitalizeName = (string) => {
  const foodNameArr = string.split(" ");
  for (let i = 0; i < foodNameArr.length; i++) {
    foodNameArr[i] = foodNameArr[i][0].toUpperCase() + foodNameArr[i].substr(1);
  }    
  return foodNameArr.join(" ");
}

nestedRecipes.forEach(nestedRecipe => {
  const recipeObject = nestedRecipe.recipe;

  recipeObject.ingredients.forEach(ingredient => {
    
    const newFoodName = capitalizeName(ingredient.food);
    const newIngredient = {
      food: newFoodName,
      foodCategory: ingredient.foodCategory,
      image: ingredient.image,
      foodId: ingredient.foodId
    };
    if (newIngredient.image === null) {
      switch (newIngredient.food) {
        case "Rendered Chicken Fat": 
          newIngredient.image = "https://images.heb.com/is/image/HEBGrocery/000168024";
          break;
        case "Crushed Tomatoes":
          newIngredient.image = "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRhL5bzu6VoYW5bV8G2M8UXjP595VkuxaCJgJDpTo6TDbanJS74beZFVTQQ7x3L-ZaOFYuDeczVSHPEfl5CgmQEDc1SDDpA&usqp=CAE";
          break;
        case "Polenta":
          newIngredient.image = "https://cdn.loveandlemons.com/wp-content/uploads/2020/02/polenta.jpg";
          break;
        case "Pam":
          newIngredient.image = "https://m.media-amazon.com/images/I/51ihv1zrAmS.jpg";
          break;
        case "Tomato Sauce":
          newIngredient.image = "https://www.seriouseats.com/thmb/rlK8y8KJegOzRYYDpwlr-yDydc8=/1500x1125/filters:fill(auto,1)/the-best-slow-cooked-italian-american-tomato-sauce-red-sauce-recipe-step-09-05ad7578f9d34a5092086ae959bea8a7.jpg";
          break;
        case "Ground Flax":
          newIngredient.image = "https://m.media-amazon.com/images/I/61IIIPUDd1L.jpg";
          break;
        case "Oats":
          newIngredient.image = "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/03/oats-701299_1920.jpg";
          break;
        case "Nutritional Yeast":
          newIngredient.image = "https://cdn.loveandlemons.com/wp-content/uploads/2021/04/what-is-nutritional-yeast.jpg";
          break;
        case "Dried Mustard":
          newIngredient.image = "https://www.myspicer.com/wp-content/uploads/2014/12/uses-for-dry-mustard.png";
          break;
        case "Winter Squash":
          newIngredient.image = "https://assets.epicurious.com/photos/5893bf1aeb3e360a3e384090/master/w_2000,h_1333,c_limit/butternut-squash-020217.jpg";
          break;
        case "Asafetida":
          newIngredient.image = "https://m.media-amazon.com/images/I/71IvC4hwz7L.jpg";
          break;
        case "Chat Masala":
          newIngredient.image = "https://m.media-amazon.com/images/I/716mHetqbGL.jpg";
          break;
        case "Seitan":
          newIngredient.image = "https://www.connoisseurusveg.com/wp-content/uploads/2015/07/how-to-make-seitan-9-of-10.jpg";
          break;
        case "Turkey Necks":
          newIngredient.image = "https://petparlour.ie/wp-content/uploads/2020/10/Raw-Turkey-Necks-Frozen.jpeg";
          break;
        case "Turkey Fat":
          newIngredient.image = "https://thumbs.dreamstime.com/b/fat-black-turkey-red-snood-his-head-158360904.jpg";
          break;
        case "https://thumbs.dreamstime.com/b/fat-black-turkey-red-snood-his-head-158360904.jpg":
          newIngredient.image = "https://m.media-amazon.com/images/I/41PQTi0k7VL.jpg";
          break;
        case "Fruit":
          newIngredient.image = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg";
          break;
        case "Coconut Aminos":
          newIngredient.image = "https://cdn.shopify.com/s/files/1/0242/1866/5056/products/FM199BI341_SVCBOCLA10_IMD.png?v=1639624865";
          break;
        case "Lamb Neck":
          newIngredient.image = "https://www.shepherdsongfarm.com/wp-content/uploads/2020/12/Sliced-Lamb-Neck-3.jpg";
          break;
        case "Lamb Shanks":
          newIngredient.image = "https://www.shepherdsongfarm.com/wp-content/uploads/2012/09/Lamb-Shanks-1.jpg";
          break;
        case "Panko":
          newIngredient.image = "https://m.media-amazon.com/images/I/81fer2Xw7RS.jpg";
          break;
        case "Oxtails":
          newIngredient.image = "https://www.centralmeats.com/pub/media/catalog/product/cache/image/600x430/e9c3970ab036de70892d86c6d221abfe/o/x/oxtails.jpg";
          break;
        case "Vegetable Broth":
          newIngredient.image = "http://contenthandler.azureedge.net/recp/477/2000/0/444.jpg";
          break;
        case "Cookie Crumbs":
          newIngredient.image = "https://associationsnow.com/wp-content/uploads/2018/02/GettyImages-885134872.jpg";
          break;
        case "Jelly":
          newIngredient.image = "https://media.istockphoto.com/photos/jelly-on-a-plate-3d-rendering-isolated-on-white-background-picture-id1056477498?k=20&m=1056477498&s=170667a&w=0&h=BZnb28BulzFtgW4qXGqGtIuFew9GMGnoNcfw7e8m_JY=";
          break;
        case "Can Of Chickpeas":
          newIngredient.image = "https://target.scene7.com/is/image/Target/GUEST_aab59635-53ff-4f74-a8b0-603021196498?wid=488&hei=488&fmt=pjpeg";
          break;
        default:
          newIngredient.image = "https://media-exp1.licdn.com/dms/image/D4E03AQE6zongzg-HUQ/profile-displayphoto-shrink_400_400/0/1666311882598?e=1672272000&v=beta&t=mgQlRPS2tNY5M8r3Lk1A1tJfDKAtGsfo-hbl0AWH7jY";
      }
    }
    seedIngredientsHash[newIngredient.foodId] = newIngredient;

    ingredient.food = newFoodName;
  })
  seedRecipes.push(recipeObject);
})
seedIngredients = Object.values(seedIngredientsHash);


const seedDB = async () => {
  await Ingredient.deleteMany({});
  await Ingredient.insertMany(seedIngredients);
  await Recipe.deleteMany({});
  await Recipe.insertMany(seedRecipes);
};

seedDB().then(() => {
  console.log('All ingredients reseeded');
  console.log('All recipes reseeded');
  mongoose.connection.close();
});
