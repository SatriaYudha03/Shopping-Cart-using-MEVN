const express = require('express')
const cors = require('cors'); 
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended:true}))

// Tambahkan middleware CORS di sini
app.use(cors()); // Izinkan semua origin (CORS)

// Jika hanya ingin mengizinkan frontend tertentu:
app.use(cors({ origin: 'http://localhost:8080' }));

// Middleware untuk melayani file statis
app.use('/img', express.static(path.join(__dirname,'./public/img')))

const db = require('./app/models')
db.mongoose
    .connect(db.url, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false
    })
    .then((result) => {
        console.log('Database Connected!')
    }).catch((err) => {
        console.log("Cannot Connect to database!", err)
        process.exit()
    })

app.get('/', (req, res) => {
    res.json({
        message: 'welcome to vuestore-server'
    })
})

require('./app/routes/product.route')(app)
require('./app/routes/order.route')(app)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})