---
layout: post
author: Valeria
title: "A promise is a promise"
date: 2022-04-20
categories: coding
---
A Premise to the Promise: we are in a Node Express router file and we want to
write a post route, to submit data coming from a form in the frontend to a
Postgres database.

First of all, my code was an inline mess of anonymous functions.

So, step 1, try to extract functions into separate functions, it will make it
clearer what function returns what (a promise, a value, etc)

Step 2. We don't have access to the duration of the audio file we are submitting,
as a URL, but we are using a function called `getAudioDuration` that that does
it for us, and that function returns a _promise_ so all my stubborn attempts
at slamming the return value of that function to the object I am creating to
post to the database errors out all the time.
The error I got was something along the lines that the value was
not an integer but "{}"

TIL: if the function returns a promise, I need to make it return a value
(wait until it's done doing its thing) before I can use the value.
---
### Some shared code

```js
const buildSong = (body, duration) => {
  return {
    url: body.url,
    duration: duration
  }
}

const postNewSong = (song) => {
  client.query('INSERT INTO songs (url, duration) VALUES ($1, $2)',
    [song.url, song.duration])
}
```

These are the 2 function I extracted from the messy code.
Please remember that this is _not_ ruby and we need to explicitly `return` in
`buildSong` while on `postNewSong` there is no need to `return`.
We have defined a global variable `client`, accessible from anywhere in this file,
that's how we connect to the the database. After all, this is a toy app.

---
# Post route using `Promise`
``` js
router.post('/', function(request, response) {
  getAudioDuration(request.body.url)
  .then(duration => buildSong(request.body, duration))
  .then(postNewSong)
  .catch(e => console.error(e.stack))
})
```

So many things here:
1. I am using a regular function `function(req, res) {}`. If I wanted I could
  have used the arrow function `(req, res) => {}`
1. first we need to get the duration of the song in order to build the new song
  object to post, so we call `getAudioDuration(request.body.url)` which, like we said,
  returns a _promise_.

    The result of the promise is the duration, which we see in parenthesis in
    the first `.then(duration =>`

1. that `duration` is passed to the `buildSong` function (defined on top of this post)
  together with the rest of the body to build the object.
1. the next chained `.then(postNewSong)` takes the result value of the previous
  `.then` (`buildSong(request.body, duration)`) and passes it as an argument to
  the `postNewSong` function.

    Here I was confused how my function declaration was `const postNewSong = (song) => {`
    and yet I didn't need to either invoke `postNewSong` with `()`, neither explicitly
    newly created song object, say like this:


    `.then((song) => {postNewSong(song)})`

    or even

    `.then(song => postNewSong(song))`

    TIL: Yep, I can ditch the `()` from around the argument, and the `{}`
    and the `;` in the callback.

    I could have been more verbose, but it was unnecessary, because I am wrapping
    the function and referencing it. So I use the function reference directly.

    It was not wrong, but since `postNewSong` takes only one parameter, that will be
    automatically the result of the previous `.then`.

    In the previous case, `buildSong` took 2 parameters, so I had to spell them out.

1. in the end, catching error, if it happens, in a pretty useless way
  (hey, one thing at a time!)

---
# Post route using `async` and `await`
```js
router.post('/', async (request, response) => {
  const duration = await getAudioDuration(request.body.url)
  const song = buildSong(request.body, duration)
  await postNewSong(song)
  response.send('song added')
})
```

1. the main differences are that we now use the keyword `async (request, response) =>`
  on the top function.
1. then we assign the result of the `getAudioDuration` function to a variable
  `duration`, and prepend with the keyword `await`. This will make the promise
  do all its magic, and _return a value not a Promise_.
1. at this point we make another variable `song` that will call the `buildSong`
  function, but this time we do _not_ need to `await` because our function only
  builds an object, does not return a promise.
1. finally we can invoke postNewSong with `await` but anonymously, as this will
  connect to the client and `INSERT` into the database. And adding a useless
  `res.send` to attach to the response head (hey, one thing at a time 2x!)

---
Thanks to [Joël](https://github.com/JoelQ) for explaining all these good things to me.
