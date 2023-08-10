//tasks.js

//v7.1.0
//Some special character that listed 
//in INCORRECT_SET in database.js will
//be replaced to inputable characters automatically.

var sentences = [
    "Where there is a will, there is a way.",
    "I came, I saw, I conquered.",
    "Variety is the spice of life.",
    "You can't judge a tree by its bark.",
    "Sharp tools make good work.",
    "Death comes to all, but great achievements raise a monument which shall endure until the sun grows old.",
    "A fall into the pit, a gain in your wit.",
    "Bad luck often brings good luck.",
    "A young idler, an old beggar.",
    "All for one, one for all.",
    "A friend in need is a friend indeed.",
    "The journey of a thousand miles begins with a single step.",
    "More haste, less speed.",
    "Never too old to learn.",
    "Practice makes perfect.",
    "God helps those who help themselves.",
    "One false step will make a great difference.",
    "Great minds think alike.",
    "Twenty years from now you will be more disappointed by the things that you didnt do than by the ones you did do.",
    "I am who I am today because of the choices I made yesterday.",
    "I may not be perfect but at least I'm not fake.",
    "The remembrance of the past is the teacher of the future.",
    "A straight foot is not afraid of a crooked shoe."
];

var hplovecraft = [
    "The oldest and strongest emotion of mankind is fear, and the oldest and strongest kind of fear is fear of the unknown.",
    "We shall swim out to that brooding reef in the sea and dive down through black abysses to Cyclopean and many-columned Y'ha-nthlei, and in that lair of the Deep Ones we shall dwell amidst wonder and glory forever.",
    "I'a! Shub-Niggurath! The Black Goat of the Woods with a Thousand Young!",
    "Yog-Sothoth knows the gate. Yog-Sothoth is the gate. Yog-Sothoth is the key and guardian of the gate. Past, present, future, all are one in Yog-Sothoth. He knows where the Old Ones broke through of old, and where They shall break through again. He knows where They have trod earth's fields, and where They still tread them, and why no one can behold Them as They tread."
];

