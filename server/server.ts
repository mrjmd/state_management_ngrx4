
import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();

const port = 4444;

const router = express.Router();

const _recipes = [
  {
    "data": {
      "type": "recipes",
      "id": "c256f1bc-c6ee-4165-8fbf-a1d453318436",
      "attributes": {
        "internalId": 1,
        "isPublished": true,
        "title": "4 hour lamb stew",
        "createdAt": "2017-07-04T19:59:06+0200",
        "updatedAt": "2017-07-04T19:59:06+0200",
        "isPromoted": true,
        "path": null,
        "difficulty": "easy",
        "ingredients": [
          "1 leg of lamb - does not need to be massive",
          " with the potatoes and vegetables",
          " this recipe goes a long",
          " long way.",
          "Olive oil for frying",
          "6 rashers of home smoked bacon",
          " chunky streaky bacon or a small packet of lardons",
          "4 cloves of Garlic",
          " peeled and crushed",
          "3 onions",
          " peeled and cut into 4",
          "4 large potatoes",
          " peeled and cut into chunks",
          "5 carrots",
          " peeled and cut in half",
          " lengthwise",
          "2 parsnips",
          " peeled and cut in half",
          " lengthways",
          "3 celery stick",
          " cut into thick 'moons'",
          "A few handfuls of fresh herbs",
          " whatever you have available; parsley",
          " rosemary",
          " thyme",
          " oregano",
          "2 bay leaves",
          "1 bottle of dry white wine",
          "Above bottle",
          " re-filled with water - use your judgement",
          " depending upon the size of the joint. Sometimes half a bottle of water is enough.",
          "sea salt and freshly ground black pepper"
        ],
        "numberOfServices": null,
        "preparationTime": 15,
        "instructions": "Preheat the oven to 160\u00b0 C (325\u00b0 F - gas 3 - Moderately slow\/Warm),If you are using a glass casserole dish, do the frying in a separate pan, otherwise..,Add a few splashes of olive oil to a huge ovenproof pot or deep Roasting dish and brown the lamb all over,Remove the lamb for the next stage,Fry the onions, garlic and bacon and celery for 4 minutes,Add a splash of white wine and deglaze the pan,Add your lamb back (or move everything to your casserole dish),Add the remaining wine and an equal amount of water and all of the remaining ingredients,Cover, with tin-foil if you are using a roasting tray,Roast for 4 to 5 hours - I find 4 hours sufficient although we don't use a particularly large cut of meat,Season the gravy to taste with salt and black pepper",
        "totalTime": 15
      }
    }
  },
  {
    "data": {
      "type": "recipes",
      "id": "bab76b1f-315b-459d-b4ba-f4f98bfe74e0",
      "attributes": {
        "internalId": 2,
        "isPublished": true,
        "title": "Agnello in agrodolce (sweet and sour lamb)",
        "createdAt": "2017-07-04T19:59:06+0200",
        "updatedAt": "2017-07-04T19:59:06+0200",
        "isPromoted": true,
        "path": null,
        "difficulty": "middle",
        "ingredients": [
          "1 large onion",
          " peeled and thinly sliced",
          "5 tablespoons of olive oil",
          "5 tablespoons full cream milk",
          "3 tablespoons tomato pur\u00e9e",
          "1 kg (2 lb) lamb shoulder",
          " cut into bite-sized cubes",
          "125 ml high quality white wine vinegar",
          "sea salt and freshly ground black pepper",
          "3 tablespoon granulated sugar",
          "6 fresh basil leaves",
          " roughly chopped"
        ],
        "numberOfServices": null,
        "preparationTime": 10,
        "instructions": "Fry the onions in half of the olive oil until golden brown and reserve.,Meanwhile, mix the milk and tomato paste together.,Brown the lamb in the remaining oil.,Season the meat with a little salt, add the onions back to the pan and pour in the tomato mixture.  I added just a few tablespoons of water at this stage as it looked as though it would not survive an hour of simmering.,Simmer gently for about an hour.,After an hour, add the vinegar, sugar and a good grind of black pepper then cook for the final 15 minutes.,Chop the basil and add just before serving.",
        "totalTime": 30
      }
    }
  },
  {
    "data": {
      "type": "recipes",
      "id": "33a558c6-0921-41bf-84b7-c2e5c766089b",
      "attributes": {
        "internalId": 3,
        "isPublished": true,
        "title": "Air fried roast potatoes",
        "createdAt": "2017-07-04T19:59:06+0200",
        "updatedAt": "2017-07-04T19:59:06+0200",
        "isPromoted": true,
        "path": null,
        "difficulty": "easy",
        "ingredients": [
          "350g [12 oz] maris piper potatoes",
          " peeled and cut into equal sized pieces",
          "1 generous tablespoon of olive oil",
          "1 whole small peeled brown onion",
          " optional",
          "A handful of fresh bay leaves"
        ],
        "numberOfServices": null,
        "preparationTime": 5,
        "instructions": "Pop everything into the air frier and cook for 45 minutes to 1 hour",
        "totalTime": 5
      }
    }
  },
  {
    "data": {
      "type": "recipes",
      "id": "0604119f-053d-4a25-9597-9e26d574633e",
      "attributes": {
        "internalId": 4,
        "isPublished": true,
        "title": "Ajo Blanco Malague\u00f1o",
        "createdAt": "2017-07-04T19:59:06+0200",
        "updatedAt": "2017-07-04T19:59:06+0200",
        "isPromoted": true,
        "path": null,
        "difficulty": "middle",
        "ingredients": [
          "50 g almonds",
          " blanched",
          "50 g stale bread",
          "4-8 cloves of garlic",
          " peeled",
          "2 tablespoons extra virgin olive oil",
          "2 tablespoons white wine or sherry vinegar",
          "500 ml chilled chicken or vegetable stock",
          " or water",
          "Salt to taste",
          "4 handfuls of small",
          " seedless green grapes",
          " separated from their stalks"
        ],
        "numberOfServices": null,
        "preparationTime": 15,
        "instructions": "Blend together thoroughly the almonds, bread and garlic or use a pestle and mortar.   The resulting consistency should be that of a thick paste.,Mix in the oil and vinegar and then the stock or water.,Chill and add salt as desired.,Serve in individual bowls and add a handful of grapes to each bowl.",
        "totalTime": 15
      }
    }
  }
];


router.get("/recipes", (req, res) => {
  const filters = req.query;
  console.log("GET /recipes", "filters:", filters);
  const filteredRecipes = _recipes.filter(t => {
    const titlePass = filters.title ? t.data.attributes.title.indexOf(filters.title) > -1 : true;
    const diffPass = filters.difficulty ? t.data.attributes.difficulty === filters.difficulty : true;
    return titlePass && diffPass;
  });

  const recipes = filteredRecipes.reduce((acc, t) => (acc[t.data.id] = t, acc), {});
  const list = filteredRecipes.map(t => t.data.id);

  res.json({recipes, list});
});

router.get("/recipe", (req, res) => {
  const id = req.query.id;
  console.log("GET /recipe", "id:", id);
  const recipe = _recipes.filter(t => t.data.id == id)[0];
  res.json({recipe});
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.listen(port);

console.log(`Server port: ${port}`);