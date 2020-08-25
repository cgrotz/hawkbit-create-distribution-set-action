import * as core from '@actions/core'
import {createDistributionSet, Module} from './api'

async function run(): Promise<void> {
  try {
    const type: string = core.getInput('distribution-set-type')
    const name: string = core.getInput('distribution-set-name')
    const version: string = core.getInput('distribution-set-version')
    const softwareModuleIds: string = core.getInput('software-module-ids')

    const modules: Module[] = softwareModuleIds.split(',').map(value => {
      return {
        id: parseInt(value.trim())
      }
    })

    const distributionSet = await createDistributionSet({
      type,
      name,
      version,
      requiredMigrationStep: false,
      modules
    })
    core.info(`Created distribution set ${name}:${version}`)
    core.setOutput('distribution-set-id', distributionSet!.id.toString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
