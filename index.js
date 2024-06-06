const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { Expense } = require('./models');

app.use(express.json());

let myBudget =  [
  {
    title: 'Eat Out',
    amount: 25
  },
  {
    title: 'Rent',
    amount: 375
  },
  {
    title: 'Grocery',
    amount: 110
  }
];

let friends = [
  {
    name: "Carlos",
    age: 29,
    location: "Interlomas",
  },
  {
    name: "Iker",
    age: 29,
    location: "Interlomas 2",
  },
  {
    name: "Fernando",
    age: 29,
    location: "Interlomas 3",
  }
];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/budget', (req, res) => {
    res.json(myBudget);
    console.log("Concept:", myBudget[0].title);
    console.log("Amount:", `$${myBudget[0].amount}`);
});

//Get all friends
app.get('/friends', (req, res) => {
    res.status(204).json(friends);
    console.log(friends);
    // console.log(friends[0].name);
    // console.log(friends[1].name);
});

//Get a specific friend
app.get('/friends/:name', (req, res) => {
  console.log(req.params); //http://localhost:3000/friends/carlos -> will console log: { name: 'carlos' }
  console.log(req.params.name); //http://localhost:3000/friends/carlos -> will console log: carlos
  
  const name = req.params.name.toLowerCase();
  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase() === name);
  if (filteredFriends.length === 0) {
    res.status(404).json({ error: 'Friend not found' });
  } else {
    res.status(200).json(filteredFriends);
  }
});



// ACTUAL CODE FOR THE BUDGET PAL SERVER


app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      order: [
        ['date', 'DESC'],
      ],
    });
    res.json(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ message: 'Cannot get expenses', error: error.message });
  }
});

app.post('/expenses', async (req, res) => {
  try {
    const { concept, amount, category, date, color, isRecurring } = req.body;
    const newExpense = await Expense.create({ concept, amount, category, date, color, isRecurring });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Cannot post expenses', error: error.message });
  }
});

app.delete('/expenses/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Expense.destroy({
      where: { id }
    });
    if (result === 1) {
      res.status(200).send({ message: "Expense deleted successfully" });
    } else {
      res.status(404).send({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})