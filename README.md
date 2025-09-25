# Letterboxd Image Generator

Ever shared a Letterboxd review on Instagram Stories? The app makes an image and shares it. I made an app to create similar images.

I started out trying to find the 'share' functionality, which turned out to come from a native iOS between-app API, that wouldn't be accessible in a browser.

Moving on I tried to find how I could generate an image using code. Naturally, this led me to HTML `<canvas>`, which I only knew of as a way of getting text to write itself, like we did in the 2010s. Turns out you can add text and images to a canvas, then download them as a png image file.

Canvas - as it turns out - is a pain. You define the height and width of the canvas using HTML, and define the x and y co-ordinates of where you want your 'element'. Now, if this was an element this would have been easier. But, in fact, canvas has a bunch of functions for declaring fonts, colours and alignments that I had to dig through to get the thing in place. There does exist some APIs that can render HTML into an image, and you can use an automation tool like Selenium to render a browser and take a screenshot, but that was all a bit much trouble for what I'm after.

The trickiest part was that text is rendered across the element, with no idea of the boundaries of the canvas, so if your movie title in our case is too long, it doesn't wrap, but overflows. To fix this, I turned the title string into an array broken on spaces, then looped each word, and only added the word to the line if the line's total length wouldn't be more than 35 characters. If it would be more than 35 characters, I completed the previous line, and made a new line for the new word. It's not ideal, but it seems to work alright. However, having more lines means the stars need to dynamically move down. And having the stars move down means the height of the canvas needs to be greater also, so there's some maths and guesswork involved in getting that to happen.

Big thanks to [Chen Mualem's Meme Generator](https://github.com/chenmu10/memeGenerator) for inspiring the toy.

[See the app on Github Pages](https://rosswhitehouse.github.io/letterboxd-img/index.html).