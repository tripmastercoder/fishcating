// CATEGORY ANSWERS
const values = {}; // Empty for now since all questions are converted to direct format

var questions = [
  // --- Category-based questions converted ---
  // Cities
  { text: 'Largest cities in France', answers: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille'] },
  { text: 'Largest cities in Canada', answers: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Winnipeg'] },
  { text: 'Largest cities in USA', answers: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Jacksonville'] },

  // Countries
  { text: 'Countries in countries', answers: ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'Former Yugoslav Republic of Macedonia', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom'] },
  { text: 'Asian countries', answers: ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan', 'United Arab Emirates (UAE)', 'Uzbekistan', 'Vietnam', 'Yemen'] },
  { text: 'African countries', answers: ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', "Cote d'Ivoire", 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'] },
  { text: 'Oceania countries', answers: ['Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands'] },

  // Directors
  { text: 'Films directed by Steven Spielberg', answers: ['Jaws', 'E.T.', 'Jurassic Park', 'Schindlers List', 'Saving Private Ryan', 'Close Encounters of the Third Kind', 'Indiana Jones Raiders of the Lost Ark', 'Catch Me If You Can', 'Minority Report', 'Lincoln'] },
  { text: 'Films directed by Martin Scorsese', answers: ['Taxi Driver', 'Goodfellas', 'The Irishman', 'Raging Bull', 'The Departed', 'Casino', 'Shutter Island', 'Gangs of New York', 'Hugo'] },
  { text: 'Films directed by Christopher Nolan', answers: ['Inception', 'The Dark Knight', 'Interstellar', 'Memento', 'Dunkirk', 'The Prestige', 'Batman Begins', 'Tenet'] },

  // Emmy Shows
  { text: '21st Century Emmy-winning shows', answers: ['The West Wing', 'The Sopranos', 'Lost', 'Mad Men', 'Breaking Bad', 'Homeland', 'Game of Thrones', 'Veep', 'The Handmaids Tale', 'Succession'] },

  // Game of the Year
  { text: 'Game of the Year winners', answers: ['2003: Star Wars: Knights of the Old Republic', '2004: Half-Life 2', '2005: Resident Evil 4', '2006: Gears of War', '2007: BioShock'] },

  // Simple questions
  { text: 'Primary colours', answers: ['Red', 'Blue', 'Green'] },
  { text: 'Planets in the Solar System', answers: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'] },
  { text: 'Chess pieces', answers: ['King', 'Queen', 'Bishop', 'Knight', 'Rook', 'Pawn'] },
  { text: 'Planets with rings', answers: ['Saturn', 'Jupiter', 'Uranus', 'Neptune'] },
  { text: 'Languages with official status in Switzerland', answers: ['German', 'French', 'Italian', 'Romansh'] },
  { text: 'Ancient Wonders of the World', answers: ['Great Pyramid of Giza', 'Hanging Gardens of Babylon', 'Statue of Zeus', 'Temple of Artemis', 'Mausoleum at Halicarnassus', 'Colossus of Rhodes', 'Lighthouse of Alexandria'] },
  { text: 'Types of clouds', answers: ['Cirrus', 'Cumulus', 'Stratus', 'Nimbus'] },
  { text: 'Instruments in a string quartet', answers: ['Violin', 'Viola', 'Cello', 'Double Bass'] },
  { text: 'Musical clefs', answers: ['Treble', 'Bass', 'Alto', 'Tenor'] },
  { text: 'Countries with the most koalas', answers: ['Australia', 'United States', 'Japan'] },
  { text: 'Countries with more than 1 billion citizens', answers: ['India', 'China'] },
  { text: 'Countries with 4 letter names', answers: ['Chad', 'Cuba', 'Fiji', 'Iran', 'Iraq', 'Laos', 'Mali', 'Oman', 'Peru', 'Togo'] },
  { text: 'Countries that end with A', answers: ['Albania', 'Algeria', 'Andorra', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Bermuda', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bulgaria','Cambodia', 'Canada', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Dominica', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'French Guiana', 'French Polynesia', 'Gambia', 'Georgia', 'Ghana', 'Guyana', 'India', 'Indonesia', 'Jamaica', 'Kenya', 'Latvia', 'Liberia', 'Libya', 'Lithuania', 'Malaysia', 'Malta', 'Mauritania', 'Micronesia', 'Moldova', 'Mongolia', 'Namibia', 'New Caledonia', 'Nicaragua', 'Nigeria', 'North Korea', 'North Macedonia', 'Panama', 'Papua New Guinea', 'Romania', 'Russia', 'Rwanda', 'Saint Lucia', 'Samoa', 'Saudi Arabia', 'Serbia', 'Slovakia', 'Somalia', 'South Africa', 'South Korea', 'Sri Lanka', 'Syria', 'Tanzania', 'Tonga', 'Tunisia', 'Uganda', 'Venezuela'] },
  { text: 'Countries with the largest number of Muslims', answers: ['Bangladesh', 'India', 'Indonesia', 'Nigeria', 'Pakistan'] },
  { text: 'Countries with the highest alcohol consumption per capita', answers: ['Russia', 'Greece', 'Lesotho'] },
  { text: 'Countries with the highest banana consumption per capita', answers: ['Rwanda', 'Papua New Guinea', 'Comoros', 'Laos'] },
  { text: 'Countries that consume the most beef', answers: ['United States', 'China', 'Brazil', 'India', 'Pakistan'] },
  { text: 'Countries with the highest number of pet cats', answers: ['United States', 'China', 'Russia', 'France', 'Germany'] },
  { text: 'Countries where crocs are sold', answers: ['India', 'China', 'United States', 'Indonesia', 'Brazil', 'Mexico', 'Japan', 'Philippines', 'Turkey', 'Germany', 'United Kingdom', 'France', 'South Africa', 'Italy', 'South Korea', 'Spain', 'Argentina', 'Poland', 'Malaysia', 'Saudi Arabia', 'Australia', 'Taiwan', 'Chile', 'Romania', 'Netherlands', 'Belgium', 'Jordan', 'United Arab Emirates', 'Czechia', 'Portugal', 'Greece', 'Austria', 'Switzerland', 'Hong Kong', 'Denmark', 'Singapore', 'Finland', 'Oman', 'Slovakia', 'New Zealand', 'Puerto Rico', 'Qatar', 'Lithuania', 'Bahrain', 'Estonia', 'Monaco'] },
  { text: 'Countries where a hijab is mandatory', answers: ['Afghanistan', 'Iran'] },
  { text: 'Countries that exclusively use Fahrenheit', answers: ['United States', 'Liberia', 'United States Virgin Islands', 'Cayman Islands', 'Marshall Islands'] },
  { text: 'Countries with the most IKEA stores', answers: ['Germany', 'United States', 'China', 'France', 'Spain'] },
  { text: 'Countries with the most expensive beer', answers: ['Jordan', 'Australia', 'Oman', 'Singapore', 'Norway'] },
  { text: 'Countries with space programmes', answers: ['United States', 'China', 'Russia', 'India', 'Pakistan'] },
  { text: 'Countries with no official language', answers: ['United States', 'United Kingdom', 'Mexico', 'Australia', 'Eritrea'] },
  { text: 'Countries with the largest number of Facebook users', answers: ['India', 'United States', 'Brazil', 'Indonesia', 'Mexico'] },
  { text: 'Countries that achieved independence from Spain', answers: ['Argentina','Belgium','Belize','Bolivia','Chile','Colombia','Costa Rica','Cuba','Dominican Republic','Ecuador','El Salvador','Equatorial Guinea','Guam','Guatemala','Haiti','Honduras','Italy','Luxembourg','Mexico','Micronesia','Morocco','Netherlands','Nicaragua','Northern Mariana Islands','Palau','Panama','Paraguay','Peru','Philippines','Portugal','Puerto Rico','Taiwan','United States','Uruguay','Venezuela','Western Sahara']},
  { text: 'Oldest countries in Europe', answers: ['San Marino','France','Denmark','Austria','Hungary','Portugal','Andorra','Switzerland','Monaco','Spain']},
  { text: 'Countries in the Soviet Union', answers: ['Armenia','Azerbaijan','Belarus','Estonia','Georgia','Kazakhstan','Kyrgyzstan','Latvia','Lithuania','Moldova','Russia','Tajikistan','Turkmenistan','Ukraine','Uzbekistan']},
  { text: 'Countries with the most WWII casualties', answers: ['China','Russia','Ukraine','Poland','Germany','Japan']},
  { text: 'Prime numbers smaller than 100', answers: ['2','3','5','7','11','13','17','19','23','29','31','37','41','43','47','53','59','61','67','71','73','79','83','89','97']},
  { text: 'Most spokem languages', answers: ['English','Mandarin','Hindi','Spanish','Arabic','French','Bengali','Portuguese','Russian','Indonesian','Urdu','German']},
  { text: 'Biblical plagues of Egpty', answers: ["Water turned to blood","Frogs","Lice","Flies","Disease on livestock","Boils","Hail","Locusts","Darkness","Death of the firstborn"]}
];

window.values = values;
window.questions = questions;
