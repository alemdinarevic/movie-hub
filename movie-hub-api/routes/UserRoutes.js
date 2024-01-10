const { addToLikedMovies, getLikedMovies, removeFromLikedMovies } = require("../controllers/UserController");

const router = require("express").Router();

router.get('/liked/:email', getLikedMovies);
router.post('/add', addToLikedMovies);
router.put("/delete", removeFromLikedMovies);

module.exports = router;
