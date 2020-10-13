# nw-minidump

NW.js minidump

## install

```bash
npm i -g nw-minidump
```

## Usage

```bash
# Generate symbol files.
nw-minidump dump xxx.node
# Walk minidump files.
nw-minidump walk xxx.dmp --binary xxx.node --symbol xxx.sym
```