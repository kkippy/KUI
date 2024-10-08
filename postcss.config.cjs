module.exports = {
    plugins: [
        require('postcss-each-variables'),
        require('postcss-nested'),
        require('postcss-each')({
            plugin: {
                beforeEach:[
                    require('postcss-for'),
                    require('postcss-color-mix'),
                ]
            }
        }),

    ]
}