var travelchinaguide = [
    "Being capital of the People's Republic of China, Beijing is the nation's political, economic, and cultural center. Located in north China, close to the port city of Tianjin and partially surrounded by Hebei Province, it also serves as the most important transportation hub and port of entry.<br>As one of the six ancient cities in China, Beijing has been the heart and soul of politics throughout its long history and consequently there is an unparalleled wealth of discovery to delight and intrigue travelers as they explore the city's ancient past and exciting modern development. Now it has become one of the most popular travel destinations in the world, with about 140 million Chinese tourists and 4.4 million international visitors in a year.<br>travelchinaguide.com",
    "Cuisine in China is a harmonious integration of color, redolence, taste, shape and the fineness of the instruments.  For the cooking process, chefs pick choice and various ingredients and seasonings while employing unparalleled complicated skills handed down from their fathers, ever aspiring to their ideal of perfection for all the senses. Among the many cooking methods they use are boiling, stewing, braising, frying, steaming, crisping, baking, and simmering and so on. When they finish their masterpieces they are arranged on a variety of plates and dishes so that they are a real pleasure to view, to smell and ultimately to savor.<br>travelchinaguide.com",
    "Chinese people consider the Hot Pot their first choice to hold a dinner party since it can satisfy all the people's taste. As its name indicates, the Hot Pot is cooked in a big wok which is placed on a stove to get continuously heated. Once the concocted soup is boiled, people put slices of meat and various vegetables into the wok and wait for them to be cooked through. The spicy Chongqing Hot Pot and Beijing Copper Pot featuring instant-boiled mutton are the two representatives of the China Hot Pot.<br>travelchinaguide.com",
    "For most Chinese, eating a basket of steaming stuffed buns and a bowl of porridge marks the most satisfying beginning of a day. If you walk along the streets in the morning, it is common to find people queuing in front of bamboo steamers of the breakfast stands or shops for a few buns. Chef often uses minced meat or vegetables to fill dough wrappers and then put these buns in a steamer for heating. The fillings vary from region to region. The most popular ones in northern areas are the mixture of ground pork and green onions, secondly mutton, leeks, sweetened bean paste, mushrooms, and cabbage, while people in southern cities prefer to use crab meat and roe to make the steamed buns. Among them, Tianjin Goubuli Steamed buns and Shanghai Nanxiang buns win great popularity throughout the country.<br>travelchinaguide.com",
    "Kung Pao Chicken<br>Flavor: spicy, salty and sweet<br>Ingredients: chicken breast, chili, peanuts<br>Cooking Methods: marinate, fry, stir-fry<br>1. Cut chicken breast into dices and marinate with salt, cooking wine and starch for 10 minutes.<br>2. Mix salt, white sugar, vinegar, cooking wine, soy sauce and a little starch in a small bowl, to make the seasoning sauce.<br>3. Fry peanuts to be well done, and place them aside.<br>4. Stir-fry dried chili with low heat, and add shallots. After, add marinated chicken diced, stir well and add the seasoning sauce.<br>5. Stir well and add fried shelled peanuts just before taking out.<br>Kung Pao Chicken is one of the most popular Chinese chicken dishes well known home and abroad.<br>travelchinaguide.com",
    "Twice-Cooked Pork<br>Flavor: salty, a little spicy, a little sweet aftertaste<br>Ingredients: streaky pork, thick broad-bean sauce, ginger, garlic bolts...<br>Cooking Methods: boil, stir-fry<br>Twice-Cooked Pork is one of the most famous Chinese meat dishes, which belongs to Sichuan cuisine. Boil the whole streaky pork with sliced ginger and cooking wine for 15 minutes. Skim the scum while boiling. Next, drain the pork out and slice it. Stir-fry the pork slices with thick broad-bean sauce and ginger slices. After, add chopped garlic bolts, sugar and salt successively to stir-fry well. It tastes spicy and aromatic.<br>travelchinaguide.com",
    "Scrambled Egg with Tomato<br>Benefits: antioxidative, protect angiocarpy, anti-cancer...<br>The main ingredients are eggs which contain high protein and tomatoes. This healthy Chinese food is easy to cook. The cooking method is frying, and the fragrance of tomatoes is permeated in to eggs during frying, which release the fishy smell of eggs and add flavor. The tomatoes give the dish a sour taste. <br>Other dishes made of Tomato: Tomato Slices with Sugar, Braised Beef Brisket with Tomato...<br>travelchinaguide.com",
    "Viewing the Chinese history record, you will find the Tang Dynasty was the most glistening historic period in China's history. Founded in 618 and ending in 907, the state, under the ruling of the Tang Emperors, became the most powerful and prosperous country in the world. Particularly, in this glorious period, the economy, politics, culture and military strength reached an unparalleled advanced level.<br>travelchinaguide.com",
    "I Ching, also Yi Jing or The Book of Changes, is thought to be the oldest and most abstruse classic in Chinese history. Reputedly, it originated with Fu Xi, who is a mythical sovereign being the first of the three primogenitors of Chinese civilization. It is also called Zhou Yi reputedly because it is not until the Western Zhou Dynasty that the whole context of I Ching was understood. The first king of Zhou, King Wen, concentrated on the study the mystery of changes when he was put in prison for seven years. It has been an aid to foretell the future and make decisions for thousands of years. However, it means more than a book of divination.<br>travelchinaguide.com",
    "In addition to eating dumplings and glutinous rice balls, Chinese also have a solar term custom of counting nine ('Shu Jiu') starting Winter Solstice, that is, from the Winter Solstice people calculated the number of days until a change of climate came about. Usually nine days is a section, there are a total of nine sections from the first Jiu to the ninth Jiu. In the folklore there is a widely prevailing ballad the general meaning of which is that: in the first and second Jiu (a section of 18 days), we can't take our hands outside; in the third and fourth Jiu we walk on the ice; in the fifth and sixth Jiu we see the light green willow; in the seventh Jiu river thaws and in the eighth swallows come; in the ninth cattle begin to work.<br>travelchinaguide.com",
    "Tea was first discovered and drunk in China. As the hometown of tea, China owns a deep tea culture from ancient times. For Chinese people, it is not only a popular beverage which is brewed with boiled water over cured leaves, with a lot of health benefits. Moreover, it keeps a central piece of Chinese traditional culture, attaching great importance to spiritual enjoyment and ethics. Today, China still accounts for 60% of tea plantations in the world and a great number of tea gardens scatter in more than 20 provinces throughout the country.<br>travelchinaguide.com"
];