const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id)
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data.id]
                    },
                    { new: true }
                )
            } else {
                return res.json({ msg: "Movie already added to liked list." })
            }
        } else {
            await User.create({ email, likedMovies: [data] })
        }
        return res.json({ msg: "Movie added successfully" })
    } catch (e) {
        console.error(e);
        return res.json({ msg: "Error while adding movie" });
    }
}

module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            res.json({ msg: 'success', movies: user.likedMovies })
        } else {
            return res.json({ msg: 'invalid user' })
        }
    } catch (e) {
        console.error(e)
        return res.json({ msg: "Error while fetching movie" });
    }
}

module.exports.removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies: user.likedMovies.filter(movie => movie.id !== movieId)
                },
            )
        }
        res.json({ msg: 'success', movies: user.likedMovies.filter(movie => movie.id !== movieId) })

    } catch (e) {
        console.error(e)
    }
}
