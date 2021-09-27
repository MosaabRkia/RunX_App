import React,{useState,useEffect} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import {  StyleSheet, Text, View ,Image ,TouchableOpacity , ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import TittleBarAndArrow from '../components/TittleBarAndArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarOfFoodChoose from '../components/BarOfFoodChoose';


/*
            //  plan:null,
            // firstName:null,
            // email:null,
            // password:null,
            // birdthday:Date(null),
            // weight:Number(null),
            // height:Number(null),
            // goalWeight:Number(null),
            // fruits:[x,y,z],
            // vegetables:[x,y,z],
            // meat:[x,y,z],
            snacks:[x,y,z],
            // drinks:[x,y,z],
            // bakery:[x,y,z],
            // dairy:[x,y,z]
            // fish:[x,y,z],
            seeds:[x,y,z]
            way to calc calories , proteins, water 
*/

export default function RegisterForm3({navigation}) {
    //test arr
    const data = 
    [
    {name:'lamb leg', kind:'meat', kcal:203, gram:100, protein: 27.61, fats: 9.7, description: "Lamb Leg source of many vitamins and minerals, including iron, zinc, and vitamin B12"},
    {name:'lamb loin', kind:'meat', kcal:313, gram:100, protein: 24.53, fats: 23.09, description: "Low in calories and encourages the burning of fat" },
    {name:'lamb flank', kind:'meat', kcal:364, gram:100, protein: 14.5, fats: 34.5, description: "Lamb Flanks can help reduce levels of bad cholesterol in your blood " },
    {name:'lamb shoulder', kind:'meat', kcal:275, gram:100, protein: 22.42, fats: 19.89, description: "Lamb Shoulder source of many vitamins and minerals, including iron, zinc, and vitamin B12" },
    {name:'lamb head', kind:'meat', kcal:282, gram:100, protein: 19.4, fats: 23, description: "Lamb Head source of many vitamins and minerals, including iron, zinc, and vitamin B12"},
    {name:'lamb rib', kind:'meat', kcal:359, gram:100, protein: 22.04, fats: 29.47, description: "Lamb Rib is an outstanding source of many vitamins and minerals, including iron, zinc, and vitamin B12" },
    {name:'lamb neck', kind:'meat', kcal:235, gram:100, protein: 18.4, fats: 17.6, description: "Lamb Neck can help reduce levels of bad cholesterol in your blood " },
    {name:'lamb breast', kind:'meat', kcal:230, gram:100, protein: 24, fats: 15, description: "Regular consumption of Lamb Breast may promote muscle growth, maintenance, and performance. In addition, it helps prevent anemia." },
    {name:'lamb shank', kind:'meat', kcal:207, gram:100, protein: 24, fats: 11, description: "Lamb Shank is a good source of iron, magnesium, selenium, and omega-3 fatty acids" },
    {name:'turkey breast', kind:'meat', kcal:135, gram:100, protein: 30.06, fats: 0.74, description: "The tryptophan content in turkey may help to support healthy levels of serotonin in the body"},
    {name:'turkey drumstick', kind:'meat', kcal:206, gram:100, protein: 27.64, fats: 9.7, description: "Turkey meat is a particularly rich source of B vitamins, including B3, B6"},
    {name:'turkey thigh', kind:'meat', kcal:206, gram:100, protein: 27.64, fats: 9.7, description: "Turkey Thigh is a particularly rich source of B vitamins, B12"},
    {name:'turkey wing', kind:'meat', kcal:148, gram:100, protein: 29.09, fats: 3.22, description: "Turkey Wing is a very rich source of protein, niacin, vitamin B6 and the amino acid tryptothan" },
    {name:'turkey drummette', kind:'meat', kcal:380, gram:100, protein: 36, fats: 25, description: "Turkey Drummette is a very rich source of protein, niacin, vitamin B6 and the amino acid tryptothan"},
    {name:'turkey giblets', kind:'meat', kcal:105, gram:100, protein: 15, fats: 4, description: "Turkey Giblets contains several vitamins including Vitamin B12, which is essential for brain function and forming white blood cells"},
    {name:'turkey Tenderloin', kind:'meat', kcal:120, gram:100, protein: 28, fats: 0, description: "Turkey Tenderloin is a particularly rich source of B vitamins" },
    
    {name:'brisket flat cut', kind:'meat', kcal:342 , gram:100 , protein: 24.84 ,fats: 26.15  ,description: "a lean cut of meat, making it a healthier red meat option"},
    
    {name:'boneless short ribs', kind:'meat', kcal:471 , gram:100 , protein: 22 ,fats: 42  ,description: "good source of protein and a number of essential vitamins and minerals"},
    
    {name:'shoulder petite tender medallions', kind:'meat', kcal:122 , gram:100 , protein: 17.47 ,fats: 5.29  ,description: "best cooked quickly over high heat"},
    
    {name:'shoulder petite tender', kind:'meat', kcal:176 , gram:100 , protein: 26 ,fats: 7  ,description: " the most tender beef muscles and is said to be white-tablecloth quality "},
    
    {name:'boneless shoulder pot roast', kind:'meat', kcal:220 , gram:100 , protein: 33.3 ,fats: 8.3  ,description: "Pot roast doesn't typically get a nutritional nod"},
    
    {name:'boneless shoulder steak', kind:'meat', kcal:125 , gram:100 , protein: 21.4 ,fats: 4.5  ,description: "Always go for cuts of beef that are over 93 percent lean"},
    
    {name:'shoulder center ranch steak', kind:'meat', kcal:180 , gram:100 , protein: 25 ,fats: 8.1  ,description: "Good for grilling or broiling"},
    
    {name:'boneless chuck eye steak', kind:'meat', kcal:276 , gram:100 , protein: 25 ,fats: 20 ,description: "good source of Vitamin B12"},
    
    {name:'shoulder top blade steak', kind:'meat', kcal:176 , gram:100 , protein: 18.99 ,fats: 10.52  ,description: "good source of vitamin B6"},
    
    {name:'shoulder top blade steak flat iron', kind:'meat', kcal:139 , gram:100 , protein: 20.4 ,fats: 6.4  ,description: "a good alternative to more expensive steaks"},
    
    {name:'boneless chuck steak', kind:'meat', kcal:191 , gram:100 , protein: 32 ,fats: 6.8  ,description: "help with nervous system function and red blood cell production"},
    
    {name:'boneless chuck pot roast', kind:'meat', kcal:276.5 , gram:100 , protein: 25 ,fats: 20  ,description: "High in Protein"},
    
    {name:'flank steak', kind:'meat', kcal:192 , gram:100 , protein: 28 ,fats: 8  ,description: "fewer calories and more protein"},
    
    {name:'shank cross-cut', kind:'meat', kcal:201 , gram:100 , protein: 34.1 ,fats: 6.4  ,description: "fewer calories and more protein"},
    
    {name:'boneless ribeye steak', kind:'meat', kcal:354 , gram:100 , protein: 23 ,fats: 29  ,description: "Ribeye is loaded with muscle-building protein"},
    
    {name:'back ribs', kind:'meat', kcal:386 , gram:100 , protein: 14 ,fats: 34  ,description: "lots of fats !"},
    
    {name:'boneless ribeye roast', kind:'meat', kcal:266 , gram:100 , protein: 25.91 ,fats: 17.32 ,description: "blood-aiding iron, energy-maintaining vitamin B12"},
    
    {name:'rib steak', kind:'meat', kcal:271 , gram:100 , protein: 25 ,fats: 19  ,description: "good handful of other vitamins and minerals"},
    
    {name:'rib roast', kind:'meat', kcal:283.5 , gram:100 , protein: 21 ,fats: 35  ,description: "ribeye steaks are durable steaks"},
    
    {name:'round steak', kind:'meat', kcal:181.6 , gram:100 , protein: 28 ,fats: 7 ,description: "Beef Provides a Large Source of L-Carnitine"},
    
    {name:'round roast', kind:'meat', kcal:166 , gram:100 , protein: 21.49 ,fats: 8.24  ,description: "good source of vitamin B12 and B6"},
    
    {name:'round tip roast', kind:'meat', kcal:119 , gram:100 , protein: 21.11 ,fats: 3.2  ,description: "It's one of the best cuts for roast beef"},
    
    {name:'bottom round roast', kind:'meat', kcal:181 , gram:100 , protein: 28 ,fats: 7  ,description: "you're looking for a rich protein source? here"},
    
    {name:' steak western griller', kind:'meat', kcal:252 , gram:100 , protein: 27.29 ,fats: 15.01  ,description: "Grilled meat is lower in fat and calories compared with others"},
    
    {name:'tip steak', kind:'meat', kcal:164 , gram:100 , protein: 20.64 ,fats: 8.55  ,description: "Beef is Extremely Rich in Minerals"},
    
    {name:'sirloin tip center roast', kind:'meat', kcal:210.6 , gram:100 , protein: 25.9 ,fats: 11.1  ,description: " it has tough muscle fibers inside"},
    
    {name:'sirloin tip center steak', kind:'meat', kcal:201 , gram:100 , protein: 20.3 ,fats: 12.71  ,description: "Beef has a lot of collagen in it"},
    
    {name:'sirloin tip side steak', kind:'meat', kcal:183 , gram:100 , protein: 30 ,fats: 5  ,description: "that same cut of meat can be distressingly tough, chewy or dry"},
    
    {name:'skirt steak', kind:'meat', kcal:220 , gram:100 , protein: 26 ,fats: 12  ,description: "Skirt Steak is an excellent source of Protein, Riboflavin, Niacin, Vitamin B6, Vitamin B12, Zinc, and Selenium"},
    
    {name:'top loin steak boneless', kind:'meat', kcal:201 , gram:100 , protein: 20.3 ,fats: 12.71 ,description: "Top Loin Steak Boneless cut is jam-packed with around 50 grams of protein, which is slightly more than most other lean cuts of steak."},
    
    {name:'tenderloin roast', kind:'meat', kcal:324 , gram:100 , protein: 24 ,fats: 25  ,description: "tenderloin roast contains L-carnitine which is an amino acid that occurs naturally in meat products"},
    
    {name:'T-bone steak', kind:'meat', kcal:246.9 , gram:100 , protein: 24 ,fats: 16  ,description: "T-bone Steak is one of the best protein rich foods. Steak is one of the best protein sources, and protein is important for pretty much every cell in your body"},
    
    {name:'boneless top sirloin steak', kind:'meat', kcal:250.5 , gram:100 , protein: 26 ,fats: 15  ,description: "Boneless Top Sirloin steak tends to be one of the leanest cuts of beef making it a great option in a health-conscious die"},
    
    {name:'chicken breast', kind:'meat', kcal:165,gram:100,protein: 31 ,fats: 3.6   ,description: "an excellent source of lean protein"},
    
    {name:'chicken wings', kind:'meat', kcal:203,gram:100,protein: 30.5,fats: 8.1 ,description: "help with weight management and reduce the risk of heart disease"  },
    
    {name:'chicken drumsticks / legs', kind:'meat', kcal:172,gram:100,protein: 28.3 ,fats: 5.7 ,description: " they're high in collagen"},
    
    {name:'chicken thighs', kind:'meat', kcal:209,gram:100,protein: 24 ,fat: 8   ,description: "contain riboflavin, vitamins B6 and B12, iron, and zinc of vitamins"},
    
    {name:'whole chicken', kind:'meat', kcal:165,gram:100,protein: 31 ,fats: 3.6  ,description: " a good source of protein"},
    
    {name:'orange', kind:'fruits', kcal:48.1, gram:100, protein: 0.9, fats: 0.9, description: "Protects your cells from damage"},
    {name:'grapefruit', kind:'fruits', kcal:42.1,gram:100, protein: 0.8,fats: 0.1, description: " they're a good source of vitamin A " },
    {name:'mandarin', kind:'fruits', kcal:53.3,gram:100, protein: 0.8, fats: 0, description: "The body turns beta-carotene and beta-cryptoxanthin into vitamin A " },
    {name:'lemon', kind:'fruits', kcal:27.9, gram:100, protein: 1.1, fats: 0.3, description: "Lemons contain a high amount of vitamin C" },
    {name:'lime', kind:'fruits', kcal:30.1, gram:100, protein: 0.8, fats: 0.2, description: "Limes are a good source of magnesium and potassium"},
    {name:'nectarine', kind:'fruits', kcal:44.2, gram:100, protein: 1.1, fats: 0.3, description: "Nectarine support iron absorption, boost weight loss, and enhance skin health"},
    {name:'apricot', kind:'fruits', kcal:48,gram:100, protein: 1.4, fats: 0.4, description: "Apricot rich in vitamin A, beta-carotene , excellent for promoting eye health"},
    {name:'peach', kind:'fruits', kcal:39, gram:100, protein: 0.91, fats: 0, description: "Peach is a great source of fiber, potassium and vitamins A and C" },
    {name:'plum', kind:'fruits', kcal:45.9,gram:100,protein: 0.7,fats: 0.3  ,description: "Plums contain antioxidant in huge amounts that may help prevent age-related macular degeneration"},
    {name:'banana', kind:'fruits', kcal:88.7,gram:100,protein: 1.1 ,fats: 0.3  ,description: "rich in potassium, fiber and natural sugars"},
    {name:'mango', kind:'fruits', kcal:59.8,gram:100,protein: 0.8 ,fats: 0.4  ,description: "good source of fiber and antioxidants, including vitamin C"},
    {name:'strawberry', kind:'fruits', kcal:32.5,gram:100,protein: 0.7,fats: 0.3  ,description: "high levels of antioxidants known as polyphenols" },
    {name:'raspberry', kind:'fruits', kcal:52.6,gram:100,protein: 1.2,fats: 0.7   ,description: "essential to heart function, and proven to lower blood pressure"},
    {name:'kiwi', kind:'fruits', kcal:60.9,gram:100,protein: 1.1,fats: 0.5   ,description: "high in Vitamin C and dietary fiber"},
    {name:'passionfruit', kind:'fruits', kcal:97,gram:100,protein: 2.2,fats: 0.7 ,description: "protects your cells from damage"  },
    {name:'watermelon', kind:'fruits', kcal:30.4,gram:100,protein: 0.6 ,fats: 0.2  ,description: "Your heart enjoys the perks of all the lycopene watermelon contains"},
    {name:'rockmelon', kind:'fruits', kcal:33.7,gram:100,protein: 0.8,fat: 0.2   ,description: "Rockmelon is a powerful antioxidant that protects your cells from damage, Full of vitamin A"},
    {name:'honeydew melon', kind:'fruits', kcal:35.9,gram:100,protein: 0.5 ,fat: 0.1 ,description: "Honeydew Melon is low in fat and contains several key vitamins and minerals" },
    {name:'Tomato', kind:'fruits', kcal:18,gram:100,protein: 0.9 ,fats: 0.04  ,description: "Tomatoes have potassium, vitamins B and E"},
    {name:'avocado', kind:'fruits', kcal:160.1,gram:100,protein: 2 ,fats: 15  ,description: "Avocado are an excellent source of potassium, folate and fibre"},
    {name:'apple', kind:'fruits', kcal:52.1,gram:100,protein: 0.3,fats: 0.2   ,description: "Apples Can Support a Healthy Immune System"},
    {name:'pear', kind:'fruits', kcal:57.1,gram:100,protein: 0.39 ,fats: 0.1  ,description: "Pears are rich in essential antioxidants, plant compounds, and dietary fiber"},
    {name:'Pomegranates', kind:'fruits', kcal:83,gram:100,protein: 1.7 ,fats: 0.1  ,description: "Pomegranates good in improving gut health, digestion, and keep bowel diseases at bay"},
    {name:'lettuce',kind:'vegatables',kcal:14,gram:100,protein: 0.9,fats: 1.3 ,description:"source of vitamin K, which helps strengthen bones"},
    {name:'spinach',kind:'vegatables',kcal:23,gram:100,protein: 2.9,fats: 0.4  ,description:"High amounts of oxalic acid in spinach"},
    {name:'Swiss chard',kind:'vegatables',kcal:14,gram:100,protein: 0.9,fats: 0.1 ,description:"excellent source of vitamins K, A, and C"},
    {name:'cabbage',kind:'vegatables',kcal:23,gram:100,protein: 1.3,fats: 0.1  ,description:"heart-protective antioxidants"},
    {name:'cauliflower',kind:'vegatables',kcal:25,gram:100,protein: 2 ,fats: 0  ,description:"Rich in sulforaphane"},
    {name:'Brussels sprouts',kind:'vegatables',kcal:36,gram:100,protein:2.6 ,fats: 0.1  ,description:"rotect against cancers of the stomach"},
    {name:'broccoli',kind:'vegatables',kcal:35,gram:100,protein: 2.4,fats: 0.4 ,description:"Packed With Vitamins, Minerals and Bioactive Compounds" },
    {name:'pumpkin',kind:'vegatables',kcal:20,gram:100,protein: 0.7,fats: 0.1  ,description:"pumpkins offer vitamin C, vitamin E, iron, and folate"},
    {name:'cucumber',kind:'vegatables',kcal:15,gram:100,protein: 0.7,fats: 0.1 ,description:"high in many important vitamins and minerals" },
    {name:'zucchini',kind:'vegatables',kcal:15,gram:100,protein: 1.1,fats: 0.4,description:"rich in multiple antioxidants" },
    {name:'potato',kind:'vegatables',kcal:93,gram:100,protein: 2.5,fats: 0.1 ,description:"a good source of fiber" },
    {name:'sweet potato',kind:'vegatables',kcal:90,gram:100,protein: 2,fats: 0.1  ,description:"good source of most of our B vitamins and vitamin C"},
    {name:'yam',kind:'vegatables',kcal:118,gram:100,protein: 1.53,fats: 0.17  ,description:"may boost brain health"},
    {name:'celery',kind:'vegatables',kcal:14,gram:100,protein: 0.69,fats: 0.17 ,description:"You'll enjoy vitamins A, K, and C, plus minerals"},
    {name:'asparagus',kind:'vegatables',kcal:20,gram:100,protein: 2.2,fats: 0.12  ,description:" potassium, fiber, thiamin, and vitamins A, B6 and more"},
    {name:'onion',kind:'vegatables',kcal:42,gram:100,protein: 0.92,fats: 0.08  ,description:"contain antioxidants and compounds that fight inflammation"},
    {name:'garlic',kind:'vegatables',kcal:149,gram:100,protein: 6.36,fats: 0.5  ,description:"May Help Lower Blood Pressure"},
    {name:'shallot',kind:'vegatables',kcal:72,gram:100,protein: 2.5,fats: 0.1  ,description:"may improve blood sugar levels , circulation, seasonal allergies, and heart and bone health"},
    {name:'cider', kind:'drinks', kcal:47 , gram:100 , protein: 0.06 ,fats: 0.11  ,description: "lowering your risk of certain types of cancer, diabetes, and heart disease"},
    {name:'sparkling water', kind:'drinks', kcal:0 , gram:100 , protein: 0 ,fats: 0  ,description: "empties the stomach and could possibly make someone feel hungry"},
    {name:'soda drinks', kind:'drinks', kcal:38 , gram:100 , protein: 0.07 ,fats: 0.01  ,description: "Soda is not good for a person's health because it contains lots of sugar"},
    {name:'barley', kind:'drinks', kcal:354 , gram:100 , protein: 12 ,fats: 2.3  ,description: "Rich in Many Beneficial Nutrients"},
    {name:'coffee', kind:'drinks', kcal:0 , gram:100 , protein: 0.1 ,fats: 0  ,description: "Can Improve Energy Levels and Make You Smarter"},
    {name:'hot chocolate', kind:'drinks', kcal:77 , gram:100 , protein: 3.5 ,fats: 2.3 ,description: "lower blood pressure"},
    {name:'lemon tea', kind:'drinks', kcal:2 , gram:100 , protein: 0.03 ,fats: 0  ,description: "Detoxifies The Body"},
    {name:'juice drinks', kind:'drinks', kcal:55 , gram:100 , protein: 0 ,fats: 0.09,description: "They say juicing can reduce your risk of cancer, boost your immune system, remove toxins from your body"},
    {name:'green tea', kind:'drinks', kcal:1 , gram:100 , protein: 0 ,fats: 0  ,description: "Certain compounds in green tea may inhibit the absorption of iron and other minerals, so it's best to drink it between meals"},
    {name:'orange juice', kind:'drinks', kcal:45 , gram:100 , protein: 0.7 ,fats: 0.2  ,description: "Orange juice is a favorite beverage high in antioxidants and micronutrients like vitamin C, folate, and potassium"},
    {name:'apple juice', kind:'drinks', kcal:47 , gram:100 , protein: 0.06 ,fats: 0.11  ,description: "Apple Juice  is a good source of nutrients like vitamin C and potassium"},
    {name:'coconut water', kind:'drinks', kcal:19 , gram:100 , protein: 0.72 ,fats: 0.2  ,description: "Coconut Water May help prevent kidney stones, May help lower blood sugar for people living with diabetes"},
    {name:'Salmon', kind:'sea food', kcal: 208, gram:100 , protein: 20 ,fats: 13  ,description: "a good source of protein"},
    
    {name:'cod', kind:'sea food', kcal:82 , gram:100 , protein: 18 ,fats: 0.7  ,description: "a low-fat source of protein"},
    
    {name:'trout', kind:'sea food', kcal:140 , gram:100 , protein: 20 ,fats: 6  ,description: "niacin, vitamin B12, and omega 3"},
    
    {name:'tuna', kind:'sea food', kcal:129 , gram:100 , protein: 29 ,fats: 0.6  ,description: "high levels of omega-3 fatty acids"},
    
    {name:'sardines', kind:'sea food', kcal:208 , gram:100 , protein: 25 ,fats: 11  ,description: "excellent source of vitamin B-12"},
    
    {name:'flounder and sole', kind:'sea food', kcal:91 , gram:100 , protein: 18.84 ,fats: 1.19  ,description: "plenty of protein"},
    
    {name:'barramundi', kind:'sea food', kcal:108 , gram:100 , protein: 22.8 ,fats: 1.8  ,description: "attributed to many of the heart healthy benefits of this diet"},
    
    {name:'pollock', kind:'sea food', kcal:81 , gram:100 , protein: 17 ,fats: 0  ,description: "good source of lean protein and low in saturated fat"},
    
    {name:'tilapia', kind:'sea food', kcal:128 , gram:100 , protein: 26 ,fats: 2.7  ,description: "helps your body make DNA"},
    
    {name:'haddock', kind:'sea food', kcal:90 , gram:100 , protein: 20 ,fats: 0.6  ,description: "build bone strength and regulate your heart rate"},
    
    {name:'white bread', kind:'bakery', kcal:285 , gram:100 , protein: 7.84 ,fats: 5.73  ,description: "is fortified with calcium and four medium"},
    
    {name:'wheat bread', kind:'bakery', kcal:252 , gram:100 , protein: 12 ,fats: 3.5  ,description: "rich in protein, fiber, B vitamins"},
    
    {name:'whole wheat bread', kind:'bakery', kcal:272 , gram:100 , protein: 8.36 ,fats: 6.17  ,description: "including protein, fiber, B vitamins, antioxidants"},
    
    {name:'multigrain bread', kind:'bakery', kcal:251 , gram:100 , protein: 10 ,fats: 3.8  ,description: "help you to feel satiated"},
    
    {name:'whole grain bread', kind:'bakery', kcal:264.8 , gram:100 , protein: 13 ,fats: 4.2  ,description: "help to lower blood pressure"},
    
    {name:'sprouted grain bread', kind:'bakery', kcal:198 , gram:100 , protein: 7.49 ,fats: 1.27  ,description: "It's lower in carbs, higher in protein and fiber"},
    
    {name:'sourdough bread', kind:'bakery', kcal:289.2 , gram:100 , protein: 12 ,fats: 1.8  ,description: "easy to digest and Natural origins"},
    
    {name:'rye bread', kind:'bakery', kcal:259.1 , gram:100 , protein: 9 ,fats: 3.3  ,description: "especially B vitamins"},
    
    {name:'rumpermickel bread', kind:'bakery', kcal:250 , gram:100 , protein: 9 ,fats: 3.1  ,description: "Helps reduce blood sugar levels"},
    
    {name:'brioche bread', kind:'bakery', kcal:346 , gram:100 , protein: 9.74 ,fats: 13.18 ,description: "high fat and protein contents of these ingredients is what makes the bread so special"},
    
    {name:'challah bread', kind:'bakery', kcal:283 , gram:100 , protein: 9.5 ,fats: 6  ,description: "it has a rich flavor"},
    
    {name:'flatbread bread', kind:'bakery', kcal:311 , gram:100 , protein: 8.49 ,fats: 11.59  ,description: "High Protein & Fiber"},
    
    {name:'flaxseeds', kind:'seeds', kcal:534 , gram:100 , protein: 18.29 ,fats: 42.16,  description: "Flaxseeds is loaded with fiber, protein and potassium"},
    
    {name:'chia seeds', kind:'seeds', kcal:490 , gram:100 , protein: 15.62 ,fats: 30.75  ,description: "Chia seeds are an excellent plant-based source of omega-3 fats"},
    
    {name:'pumpkin seeds', kind:'seeds', kcal:446 , gram:100 , protein: 18 ,fats: 19  ,description: "Pumpkin seeds are a great source for lots of minerals, including zinc"},
    
    {name:'sunflower seeds', kind:'seeds', kcal:570 , gram:100 , protein: 22.78 ,fats: 49.57  ,description: "Sunflower seeds have a good amount of minerals, B vitamins and antioxidants like vitamin E and selenium"},
    
    {name:'hemp seeds', kind:'seeds', kcal:566 , gram:100 , protein: 38.03 ,fats: 45.5  ,description: "Hemp seeds are rich in vitamin E and potassium"},
    
    {name:'sesame seeds', kind:'seeds', kcal:567 , gram:100 , protein: 16.96 ,fats: 48  ,description: "In addition to minerals and fiber, sesame seeds are high in selenium"},
    
    {name:'wild rice', kind:'seeds', kcal:101 , gram:100 , protein: 3.99 ,fats: 0.34  ,description: "Wild rice is a good source of fiber"},
    
    {name:'quinoa', kind:'seeds', kcal:143 , gram:100 , protein: 5.01 ,fats: 2.22  ,description: "Along with amino acids, and vitamin E. Quinoa also contains an antioxidant called quercetin"},
    
    {name:'poppy seeds', kind:'seeds', kcal:533 , gram:100 , protein: 18.04 ,fats: 44.7  ,description: "Just one teaspoon of tiny poppy seeds contains up to four percent of your recommended daily intake of phosphorous, calcium, and iron"}
    ,
    {name:'pine nuts', kind:'seeds', kcal:673 , gram:100 , protein: 13.69 ,fats: 68.37  ,description: "Pine nuts contain all of the amino acids along with: vitamin A, thiamin, riboflavin, niacin, vitamin E, copper"}
    ,
    {name:'peanut', kind:'seeds', kcal:567 , gram:100 , protein:25.8 ,fats:49.24  ,description: "Peanuts help prevent heart disease by lowering cholesterol levels"}
    ,
    {name:'beans', kind:'seeds', kcal:151 , gram:100 , protein: 5.54 ,fats: 5.15  ,description: "Beans help release short-chain fatty acids (SCFA) that strengthen your intestine cells"}
    ,
    {name:'roasted cashew', kind:'seeds', kcal:553 , gram:100 , protein: 18.22 ,fats: 43.85  ,description: "Cashews are rich in fiber, protein, and healthy fats"}
    ,
    {name:'roasted pistachios', kind:'seeds', kcal:570 , gram:100 , protein: 21.05 ,fats:45.82  ,description: "Contains a high levels of unsaturated fatty acids and potassium"}
    ,
    {name:'chickpea seeds', kind:'seeds', kcal:180 , gram:100 , protein: 9.54 ,fats: 2.99  ,description: " Chickpeas are high in dietary fiber, especially a soluble fiber called raffinose"}
    ,
    {name:'lupine', kind:'seeds', kcal:371 , gram:100 , protein: 36.17, fats: 9.74  ,description: " Lupin has been shown to lower blood pressure and insulin sensitivity"}
    ,
    {name:'cowpea', kind:'seeds', kcal:44 , gram:100 , protein: 3.3 ,fats: 0.3  ,description: "Cowpea regulates normal functioning of the cardiac muscles"}
    ,
    {name:'peas', kind:'seeds', kcal:128 , gram:100 , protein: 8.8 ,fats: 0.68  ,description: "Peas are a good source of vitamins C and E, zinc, and other antioxidants"}
    ,
    {name:'yellow lentils', kind:'seeds', kcal:332 , gram:100 , protein: 25.4 ,fats: 2.4  ,description: "Yellow Lentils are rich in fibre, folate and potassium making them a great choice for the heart and for managing blood pressure"}
    ,
    {name:'red lentils', kind:'seeds', kcal:143 , gram:100 , protein: 12.1 ,fats: 1  ,description: "They are high in vitamin B6, pantothenic acid and thiamine"},
    
    {name:'milk', kind:'dairy', kcal:42 , gram:100 , protein: 3.4 ,fats: 1  ,description: "calcium, phosphorus, B vitamins, potassium and vitamin D"},
    
    {name:'butter', kind:'dairy', kcal:716 , gram:100 , protein: 0.09 ,fats: 81  ,description: "bone growth and development"},
    
    {name:'cheese', kind:'dairy', kcal:402 , gram:100 , protein: 25 ,fats: 33  ,description: "great source of calcium, fat, and protein"},
    
    {name:'yogurt', kind:'dairy', kcal:58 , gram:100 , protein: 10 ,fats: 0.4  ,description: "It's High in Protein"},
    
    {name:'cream', kind:'dairy', kcal:195 , gram:100 , protein: 2.7 ,fats: 19  ,description: "including vitamin A, D, E, and K"},
    
    {name:'ice cream', kind:'dairy', kcal:207 , gram:100 , protein: 3.5 ,fats: 11  ,description: "its composition vitamins A, B, C and D"},
    
    {name:'whey', kind:'dairy', kcal:26 , gram:100 , protein: 0.9 ,fats: 0.4  ,description: "gain muscle mass and strength"},
    
    {name:'casein', kind:'dairy', kcal:365 , gram:100 , protein:77  ,fats: 1.9  ,description: "boost muscle growth and aid recovery after exercise"},
    
    {name:'egg', kind:'dairy', kcal:155.1 , gram:100 , protein: 13 ,fats: 11  ,description: "rich in the antioxidants lutein and zeaxanthin"}
    ]

        const kinds = [
            'fruits','vegatables','meat'/*,'snacks'*/,'drinks','bakery','dairy','seeds','sea food'
        ]

        //useState
        const [arr,setArr] = useState([]);
        const [placeKind,setPlaceKind] = useState(0);
        const [dataToShow,setDataToShow] = useState([]);
        const [age , setAge] = useState(0);
        const [weight , setWeight] = useState(0);
        const [height , setHeight] = useState(0);
        const [gender ,setGender] = useState(null);
        //useEffect
        useEffect(()=>{
            getData()
            let newData = data.filter(item=>item.kind === kinds[placeKind])
            setDataToShow(newData)
        },[placeKind])


    //goBack const
    const goBk = () => {
        if(placeKind > 0)
        setPlaceKind(placeKind - 1)
        else{
            navigation.goBack();
        }
    };
        


    // functions
    //get data
    const getData =async()=>{
        const data = await AsyncStorage.getItem('registerData')
        const lastData = JSON.parse(data)
        let currentYear = new Date();
        setAge(currentYear.getFullYear() - lastData.birthdate.substr(0, 4))
        setWeight(lastData.weight)
        setHeight(lastData.height)
        setGender(lastData.gender)

    
    }

        const addList =(e,isSelected)=>{
           // this fix because of the not update fast so it always send the oposite
            isSelected = !isSelected;

            let exists = false;

            arr && arr.forEach((x)=>{
                if(e.name === x.name){
                    exists = true;
                }
            })

            if(isSelected && !exists){
                setArr([...arr,e])
            }
            if(!isSelected && exists){
                let newArr = arr.filter(fruit=> fruit.name !== e.name )
                setArr(newArr)
            }
        }

    //save data
    const OnSelectSaveData =async ()=>{
        try {
                    if(kinds.length -1 === placeKind){
                     await AsyncStorage.mergeItem('registerData',JSON.stringify({
                     food:arr,
                     cupsOfWater:parseInt(weight * 0.2061538461538),
                     DailyProteinG:Number(weight * 2.1),
                     DailyCalories:Number(gender === 'male' ? 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age) : 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age))
                    })).then(async()=>{
                        //go to dashboard page
                        const data = await AsyncStorage.getItem('registerData')
                         console.log(data)
                         console.log('done')
                    })}
                    else{
                        let upOne = placeKind + 1;
                        setPlaceKind(upOne)
                    }
                  
    }
    catch(e) {
        console.log('Error => ',e)
    }
    }


    


    return (
        <LinearGradient style={styles.container} colors={['#92C6BC','#8D9A93', '#536976', '#273035', '#101011']}>
                  <View style={{width:'100%',alignContent:'center',alignItems:'center',marginTop:'10%'}}>
                     <Image
            source={require('../assets/logoNBG.png')}
            style={{width:140,height:60}}
           /> 
                      </View> 
 <Animatable.View style={styles.viewShow} animation={'fadeInUp'} >
        <TittleBarAndArrow
            goBk={goBk}
            iconName="arrow-left"
            iconSize={40}
            text={kinds[placeKind]}
            />

        <Text style={{color:"#CCCCCC",fontSize:20,marginTop:15,textAlign:'left',alignSelf:'center'}}>tell us what you love</Text>


<View >

                 <ScrollView 
                 style={{width:'97%',alignSelf:"center",height:'70%',marginTop:10,borderWidth:1,borderColor:'white',borderRadius:10,paddingBottom:5}}
                //  onContentSizeChange={(contentWidth, contentHeight)=>{
                //     console.log(contentHeight,contentWidth)
                //     }}
                >
                   
                    {
                        dataToShow && dataToShow.map((e,index)=>{
                           return <View key={index + 11}><BarOfFoodChoose kindPlace={placeKind} addList={(e,isSelected)=>addList(e,isSelected)} fullFruitObj={e} index={index}  /></View> 
                        })
                    }

                 </ScrollView>
                

</View>
        <TouchableOpacity 
          style={styles.ButtonStyle_Next}
          onPress={()=>{
            //save data go next page
            OnSelectSaveData();
        }} >

              <Text style={{color:'#D5DDDC',fontSize:13,textAlign:'center'}}>Confirm</Text>
          </TouchableOpacity>
        </Animatable.View >

        </LinearGradient>

    )
}

// styles
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    inputStyle:{
    width:'80%',
    height:55,
    marginBottom:5,
    marginTop:5,
    backgroundColor:'#D5DDDC',
    alignSelf:'center',
    borderRadius:15,
    textAlign:'center',
    borderColor:'#364057',
    borderWidth:1
},
    viewShow:{
        width:'100%',
        height:"85%",
        position:'absolute',
        bottom:0,
        backgroundColor:"#344148",
        borderTopStartRadius:15,
        borderTopEndRadius:15
    },
    ButtonStyle:{
    alignItems:'center',
    margin:'1%',
    padding:15,
    justifyContent:'center',
    backgroundColor:'#D5DDDC',
    width:'38%',
    marginTop:20,
    alignSelf:'center',
    borderRadius:15,
    borderColor:'white',
    borderWidth:1
},
ButtonStyle_Next:{
    alignItems:'center',
    padding:15,
    justifyContent:'center',
    width:'60%',
    backgroundColor:'#344148',
    marginTop:20,
    alignSelf:'center',
    borderRadius:15,
    borderColor:'white',
    borderWidth:1
}
  });