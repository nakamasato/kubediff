# kubediff

This action prints the diff of Kubernetes yaml file

## Inputs

### `directory`

**Optional** The name of the directory to check. Default `.`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```
uses: nakamasato/kubediff@v1
with:
  directory: '.'
```