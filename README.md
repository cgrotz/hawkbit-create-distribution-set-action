# hawkbit-create-distribution-set-action

GitHub Action for creating distribution sets in Eclipse Hawkbit.

## Usage

### Example Workflow file

An example workflow for creating a distribution set:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Create Distribution Set
      uses: cgrotz/hawkbit-create-distribution-set-action@master
      with:
        file-path: './file-to-upload.bin'
        software-module-id: 12345
        hawkbit-tenant: ${{ secrets.ROLLOUTS_TENANT }}
        hawkbit-username: ${{ secrets.ROLLOUTS_USERNAME }}
        hawkbit-password: ${{ secrets.ROLLOUTS_PASSWORD }}
```
