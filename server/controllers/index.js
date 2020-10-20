const example1 = (req, res) => {
  res.render('example1');
};

const example2 = (req, res) => {
  res.render('example2');
};

const example3 = (req, res) => {
  res.render('example3');
};

const example4 = (req, res) => {
  res.render('example4');
};

const example5 = (req, res) => {
  res.render('example5');
};

const getSongs = (req, res) => {
  res.json([
      { artist: 'Taylor Swift', title: 'You Belong with Me' },
      { artist: 'Taylor Swift', title: 'I knew you were Trouble' },
      { artist: 'Taylor Swift', title: 'Fifteen' },
      { artist: 'Taylor Swift', title: 'Bad Blood' },
      { artist: 'Taylor Swift', title: 'Blank Space' },
      { artist: 'Dat Boi', title: 'Boulevard of Broken Memes' },
  ]);
};

module.exports.example1 = example1;
module.exports.example2 = example2;
module.exports.example3 = example3;
module.exports.example4 = example4;
module.exports.example5 = example5;
module.exports.getSongs = getSongs;

