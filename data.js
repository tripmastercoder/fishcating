window.values = {
  countries: {
    Europe: [
      "France", "Germany", "Italy", "Spain", "United Kingdom", "Portugal", "Netherlands", "Belgium",
      "Switzerland", "Austria", "Poland", "Czech Republic", "Hungary", "Greece", "Denmark",
      "Norway", "Sweden", "Finland", "Ireland", "Iceland"
    ],
    Asia: [
      "China", "India", "Japan", "South Korea", "Thailand", "Vietnam", "Indonesia", "Malaysia",
      "Singapore", "Philippines", "Pakistan", "Bangladesh", "Nepal", "Bhutan", "Sri Lanka"
    ],
    Africa: [
      "Nigeria", "Kenya", "South Africa", "Egypt", "Morocco", "Ethiopia", "Ghana", "Uganda",
      "Tanzania", "Cameroon"
    ],
    Americas: [
      "United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia", "Peru",
      "Venezuela", "Uruguay"
    ]
  },

  fruits: ["Apple", "Banana", "Cherry", "Mango", "Orange", "Strawberry", "Grape", "Pineapple", "Kiwi", "Pear"],

  animals: ["Dog", "Cat", "Elephant", "Lion", "Tiger", "Zebra", "Giraffe", "Monkey", "Kangaroo", "Penguin"],

  movies: {
    Action: ["Die Hard", "Mad Max", "Terminator", "Gladiator", "John Wick"],
    Comedy: ["Superbad", "Step Brothers", "Anchorman", "The Hangover", "Mean Girls"],
    Drama: ["The Godfather", "Shawshank Redemption", "Forrest Gump", "Fight Club", "Titanic"]
  },

  colors: ["Red", "Blue", "Green", "Yellow", "Purple", "Black", "White", "Orange", "Pink", "Brown"],

  sports: ["Soccer", "Basketball", "Tennis", "Baseball", "Cricket", "Rugby", "Hockey", "Golf", "Boxing", "Volleyball"]
};

window.questions = [
  { text: "Name some fruits", answers: ["Apple", "Banana", "Cherry", "Mango", "Orange"] },
  { categoryKey: "animals", template: "Name some animals" },
  { categoryKey: "countries", template: "Name countries in {X}" },
  { categoryKey: "movies", template: "Name movies in {X}" },
  { categoryKey: "sports", template: "Name some sports" },
  { categoryKey: "colors", template: "Name some colors" },

  // James Bond films
  { text: "James Bond films", answers: [
    "Dr. No", "From Russia with Love", "Goldfinger", "Thunderball", "You Only Live Twice", "On Her Majesty's Secret Service",
    "Diamonds Are Forever", "Live and Let Die", "The Man with the Golden Gun", "The Spy Who Loved Me",
    "Moonraker", "For Your Eyes Only", "Octopussy", "A View to a Kill", "The Living Daylights", "Licence to Kill",
    "GoldenEye", "Tomorrow Never Dies", "The World Is Not Enough", "Die Another Day", "Casino Royale", "Quantum of Solace",
    "Skyfall", "Spectre", "No Time to Die"
  ]},

  // Harry Potter books
  { text: "Harry Potter books", answers: [
    "Philosopher's Stone", "Chamber of Secrets", "Prisoner of Azkaban", "Goblet of Fire",
    "Order of the Phoenix", "Half-Blood Prince", "Deathly Hallows"
  ]},

  // Beatles songs
  { text: "Beatles songs", answers: [
    "Hey Jude", "Let It Be", "Yesterday", "Come Together", "Something", "Help!", "Twist and Shout",
    "All You Need Is Love", "A Hard Day's Night", "Can't Buy Me Love"
  ]},

  // Famous speeches
  { text: "Famous speeches", answers: [
    "I Have a Dream", "Gettysburg Address", "We Shall Fight on the Beaches",
    "Tear Down This Wall", "Ask Not What Your Country Can Do for You", "I Can't Breathe"
  ]},

  // Oscar-winning movies
  { text: "Oscar Best Picture winners", answers: [
    "Parasite", "Green Book", "The Shape of Water", "Moonlight", "Spotlight",
    "12 Years a Slave", "Argo", "The King's Speech", "The Hurt Locker", "Slumdog Millionaire"
  ]},

  // Shakespeare plays
  { text: "Shakespeare plays", answers: [
    "Hamlet", "Othello", "King Lear", "Macbeth", "Romeo and Juliet", "Julius Caesar",
    "A Midsummer Night's Dream", "The Tempest", "Twelfth Night"
  ]}
];
