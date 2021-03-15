# ☕️ breakfast-md parser

Markdown parser for files containing data from
["Śniadanie z Programowaniem"](https://justjoin.it/sniadanie-z-programowaniem) episodes. It aims to
work only with **this particular** schema of .md files.

Data lives on
[this repo](https://github.com/Sniadanie-z-Programowaniem/sniadanie-z-programowaniem-links).

## Installation

```bash
npm ci
```

## Usage

### Output JSON to terminal

```bash
npm start -- --dir ../path-to-sniadanie-links-dir
```

### Save to file

```bash
npm start -- --dir ../path-to-sniadanie-links-dir --out result.json
```

## Result

Example usage

```bash
$ npm start -- --dir ../sniadanie-z-programowaniem-front-end/ --out ./dist/result.json

> breakfast-md-parser@1.0.0 start
> ⠙ Processing ../sniadanie-z-programowaniem-front-end/ dir
> 🎉 Result saved to ./dist/result.json
```

Fragment of result JSON

```json
[
    {
        "date": "2021-02-26T00:00:00.000Z",
        "number": 72,
        "type": "FRONTEND",
        "hosts": [
            {
                "name": "@michalczukm",
                "twitterHandler": "https://twitter.com/michalczukm"
            },
            {
                "name": "@mmiszy",
                "twitterHandler": "https://twitter.com/mmiszy"
            },
            {
                "name": "@cytrowski",
                "twitterHandler": "https://twitter.com/cytrowski"
            }
        ],
        "news": [
            // ...
            {
                "title": "typeofweb/mostly-adequate-guide-polish",
                "description": "Mostly adequate guide to FP (in javascript). Contribute to typeofweb/mostly-adequate-guide-polish development by creating an account on GitHub.",
                "links": [
                    {
                        "url": "https://github.com/typeofweb/mostly-adequate-guide-polish/commits/master"
                    }
                ]
            },
            {
                "title": "Interaktywny słownik CSS",
                "description": "",
                "links": [
                    {
                        "url": "http://apps.workflower.fi/vocabs/css/en"
                    }
                ]
            }
            // ...
        ],
        "stream": {
            "url": "https://www.youtube.com/watch?v=IlVu4VEJQ_8"
        }
    }
    // ...
]
```

### Help

```bash
npm start -- --help
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would
like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
