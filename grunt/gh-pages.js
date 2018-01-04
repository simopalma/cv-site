module.exports = {
    options: {
        base: 'public',
        dotfiles: true,
        branch: 'gh-pages',
        user: {
            name: 'Simone',
            email: 'simone.palma@gmail.com',
        },
        message: 'Deploy to GitHub Pages.',
    },
    local: {
        src: ['**'],
    },
    travis: {
        options: {
            repo: `https://${process.env.GH_TOKEN}@github.com/simopalma/cv-site.git`,
            message: 'Deploy to GitHub Pages from Travis CI.',
        },
        src: ['**'],
    },
};