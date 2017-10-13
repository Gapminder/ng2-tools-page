/* tslint:disable */

export default [
  {
    "tool": "MountainChart",
    "slug": "mountain",
    "category": "Tools",
    "image": "/assets/images/chart/income-chart.png",
    "title": "Income",
    "description": "This graph shows the amount of people in the world across each income level.",
    "__v": 5,
    "opts": {
      "locale": {
        "filePath": "./assets/translation/"
      },
      "data": {
        "reader": "waffle",
        "dataset": "open-numbers/ddf--gapminder--systema_globalis",
        "path": "/api/ddf/ql/",
        "assetsPath": "/api/ddf/assets/"
      },
      "ui": {
        "datawarning": {
          "doubtDomain": [1800, 1950, 2015],
          "doubtRange": [1.0, 0.8, 0.6]
        },
        "splash": true
      }
    },
    "relateditems": [
      {
        "_id": "5600af4a188967b26265a73f",
        "_relatedTo": [
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-many-are-rich-and-how-many-are-poor/",
        "image": "assets/images/answers/poor_rich.png",
        "subtitle": "Short answer — Most are in between",
        "title": "How many are rich and how many are poor?",
        "__v": 0
      },
      {
        "_id": "560061d4fc0d7c00002110a4",
        "title": "How Reliable is the World Population Forecast?",
        "subtitle": "Short answer — Very reliable",
        "image": "assets/images/answers/population_forecast.png",
        "link": "//www.gapminder.org/answers/how-reliable-is-the-world-population-forecast/",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ]
      },
      {
        "_id": "5600ad4c188967b26265a73b",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/will-saving-poor-children-lead-to-overpopulation/",
        "image": "assets/images/answers/overpopulation.png",
        "subtitle": "Short answer — No. The opposite.",
        "title": "Will saving poor children lead to overpopulation?",
        "__v": 0
      },
      {
        "_id": "5600ae2b188967b26265a73c",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-does-income-relate-to-life-expectancy/",
        "image": "assets/images/answers/life_expectancy.png",
        "subtitle": "Short answer — Rich people live longer",
        "title": " How Does Income Relate to Life Expectancy?",
        "__v": 0
      },
      {
        "_id": "5600ae64188967b26265a73d",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-did-babies-per-woman-change-in-the-world/",
        "image": "assets/images/answers/babies_per_woman.png",
        "subtitle": "Short answer — It dropped",
        "title": "How Did Babies per Woman Change in the World?",
        "__v": 0
      },
      {
        "_id": "5600aedc188967b26265a73e",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/posters/gapminder-world-2013/",
        "image": "assets/images/answers/gapminder_world_2013_v5.jpg",
        "subtitle": "This chart compares Life Expectancy & GDP per capita of 182 nations in 2013.",
        "title": "Gapminder World Poster 2013",
        "__v": 0
      }
    ]
  },
  {
    "tool": "BubbleChart",
    "slug": "bubbles",
    "image": "/assets/images/chart/bubble-chart.png",
    "category": "Tools",
    "title": "Bubbles",
    "description": "bubble_chart_desc",
    "__v": 4,
    "opts": {
      "locale": {
        "filePath": "./assets/translation/"
      },
      "data": {
        "reader": "waffle",
        "dataset": "open-numbers/ddf--gapminder--systema_globalis",
        "path": "/api/ddf/ql/",
        "assetsPath": "/api/ddf/assets/"
      },
      "ui": {
        "datawarning": {
          "doubtDomain": [1800, 1950, 2015],
          "doubtRange": [1.0, 0.3, 0.2]
        },
        "splash": true
      }
    },
    "relateditems": [
      {
        "_id": "5600aedc188967b26265a73e",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/posters/gapminder-world-2013/",
        "image": "assets/images/answers/gapminder_world_2013_v5.jpg",
        "subtitle": "This chart compares Life Expectancy & GDP per capita of 182 nations in 2013.",
        "title": "Gapminder World Poster 2013",
        "__v": 0
      },
      {
        "_id": "5600ad4c188967b26265a73b",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/will-saving-poor-children-lead-to-overpopulation/",
        "image": "assets/images/answers/overpopulation.png",
        "subtitle": "Short answer — No. The opposite.",
        "title": "Will saving poor children lead to overpopulation?",
        "__v": 0
      },
      {
        "_id": "560061d4fc0d7c00002110a4",
        "title": "How Reliable is the World Population Forecast?",
        "subtitle": "Short answer — Very reliable",
        "image": "assets/images/answers/population_forecast.png",
        "link": "//www.gapminder.org/answers/how-reliable-is-the-world-population-forecast/",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ]
      },
      {
        "_id": "5600782dabde580e33c79e24",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d"
        ],
        "link": "//www.gapminder.org/answers/how-did-the-world-population-change/",
        "image": "assets/images/answers/world_population.png",
        "subtitle": "First slowly. Then fast.",
        "title": "How Did The World Population Change?",
        "__v": 0
      },
      {
        "_id": "5600ae2b188967b26265a73c",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-does-income-relate-to-life-expectancy/",
        "image": "assets/images/answers/life_expectancy.png",
        "subtitle": "Short answer — Rich people live longer",
        "title": " How Does Income Relate to Life Expectancy?",
        "__v": 0
      },
      {
        "_id": "5600ae64188967b26265a73d",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-did-babies-per-woman-change-in-the-world/",
        "image": "assets/images/answers/babies_per_woman.png",
        "subtitle": "Short answer — It dropped",
        "title": "How Did Babies per Woman Change in the World?",
        "__v": 0
      }
    ]
  },
  {
    "tool": "BubbleMap",
    "slug": "map",
    "category": "Tools",
    "image": "/assets/images/chart/maps-chart.png",
    "title": "Maps",
    "description": "bubble_map_desc",
    "opts": {
      "locale": {
        "filePath": "./assets/translation/"
      },
      "data": {
        "reader": "waffle",
        "dataset": "open-numbers/ddf--gapminder--systema_globalis",
        "path": "/api/ddf/ql/",
        "assetsPath": "/api/ddf/assets/"
      },
      "ui": {
        "datawarning": {
          "doubtDomain": [1800, 1950, 2015],
          "doubtRange": [1.0, 0.3, 0.2]
        },
        "map": {
          "scale": 1,
          "preserveAspectRatio": false,
          "offset": {
            "top": 0.05,
            "bottom": -0.12
          }
        },
        "splash": true
      }
    },
    "relateditems": [
      {
        "_id": "5600af4a188967b26265a73f",
        "_relatedTo": [
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-many-are-rich-and-how-many-are-poor/",
        "image": "assets/images/answers/poor_rich.png",
        "subtitle": "Short answer — Most are in between",
        "title": "How many are rich and how many are poor?",
        "__v": 0
      },
      {
        "_id": "560061d4fc0d7c00002110a4",
        "title": "How Reliable is the World Population Forecast?",
        "subtitle": "Short answer — Very reliable",
        "image": "assets/images/answers/population_forecast.png",
        "link": "//www.gapminder.org/answers/how-reliable-is-the-world-population-forecast/",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ]
      },
      {
        "_id": "5600ad4c188967b26265a73b",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/will-saving-poor-children-lead-to-overpopulation/",
        "image": "assets/images/answers/overpopulation.png",
        "subtitle": "Short answer — No. The opposite.",
        "title": "Will saving poor children lead to overpopulation?",
        "__v": 0
      },
      {
        "_id": "5600ae2b188967b26265a73c",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-does-income-relate-to-life-expectancy/",
        "image": "assets/images/answers/life_expectancy.png",
        "subtitle": "Short answer — Rich people live longer",
        "title": " How Does Income Relate to Life Expectancy?",
        "__v": 0
      },
      {
        "_id": "5600ae64188967b26265a73d",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-did-babies-per-woman-change-in-the-world/",
        "image": "assets/images/answers/babies_per_woman.png",
        "subtitle": "Short answer — It dropped",
        "title": "How Did Babies per Woman Change in the World?",
        "__v": 0
      },
      {
        "_id": "5600aedc188967b26265a73e",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/posters/gapminder-world-2013/",
        "image": "assets/images/answers/gapminder_world_2013_v5.jpg",
        "subtitle": "This chart compares Life Expectancy & GDP per capita of 182 nations in 2013.",
        "title": "Gapminder World Poster 2013",
        "__v": 0
      }
    ]
  },
  {
    "tool": "BarRankChart",
    "slug": "barrank",
    "category": "Tools",
    "image": "/assets/images/chart/ranks-chart.png",
    "title": "Ranks",
    "description": "This graph shows the population on a map",
    "opts": {
      "locale": {
        "filePath": "./assets/translation/"
      },
      "data": {
        "reader": "waffle",
        "dataset": "open-numbers/ddf--gapminder--systema_globalis",
        "path": "/api/ddf/ql/",
        "assetsPath": "/api/ddf/assets/"
      },
      "ui": {
        "datawarning": {
          "doubtDomain": [1800, 1950, 2015],
          "doubtRange": [1.0, 0.8, 0.6]
        },
        "splash": true
      }
    },
    "relateditems": [
      {
        "_id": "5600af4a188967b26265a73f",
        "_relatedTo": [
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-many-are-rich-and-how-many-are-poor/",
        "image": "assets/images/answers/poor_rich.png",
        "subtitle": "Short answer — Most are in between",
        "title": "How many are rich and how many are poor?",
        "__v": 0
      },
      {
        "_id": "560061d4fc0d7c00002110a4",
        "title": "How Reliable is the World Population Forecast?",
        "subtitle": "Short answer — Very reliable",
        "image": "assets/images/answers/population_forecast.png",
        "link": "//www.gapminder.org/answers/how-reliable-is-the-world-population-forecast/",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ]
      },
      {
        "_id": "5600ad4c188967b26265a73b",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/will-saving-poor-children-lead-to-overpopulation/",
        "image": "assets/images/answers/overpopulation.png",
        "subtitle": "Short answer — No. The opposite.",
        "title": "Will saving poor children lead to overpopulation?",
        "__v": 0
      },
      {
        "_id": "5600ae2b188967b26265a73c",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-does-income-relate-to-life-expectancy/",
        "image": "assets/images/answers/life_expectancy.png",
        "subtitle": "Short answer — Rich people live longer",
        "title": " How Does Income Relate to Life Expectancy?",
        "__v": 0
      },
      {
        "_id": "5600ae64188967b26265a73d",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-did-babies-per-woman-change-in-the-world/",
        "image": "assets/images/answers/babies_per_woman.png",
        "subtitle": "Short answer — It dropped",
        "title": "How Did Babies per Woman Change in the World?",
        "__v": 0
      },
      {
        "_id": "5600aedc188967b26265a73e",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/posters/gapminder-world-2013/",
        "image": "assets/images/answers/gapminder_world_2013_v5.jpg",
        "subtitle": "This chart compares Life Expectancy & GDP per capita of 182 nations in 2013.",
        "title": "Gapminder World Poster 2013",
        "__v": 0
      }
    ]
  },
  {
    "tool": "LineChart",
    "slug": "linechart",
    "category": "Tools",
    "image": "/assets/images/chart/trends-chart.png",
    "title": "Trends",
    "description": "line_chart_desc",
    "opts": {
      "locale": {
        "filePath": "./assets/translation/"
      },
      "data": {
        "reader": "waffle",
        "dataset": "open-numbers/ddf--gapminder--systema_globalis",
        "path": "/api/ddf/ql/",
        "assetsPath": "/api/ddf/assets/"
      },
      "ui": {
        "datawarning": {
          "doubtDomain": [1800, 1950, 2015],
          "doubtRange": [1.0, 0.3, 0.2]
        },
        "splash": false
      }
    },
    "relateditems": [
      {
        "_id": "5600af4a188967b26265a73f",
        "_relatedTo": [
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-many-are-rich-and-how-many-are-poor/",
        "image": "assets/images/answers/poor_rich.png",
        "subtitle": "Short answer — Most are in between",
        "title": "How many are rich and how many are poor?",
        "__v": 0
      },
      {
        "_id": "560061d4fc0d7c00002110a4",
        "title": "How Reliable is the World Population Forecast?",
        "subtitle": "Short answer — Very reliable",
        "image": "assets/images/answers/population_forecast.png",
        "link": "//www.gapminder.org/answers/how-reliable-is-the-world-population-forecast/",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ]
      },
      {
        "_id": "5600ad4c188967b26265a73b",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/will-saving-poor-children-lead-to-overpopulation/",
        "image": "assets/images/answers/overpopulation.png",
        "subtitle": "Short answer — No. The opposite.",
        "title": "Will saving poor children lead to overpopulation?",
        "__v": 0
      },
      {
        "_id": "5600ae2b188967b26265a73c",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-does-income-relate-to-life-expectancy/",
        "image": "assets/images/answers/life_expectancy.png",
        "subtitle": "Short answer — Rich people live longer",
        "title": " How Does Income Relate to Life Expectancy?",
        "__v": 0
      },
      {
        "_id": "5600ae64188967b26265a73d",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-did-babies-per-woman-change-in-the-world/",
        "image": "assets/images/answers/babies_per_woman.png",
        "subtitle": "Short answer — It dropped",
        "title": "How Did Babies per Woman Change in the World?",
        "__v": 0
      },
      {
        "_id": "5600aedc188967b26265a73e",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/posters/gapminder-world-2013/",
        "image": "assets/images/answers/gapminder_world_2013_v5.jpg",
        "subtitle": "This chart compares Life Expectancy & GDP per capita of 182 nations in 2013.",
        "title": "Gapminder World Poster 2013",
        "__v": 0
      }
    ]
  },
  {
    "tool": "PopByAge",
    "slug": "popbyage",
    "category": "Tools",
    "image": "/assets/images/chart/ages-chart.png",
    "title": "Ages",
    "description": "pop_by_age_desc",
    "opts": {
      "locale": {
        "filePath": "./assets/translation/"
      },
      "data": {
        "reader": "waffle",
        "dataset": "open-numbers/ddf--gapminder--population",
        "path": "/api/ddf/ql/",
        "assetsPath": "/api/ddf/assets/"
      },
      "ui": {
        "datawarning": {
          "doubtDomain": [1800, 1950, 2015],
          "doubtRange": [1.0, 0.8, 0.6]
        },
        "splash": true
      }
    },
    "relateditems": [
      {
        "_id": "5600af4a188967b26265a73f",
        "_relatedTo": [
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-many-are-rich-and-how-many-are-poor/",
        "image": "assets/images/answers/poor_rich.png",
        "subtitle": "Short answer — Most are in between",
        "title": "How many are rich and how many are poor?",
        "__v": 0
      },
      {
        "_id": "560061d4fc0d7c00002110a4",
        "title": "How Reliable is the World Population Forecast?",
        "subtitle": "Short answer — Very reliable",
        "image": "assets/images/answers/population_forecast.png",
        "link": "//www.gapminder.org/answers/how-reliable-is-the-world-population-forecast/",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ]
      },
      {
        "_id": "5600ad4c188967b26265a73b",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/will-saving-poor-children-lead-to-overpopulation/",
        "image": "assets/images/answers/overpopulation.png",
        "subtitle": "Short answer — No. The opposite.",
        "title": "Will saving poor children lead to overpopulation?",
        "__v": 0
      },
      {
        "_id": "5600ae2b188967b26265a73c",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-does-income-relate-to-life-expectancy/",
        "image": "assets/images/answers/life_expectancy.png",
        "subtitle": "Short answer — Rich people live longer",
        "title": " How Does Income Relate to Life Expectancy?",
        "__v": 0
      },
      {
        "_id": "5600ae64188967b26265a73d",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/answers/how-did-babies-per-woman-change-in-the-world/",
        "image": "assets/images/answers/babies_per_woman.png",
        "subtitle": "Short answer — It dropped",
        "title": "How Did Babies per Woman Change in the World?",
        "__v": 0
      },
      {
        "_id": "5600aedc188967b26265a73e",
        "_relatedTo": [
          "55f71e8ccdedc1ff074e9f6d",
          "55f70fd5dbbfabe3d6a2753f"
        ],
        "link": "//www.gapminder.org/posters/gapminder-world-2013/",
        "image": "assets/images/answers/gapminder_world_2013_v5.jpg",
        "subtitle": "This chart compares Life Expectancy & GDP per capita of 182 nations in 2013.",
        "title": "Gapminder World Poster 2013",
        "__v": 0
      }
    ]
  },
  {
    "tool": "DollarStreet",
    "url": "http://www.gapminder.org/dollar-street",
    "image": "/assets/images/chart/dollar-street.png",
    "title": "dollar_street",
    "description": "dollar_street_project",
    "opts": {
      "locale": {
      },
      "data": {
      },
      "ui": {
        "splash": true
      }
    }
  }
]
