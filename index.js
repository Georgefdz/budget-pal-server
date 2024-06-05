const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/budget', (req, res) => {
    res.json(
    //     myBudget: [
    //         {
    //             title: 'Eat Out',
    //             budget: 25
    //         },
    //         {
    //             title: 'Rent',
    //             budget: 375
    //         },
    //         {
    //             title: 'Grocery',
    //             budget: 110
    //         }
    //     ]
    // })
        [{
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
        }]
)
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})