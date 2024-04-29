// Libraries
require("dotenv").config()
const tailwind = require('tailwindcss')
const postCss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')


const postcssFilter = (cssCode, done) => {
    // We call PostCSS here.
    postCss([
        tailwind(require('./tailwind.config')),
        autoprefixer(),
        cssnano({ preset: 'default' })
    ])
        .process(cssCode, {
            // Path to our CSS file
            from: './src/_includes/styles/tailwind.css'
        })
        .then(
            (r) => done(null, r.css),
            (e) => done(e, null)
        );
}

module.exports = function (eleventyConfig) {
    // Tailwind
    eleventyConfig.addWatchTarget('./src/_includes/styles/tailwind.css')
    eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter)

    // Images et polices
    eleventyConfig.addPassthroughCopy('src/images')
    eleventyConfig.addPassthroughCopy('src/fonts')

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/layout.njk')

    // Config
    return {
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site",
        },
    };
}