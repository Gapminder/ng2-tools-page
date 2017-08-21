/* tslint:disable */

export default [
  {
    "tool": "MountainChart",
    "slug": "mountain",
    "category": "Tools",
    "image": "/assets/images/chart/mountainchart.png",
    "title": "Mountains",
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
    "image": "/assets/images/chart/bubblechart.png",
    "category": "Tools",
    "title": "Bubbles",
    "description": "This graph shows how long people live and how much money they earn. Click the play button to see how countries have developed since 1800.",
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
    "image": "/assets/images/chart/bubblemap.png",
    "title": "Maps",
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
    "image": "/assets/images/chart/barrankchart.png",
    "title": "Rankings",
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
    "image": "/assets/images/chart/linechart.png",
    "title": "Lines",
    "description": "This graph shows how a trend changes across the years",
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
    "image": "/assets/images/chart/popbyage.png",
    "title": "Population by Age",
    "description": "This graph shows the population by age",
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
    "tool": "BarChartDS",
    "slug": "barchart-ds",
    "category": "Tools",
    "image": "/assets/images/chart/barchart-ds.png",
    "title": "Bar Chart Double Side",
    "description": "This graph shows the population on a map",
    "opts": {
      "state": {
        "time": {
          "startOrigin": "2000",
          "endOrigin": "2014",
          "value": "2014",
          "step": 1,
          "delayThresholdX2": 0,
          "delayThresholdX4": 0,
          "immediatePlay": true,
          "delay": 1000,
          "dim": "year"
        },
        "entities": {
          "dim": null
        },
        "entities_geodomain": {
          "dim": "basomrade",
          "show": {
            "basomrade": {
              "$in": [
                "world"
              ]
            }
          },
          "skipFilter": true
        },
        "entities_colorlegend": {
          "dim": "geo"
        },
        "entities_age": {
          "dim": "basomrade",
          "show": {}
        },
        "entities_side": {
          "dim": "gender",
          "show": {
            "gender": {
              "$in": [
                "female",
                "male"
              ]
            }
          },
          "skipFilter": true
        },
        "marker_order": {
          "space": [
            "entities_age",
            "time"
          ],
          "hook_order": {
            "use": "indicator",
            "which": "higher_education_min_3_years_percent_of_population_aged_25_64"
          }
        },
        "marker": {
          "space": [
            "entities",
            "time",
            "entities_side",
            "entities_age",
            "entities_geodomain"
          ],
          "label_stack": {
            "use": "property",
            "spaceRef": "entities",
            "which": "name"
          },
          "label_side": {
            "use": "property",
            "spaceRef": "entities_side",
            "which": "name"
          },
          "label_age": {
            "use": "property",
            "spaceRef": "entities_age",
            "which": "name"
          },
          "axis_y": {
            "scaleType": "ordinal",
            "use": "property",
            "which": "basomrade",
            "spaceRef": "entities_age",
            "_important": false
          },
          "axis_x": {
            "use": "indicator",
            "which": "mean_income_aged_lt_20"
          },
          "color": {
            "use": "indicator",
            "which": "higher_education_min_3_years_percent_of_population_aged_25_64",
            "spaceRef": "entities",
            "syncModels": [
              "marker_colorlegend"
            ]
          },
          "side": {
            "use": "property",
            "which": "gender",
            "spaceRef": "entities_side",
            "allow": {
              "scales": [
                "ordinal"
              ]
            }
          }
        },
        "entities_allpossible": {
          "dim": "basomrade"
        },
        "marker_allpossible": {
          "space": [
            "entities_allpossible"
          ],
          "label": {
            "use": "property",
            "which": "name"
          }
        },
        "entities_allpossibleside": {
          "dim": "gender"
        },
        "marker_allpossibleside": {
          "space": [
            "entities_allpossibleside"
          ],
          "label": {
            "use": "property",
            "which": "name"
          }
        },
        "marker_colorlegend": {
          "space": [
            "entities_colorlegend"
          ],
          "label": {
            "use": "property",
            "which": "name"
          },
          "hook_rank": {
            "use": "property",
            "which": "rank"
          },
          "hook_geoshape": {
            "use": "property",
            "which": "shape_lores_svg"
          }
        },
        "entities_tags": {},
        "marker_tags": {
          "space": [
            "entities_tags"
          ],
          "label": {},
          "hook_parent": {}
        }
      },
      "ui": {
        "splash": true
      },
      "data": {
        "reader": "waffle",
        "path": "/api/ddf/ql",
        "dataset": "angieskazka/ddf--sodertorn--stockholm_lan_basomrade",
        "assetsPath": "/api/ddf/assets/",
        "datasetBranch": ""
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
    "tool": "ExtApiMap",
    "slug": "extapimap",
    "category": "Tools",
    "image": "/assets/images/chart/extapimap.png",
    "title": "External Api Map",
    "description": "This graph shows the population on a map",
    "opts": {
      "state": {
        "time": {
          "startOrigin": "1993",
          "endOrigin": "2015",
          "value": "2014",
          "dim": "year",
          "delay": 700
        },
        "entities": {
          "dim": "basomrade",
          "show": {
            "size": "big"
          }
        },
        "entities_colorlegend": {
          "dim": "municipality"
        },
        "entities_map_colorlegend": {
          "dim": "municipality"
        },
        "entities_tags": {
          "dim": "tag"
        },
        "marker": {
          "space": [
            "entities",
            "time"
          ],
          "label": {
            "use": "property",
            "which": "name"
          },
          "hook_centroid": {
            "use": "property",
            "which": "baskod2010",
            "_important": true
          },
          "size": {
            "which": "population_20xx_12_31",
            "use": "indicator",
            "scaleType": "linear",
            "extent": [
              0,
              0.4
            ],
            "allow": {
              "scales": [
                "linear"
              ]
            }
          },
          "color": {
            "use": "property",
            "which": "municipality",
            "scaleType": "ordinal",
            "syncModels": [
              "marker_colorlegend"
            ]
          },
          "color_map": {
            "use": "property",
            "which": "municipality",
            "scaleType": "ordinal",
            "syncModels": [
              "marker_colorlegend"
            ]
          }
        },
        "marker_allpossible": {
          "space": [
            "entities"
          ],
          "label": {
            "use": "property",
            "which": "name"
          },
          "skipFilter": true
        },
        "marker_colorlegend": {
          "space": [
            "entities_colorlegend"
          ],
          "opacityRegular": 0.8,
          "opacityHighlightDim": 0.3,
          "label": {
            "use": "property",
            "which": "name"
          },
          "hook_rank": {
            "use": "property",
            "which": "rank"
          },
          "hook_geoshape": {
            "use": "property",
            "which": "shape_lores_svg"
          }
        },
        "marker_tags": {
          "space": [
            "entities_tags"
          ],
          "label": {
            "use": "property",
            "which": "name"
          },
          "hook_parent": {
            "use": "property",
            "which": "parent"
          }
        }
      },
      "ui": {
        "datawarning": {
          "doubtDomain": [
            1993,
            2015
          ],
          "doubtRange": [
            0,
            0
          ]
        },
        "map": {
          "scale": 1,
          "preserveAspectRatio": true,
          "mapEngine": "mapbox",
          "mapStyle": "mapbox://styles/mapbox/streets-v9",
          "showBubbles": true,
          "showAreas": true,
          "showMap": true,
          "offset": {
            "top": 0.05,
            "bottom": -0.12,
            "left": 0,
            "right": 0
          },
          "path": null,
          "bounds": {
            "north": 60.25,
            "west": 17.4,
            "south": 58.7,
            "east": 19.6
          },
          "projection": "mercator",
          "topology": {
            "path": "assets/sodertorn-basomr2010.json",
            "objects": {
              "geo": "c1e171fae817c0bfc26dc7df82219e08",
              "boundaries": "c1e171fae817c0bfc26dc7df82219e08"
            },
            "geoIdProperty": "BASKOD2010"
          }
        },
        "splash": true
      },
      "data": {
        "reader": "waffle",
        "path": "/api/ddf/ql",
        "dataset": "open-numbers/ddf--sodertorn--stockholm_lan_basomrade",
        "assetsPath": "/api/ddf/assets/",
        "datasetBranch": ""
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
]
