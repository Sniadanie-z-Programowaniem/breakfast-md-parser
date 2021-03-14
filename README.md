# ☕️ breakfast-md parser

Here lives markdown parser for files containing data from
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
npm start -- --dir ../path-to-sniadanie-links-dir --output result.json
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
